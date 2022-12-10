import React from 'react';

import * as ReactDOM from 'react-dom/client';

import './styles/app.css';

function Home()
{
    return(
        <div>
            <h1>this is a second test</h1>
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home/>);