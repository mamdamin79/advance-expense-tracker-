import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TransactionContextProvider from './Context/context';
// speechly provider
import { SpeechProvider } from "@speechly/react-client";
ReactDOM.render(
    <SpeechProvider appId="4307e0d4-fac6-4df4-9b9a-b2609af1a916" language="en-US">
        <TransactionContextProvider >
            <App/>
        </TransactionContextProvider>
    </SpeechProvider>
, document.getElementById('root'));