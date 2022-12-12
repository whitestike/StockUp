import React, { useState, useRef } from 'react';

import Scanner from '../scanner/Scanner';

const ScanningView = () => {
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState("");
  const scannerRef = useRef(null);


    let HandleScanded = (data) => {
        setBarcode(data);
        setScanning(false);
    }

    if(!scanning){
        return (
            <div>
                <button onClick={() => setScanning(!scanning)}>start scanning</button>
                <h3>{barcode}</h3>
            </div>
        );
    }else{
        return (
            <div>
                <div ref={scannerRef} style={{position: 'relative'}}>
                    <video style={{  width: "100vw", height: "100vh"}}/>
                    {scanning ? <Scanner scannerRef={scannerRef} onDetected={HandleScanded} /> : null}
                </div>
            </div>
        );
    }
};

export default ScanningView;
