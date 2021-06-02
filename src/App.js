import logo from './logo.svg';
import {getBalance, readCount, setCount} from './api/UseCaver';
import * as KlipAPI from "./api/UseKlip";
import QRcode from "qrcode.react";
import './App.css';
import { useState } from 'react';

function onPressButton(balance) {
  console.log('hi');
}
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
}
const DEFAULT_QR_CODE ="DEFAULT";
function App() {
  const [balance, setBalance] = useState('0');
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  
  //readCount();
  //getBalance('0xb97a7c411b126e72af2ca972580e238e56c0c0d5');
const onClickGetAddress = () => {
  KlipAPI.getAddress(setQrvalue);
};
const onClickSetCount = () => {
  KlipAPI.setCount(2000, setQrvalue);
};
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={()=>{
        onClickGetAddress();
        }}
        >
          주소가져오기
        </button>
        <button onClick={()=>{
         onClickSetCount();
        }}
        >
          카운트값 변경하기
        </button>
        <br />
        <br />
        <QRcode value={qrvalue} />
        
        <p>
          {balance}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
