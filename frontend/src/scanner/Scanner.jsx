import React, { useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Quagga from '@ericblade/quagga2';

function getMedian(arr) {
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) {
        return arr[half];
    }
    return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
    const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error);
    const medianOfErrors = getMedian(errors);
    return medianOfErrors;
}

const defaultConstraints = {
    width: 640,
    height: 480,
};

const defaultLocatorSettings = {
    patchSize: 'medium',
    halfSample: true,
};

const defaultDecoders = [
    'code_128_reader',
    'ean_reader',
    'ean_5_reader',
    'ean_2_reader',
    'ean_8_reader',
    'code_39_reader',
    'code_39_vin_reader',
    'codabar_reader',
    'upc_reader',
    'upc_e_reader',
    'i2of5_reader',
    "2of5_reader",
    'code_93_reader',
    'code_32_reader',
];

const Scanner = ({
    onDetected,
    scannerRef,
    onScannerReady,
    cameraId,
    locator = defaultLocatorSettings,
    numOfWorkers = navigator.hardwareConcurrency || 0,
    decoders = defaultDecoders,
    locate = true,
}) => {
    const errorCheck = useCallback((result) => {
        if (!onDetected) {
            return;
        }
        const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
        // if Quagga is at least 75% certain that it read correctly, then accept the code.
        if (err < 0.25) {
            onDetected(result.codeResult.code);
        }
    }, [onDetected]);

    useLayoutEffect(() => {
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                target: scannerRef.current,
            },
            locator,
            numOfWorkers,
            decoder: { readers: decoders },
            locate,
        }, (err) => {
            if (err) {
                return console.log('Error starting Quagga:', err);
            }
            if (scannerRef && scannerRef.current) {
                Quagga.start();
                if (onScannerReady) {
                    onScannerReady();
                }
            }
        });
        Quagga.onDetected(errorCheck);
        return () => {
            Quagga.offDetected(errorCheck);
            Quagga.stop();
        };
    }, [cameraId, onDetected, onScannerReady, scannerRef, errorCheck, locator, decoders, locate]);
    return null;
}

Scanner.propTypes = {
    onDetected: PropTypes.func.isRequired,
    scannerRef: PropTypes.object.isRequired,
    onScannerReady: PropTypes.func,
    cameraId: PropTypes.string,
    facingMode: PropTypes.string,
    locator: PropTypes.object,
    numOfWorkers: PropTypes.number,
    decoders: PropTypes.array,
    locate: PropTypes.bool,
};

export default Scanner;