import React, { useState, useRef } from 'react';

import Scanner from '../scanner/Scanner';

const ScanningView = () => {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);

  return (
      <div>
          <button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Start'}</button>
          <div ref={scannerRef} style={{position: 'relative'}}>
              {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
              {scanning ? <Scanner scannerRef={scannerRef} onDetected={(data) => console.log(data)} /> : null}
          </div>
      </div>
  );
};

export default ScanningView;
