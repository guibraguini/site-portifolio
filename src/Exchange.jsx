import React, {useState} from 'react'
import {FaTimes} from 'react-icons/fa'
import {HiArrowCircleDown} from 'react-icons/hi'
import Web3 from 'web3'
import Select from 'react-select'
import refreshpng from './logos/refresh.png'

const  exchangeAbi  = require('./exchange_abi.json');

const providerUrl = 'https://eth-goerli.g.alchemy.com/v2/h4opxa8xhYtrb-j1VSfUylDul8DK27UM';
let isInitialized = false;

const web3 = new Web3(providerUrl);

let exchangeContract;
async function init() {
  const web3 = new Web3(window.ethereum);
  const networkId = await web3.eth.net.getId();
  exchangeContract = new web3.eth.Contract(exchangeAbi , '0xbE5095087644Fdee712a07E20AFAf8B28644884B');
  isInitialized = true;
};

let metaMaskDetected = false;




const Exchange = () => {

  const options = [
    { value: -1, label: 'Ethereum' },
    { value: 0, label: 'GT1' },
    { value: 1, label: 'GT2' }
  ]


  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const handleValue1 = (value) => {
    setValue1(value);
    if (selectedValue1 == -1) {
      value *= 10;
    }
    else if (selectedValue2 == -1){
      value /= 10;
    }
    setValue2(value);
  }
  const handleValue2 = (value) => {
    setValue2(value);
    if (selectedValue2 == -1) {
      value *= 10;
    }
    else if (selectedValue1 == -1){
      value /= 10;
    }
    setValue1(value);
  }


  const [selectedValue1, setSelectedValue1] = useState(-1);
  const handleChange1 = e => {
    if (e.value == selectedValue2) {
      setSelectedValue2(selectedValue1);
    }
    setSelectedValue1(e.value);
    setValue1(0);
    setValue2(0);
  }
  
  const [selectedValue2, setSelectedValue2] = useState(0);
  const handleChange2 = e => {
    if (e.value == selectedValue1) {
      setSelectedValue1(selectedValue2);
    }
    setSelectedValue2(e.value);
    setValue1(0);
    setValue2(0);
  }

  function changeOrder () {
    let temp = value1;
    setValue1(value2);
    setValue2(temp);
    temp = selectedValue1;
    setSelectedValue1(selectedValue2);
    setSelectedValue2(temp);
  }



  window.addEventListener('load', () => {
    if (window.ethereum != undefined) {
      metaMaskDetected = true;
      init();
      connect();
    }
    else{
      console.log('No MetaMask Detected');
    }
  });
  const [connected, setConnect] = useState(false);
  const [walletAddress, setWalletAddress] = useState([]);
  function connect() {
    if(!metaMaskDetected && !connected){
      openAlert();
      return;
    }
    window.ethereum.request({method:'eth_requestAccounts'}).then(res=>{
        setWalletAddress(res);
        setConnect(true);
        
    })
  }

  async function refresh() {
    connect();
  }

  async function trade() {
    if (!isInitialized) {
      return;
    }
    if (selectedValue1 == -1) {
      return exchangeContract.methods.buyTokens(selectedValue2).send({
        from: walletAddress[0], 
        gas: 120476,
        gasPrice: '10706681338',
        value:web3.utils.toWei(value1, "ether")
      })
    }
    if (selectedValue2 == -1) {
      return exchangeContract.methods.sellTokens(web3.utils.toWei(value1, "ether"), selectedValue1).send({
        from: walletAddress[0], 
        gas: 120476,
        gasPrice: '10706681338',
      })
    }
  return exchangeContract.methods.change(selectedValue1, selectedValue2, web3.utils.toWei(value1)).send({
    from: walletAddress[0], 
    gas: 120476,
    gasPrice: '10706681338'
  })
  }

  const [alert, setAlert] = useState(false);
  const openAlert = () => {setAlert(true)}
  const closeAlert = () => {setAlert(false)}



  return (
    <div className='flex justify-center items-center min-w-[100%] min-h-[100%]'>
      <div className='bg-green-300 flex grid grid-cols-1 w-[80%] mt-[5%] border-solid border-2 border-black rounded-2xl'>
        <div className='flex justify-center items-center border-solid border-b-2 border-white h-[60px] text-xl'>
          Exchange 
        </div>
        <div className='flex justify-end mt-[20px]'>
          <div className={!connected ? 'flex justify-center border-solid border-2 border-white mr-[20px] w-[150px] cursor-pointer hover:bg-white' : 'text-xs flex w-[150px] h-[25px] mr-[170px] items-center justify-center'} onClick={connect}>
            <img src={refreshpng} className={connected ? "w-[25px] h-[25px] mr-[20px]" : 'hidden'} onClick={refresh}/>
            {connected ? 'Wallet Connected: ' + walletAddress[0] : 'Connect Wallet'}
          </div>
        </div>
        <div className='flex justify-center mt-[30px]'>
          <div className='flex justify-center border-4 border-solid border-white w-[50%] min-w-[300px]  rounded-lg'>
            <input className='flex text-right w-[70%] h-[36px] mt-[0px] z-10 border-r-4 border-solid border-white ' type="number" name="token1" value={value1} onChange={event => handleValue1(event.target.value)} />
            <Select options={options} className='w-[31%] h-[35px] mt-[-1px]' value={options.filter(obj => obj.value === selectedValue1)} onChange={handleChange1} />
          </div>
        </div>
        <div className='flex justify-center mt-[30px]'>
          <HiArrowCircleDown size={50} className="cursor-pointer" color="white" onClick={changeOrder}/>
        </div>
        <div className='flex justify-center mt-[30px]'>
          <div className='flex justify-center border-4 border-solid border-white w-[50%] min-w-[300px] rounded-lg'>
            <input className='flex text-right w-[70%] h-[36px] mt-[0px] z-10 border-r-4 border-solid border-white ' type="number" name="token2" value={value2} onChange={event => handleValue1(event.target.value)} />
            <Select options={options} className='w-[31%] h-[35px] mt-[-1px] sm:ml-[-20%] md:ml-[0px]' value={options.filter(obj => obj.value === selectedValue2)} onChange={handleChange2}/>
          </div>
        </div>
        <div className='flex justify-center mt-[30px]'>
          <div className='flex justify-center items-center w-[150px] h-[50px] border-2 border-solid border-sky-500/75 mb-[30px] rounded-2xl cursor-pointer bg-sky-500/75 hover:bg-sky-500' onClick={trade}>
            TRADE
          </div>
        </div>
      </div>
      <div  className={!alert ? 'hidden' : 'absolute w-[70%] box justify-end items-right bottom-0 right-0'} >
        <div className="w-[75%] p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 cursor-pointer" onClick={closeAlert}>
          <div>
            <svg className="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"></path></svg>
            No MetaMask Detected
          </div>
          <div className='flex justify-end items-right ml-[5%] mt-[-20px]' >
            <FaTimes size={20} />
          </div>
        </div>
      </div>
    </div>
    )
}

export default Exchange