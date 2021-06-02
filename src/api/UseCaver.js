import Caver from 'caver-js';
import CouterABI from '../abi/CounterABI.json';
import {ACCESS_KEY_ID, SECRET_ACCESS_KEY, COUNT_CONTRACT_ADDRESS,CHAIN_ID} from '../constants';

const option = {
    headers: [
      {
        name:"Authorization",
        value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
      },
      {name: "x-chain-id", value: CHAIN_ID}
  
    ]
  }
  
  const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
  const CountContract = new caver.contract(CouterABI, COUNT_CONTRACT_ADDRESS);
  export const readCount = async () => {
    const _count = await CountContract.methods.count().call();
    console.log(_count);
  }
  
  export const getBalance = (address) => {
    return caver.rpc.klay.getBalance(address).then((response) => {
      const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
      console.log(`BALANCE: ${balance}`);
      return balance;
    })
  }
  
  export const setCount = async (newCount) => {
    //사용할 어카운트 설정
    try {
    const praivatekey = '0x7e372ef482e5d5dcaeab1d739b9f8303f23c93070282e06d3f9394ffa2feb1f7'
    const deployer = caver.wallet.keyring.createFromPrivateKey(praivatekey);
    caver.wallet.add(deployer);
    //스마트 컨트랙트 실행 트랜잭션 날리기
    //결과 확인
  
    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address,//address
      gas: "0x4bfd200"//
    });
    console.log(receipt);
  }catch(e) {
    console.log('[ERROR_SET_COUNT]${e}');
  }
  }