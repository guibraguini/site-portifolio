import React, { useRef, useState} from 'react';
import {FaTimes} from 'react-icons/fa'
import metamask from './logos/metamask.png';
import refreshpng from './logos/refresh.png';
import Web3 from 'web3';





const providerUrl = 'https://eth-goerli.g.alchemy.com/v2/h4opxa8xhYtrb-j1VSfUylDul8DK27UM';
let isInitialized = false;

const web3 = new Web3(providerUrl);

let token1;
let token2;
let faucet;

  

async function init() {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    //const  tokensAbi  = getABI(require('./tokens_abi.json'));
    const tokensAbi = [
      {
        "constant":true,
        "inputs":[{"name":"","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"","type":"uint256"}],
        "type":"function"
      }
    ];
    const faucetAbi = [
      {
        "inputs": [],
        "name": "give",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    token1 = new web3.eth.Contract(tokensAbi , '0x533A79d3d24660DCc71b9eadB2D200261Adc8252');
    token2 = new web3.eth.Contract(tokensAbi, '0xb238BA11ce654f7DC3E8E03586F9EA1BDC5b037C');
    faucet = new web3.eth.Contract(faucetAbi, '0x2Dd8F4Cce5465B9E6BB1cFEaBAC625c56C6F8dab');
    isInitialized = true;
};

let metaMaskDetected = false;

const Tokens = () => {



  window.addEventListener('load', () => {
    if (window.ethereum != undefined) {
      metaMaskDetected = true;
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

  async function getTokens() {
    if (!isInitialized) {
      return;
    }
  return faucet.methods.give().send({
    from: walletAddress[0], 
    gas: 120476,
    gasPrice: '10706681338'
  })
  }  

  const [alert, setAlert] = useState(false);
  const openAlert = () => {setAlert(true)}
  const closeAlert = () => {setAlert(false)}

  async function addToken (tokenAddress, tokenSymbol) {
    if (metaMaskDetected){
      const decimals = 18;
      try { 
        const tokenAdded = await window.ethereum.request({
          method:'wallet_watchAsset',
          params: {
            type:'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: decimals,
              image : ''
            },
          },
        });
        
      }
      catch (error) {
        console.log(error);
      }
    }
    else{
      openAlert();
    }
  }
  async function refresh() {
    connect();
    getBalance();
  }


  const [tokensBallance, setTokensBallance] = useState([["Click to Refresh"], ["Click to Refresh"]]);
  async function getBalance() {
    if(!isInitialized) {
      await init();
    }
    if (isInitialized) {
      let balanceToken1 = await token1.methods.balanceOf(walletAddress[0]).call();
      let balanceToken2 = await token2.methods.balanceOf(walletAddress[0]).call();
      let position = balanceToken1.length - 18;
      balanceToken1 = [balanceToken1.slice(0, position), '.', balanceToken1.slice(position)].join('');
      if(Array.from(balanceToken1)[0] = "."){
        balanceToken1 = ["0", balanceToken1].join('');
      }
      position = balanceToken2.length - 18;
      balanceToken2 = [balanceToken2.slice(0, position), '.', balanceToken2.slice(position)].join('');
      if(Array.from(balanceToken2)[0] = "."){
        balanceToken2 = ["0", balanceToken2].join('');
      }
      setTokensBallance([balanceToken1, balanceToken2]);
    }
  }


  return (
    <div className="bg-slate-200 absolute min-w-[100%] min-h-[800px] max-h-[200%] h-[100%]   w-auto top-[0px] left-[0px] flex flex-col justify-center">
        <div className="absolute flex flex-col bg-sky-100 w-[80%] min-h-[85%] ml-[10%] md:w-[60%] md:min-h-[75%] md:ml-[20%] h-auto border-solid border-2 border-gray-300 rounded-[5%]">
          <div className='h-[25px] flex justify-end mt-[20px] '> 
            <div className={!connected ? 'flex w-[120px] h-[25px] mr-[50px] hover:bg-white cursor-pointer border-solid border-2 border-white items-center justify-center' : 'text-xs flex w-[150px] h-[25px] mr-[170px] items-center justify-center'} onClick={refresh}>
            <img src={refreshpng} className={connected ? "w-[25px] h-[25px] mr-[20px]" : 'hidden'} onClick={refresh}/>
            {connected ? 'Wallet Connected: ' + walletAddress[0] : 'Connect Wallet'}
            </div>
 
          </div>
          <div className="relative flex grid grid-cols-2  mt-[8%] ml-[25%]">
            <div className="">
              Tokens:
            </div>
            <div className="">
              Balance:
            </div>
          </div>
          <div className="relative flex grid grid-cols-2 mt-[10%] ml-[25%] border-solid border-b-2 border-slate-400 max-w-[50%]">
            <div className="">
              GT1
            </div>
            <div className="ml-[25%] cursor-pointer" onClick={refresh}>
              {tokensBallance[0]}
            </div>
          </div> 
          <p className='ml-[25%] text-xs invisible md:visible'>
            0x533A79d3d24660DCc71b9eadB2D200261Adc8252
          </p>
          <p className='ml-[25%] text-xs  md:invisible'>
            0x533A79d3d24660DCc71
            <br />
            b9eadB2D200261Adc8252
          </p>
          <div className="relative flex grid grid-cols-2 mt-[10%] ml-[25%]  border-solid border-b-2 border-slate-400 max-w-[50%]">
            <div className="">
              GT2
            </div>
            <div className="relative ml-[25%] cursor-pointer" onClick={refresh}>
            {tokensBallance[1]}
            </div>
          </div>
          <p className='ml-[25%] text-xs invisible md:visible'>
            0xb238BA11ce654f7DC3E8E03586F9EA1BDC5b037C
          </p>
          <p className='ml-[25%] text-xs  md:invisible'>
            0xb238BA11ce654f7DC3E
            <br />
            8E03586F9EA1BDC5b037C
          </p>
          <div className="relative mt-[10%] ml-[25%] flex grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex border-solid border-2 border-white w-[175px] h-[65px] justify-center items-center hover:bg-white cursor-pointer" onClick={() => {addToken('0x533A79d3d24660DCc71b9eadB2D200261Adc8252', 'GT1')}}>
              <img src={metamask} alt="Add to metamask" className='w-[50px] h-[50px] ml-[10px] mt-[5px]'/>
              <div className="mt-[5px] ml-[15px]">
                Add GT1 to METAMASK
              </div>
            </div>
            <div className="relative flex border-solid border-2 border-white w-[175px] h-[65px] lg:ml-[-80px] mt-[30px] lg:mt-[0px] hover:bg-white cursor-pointer" onClick={() => {addToken('0xb238BA11ce654f7DC3E8E03586F9EA1BDC5b037C', 'GT2')}}>
              <img src={metamask} alt="Add to metamask" className='w-[50px] h-[50px] ml-[10px] mt-[5px]'/>
              <div className="mt-[5px] ml-[15px]">
                Add GT2 to METAMASK
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-[20px] mb-[50px]">
            <div className="border-solid border-2 border-white flex justify-center items-center w-[150px] h-[50px] hover:bg-white cursor-pointer" onClick={getTokens}>
              GET TOKENS
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
    </div>
    )
}

export default Tokens