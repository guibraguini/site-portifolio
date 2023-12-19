import React, {useState} from 'react'
import {AiFillCaretRight, AiFillCaretDown} from 'react-icons/ai'
import {FaTimes} from 'react-icons/fa'
import {MdOutlineRefresh} from 'react-icons/md'
import Web3 from 'web3'
import refreshpng from './logos/refresh.png'

const  nft1Abi  = require('./nft1_abi.json');
const  nft2Abi  = require('./nft2_abi.json');


const providerUrl = 'https://eth-goerli.g.alchemy.com/v2/h4opxa8xhYtrb-j1VSfUylDul8DK27UM';
let isInitialized = false;

const web3 = new Web3(providerUrl);

let nft1Contract;
let nft2Contract;
async function init() {
  const web3 = new Web3(window.ethereum);
  const networkId = await web3.eth.net.getId();
  nft1Contract = new web3.eth.Contract(nft1Abi , '0x14C96E108748F3Fb6b501FdeA80eAA5D82923317');
  nft2Contract = new web3.eth.Contract(nft2Abi , '0x55139c42df56620f9b21f3Da05B188889dBd1B0e');
  isInitialized = true;
};




let metaMaskDetected = false;

const NFTS = () => {

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

  const [alert, setAlert] = useState(false);
  const openAlert = () => {setAlert(true)}
  const closeAlert = () => {setAlert(false)}

  const [hiddeNft1, setHiddeNft1] = useState(true);
  const handlehiddeNft1 = () => setHiddeNft1(!hiddeNft1);
  const [hiddeNft2, setHiddeNft2] = useState(true);
  const handlehiddeNft2 = () => setHiddeNft2(!hiddeNft2);
  let propsNft1 =["N/A", "N/A", "N/A", "N/A", "N/A", refreshpng];
  const [nft1, setNft1] = useState(propsNft1);
  const handleNft1 = () => setNft1(propsNft1);
  let propsNft2 =["N/A", "N/A", "N/A", "N/A", "N/A", refreshpng];
  const [nft2, setNft2] = useState(propsNft2);
  const handleNft2 = () => setNft2(propsNft2);
  const [nft1Transfer, setNft1Transfer] = useState([]);
  const handleNft1Transfer = (value) => setNft1Transfer(value);
  const [nft2Transfer, setNft2Transfer] = useState([]);
  const handleNft2Transfer = (value) => setNft2Transfer(value);

  const [nft1List, setNft1List] = useState([]);
  const handleNft1List = (list) => setNft1List(list);
  const [nft2List, setNft2List] = useState([]);
  const handleNft2List = (list) => setNft2List(list);


  const [currentNft1, setCurrentNft1] = useState(0);
  const HandleCurrentNft1 = (e) => 
  {
    if(parseInt(currentNft1) + e >= 0 && parseInt(currentNft1) + e < nft1List.length) {
      setCurrentNft1(parseInt(currentNft1) + e);
      getNfts1();
    }
  }
  const [currentNft2, setCurrentNft2] = useState(0);
  const HandleCurrentNft2 = (e) => 
  {
   
    if(parseInt(currentNft2) + e >= 0 && parseInt(currentNft2) + e < nft2List.length) {
      setCurrentNft2(parseInt(currentNft2) + e);
      getNfts2();
    }
  }



async function getNfts1() {
  if(!isInitialized) {
    await init();
  }
  if (isInitialized) {
    if(nft1List.length == 0){
      let tempList = await nft1Contract.methods.getCollection().call({'from':walletAddress[0]});
      handleNft1List(tempList);
    }
    if(nft1List.length != 0) {
      propsNft1[0] = await nft1Contract.methods.name().call({'from':walletAddress[0]});
      propsNft1[1] = await nft1Contract.methods.symbol().call({'from':walletAddress[0]});
      propsNft1[2] = nft1List[currentNft1];
      propsNft1[3] = await nft1Contract.methods.tokenURI(parseInt(nft1List[currentNft1])).call({'from':walletAddress[0]});
      propsNft1[4] = await nft1Contract.methods.ownerOf(parseInt(nft1List[currentNft1])).call({'from':walletAddress[0]});
      let fetchImg = await fetch(propsNft1[3]).then(function (response) {
        return response.json();
      });
      propsNft1[5] = await fetchImg.image;
      handleNft1();
    }
  }
}

async function getNfts2() {
  if(!isInitialized) {
    await init();
  }

  if (isInitialized) {
    if(nft2List.length == 0){
      let tempList = await nft2Contract.methods.getCollection().call({'from':walletAddress[0]});
      handleNft2List(tempList);
    }
    if(nft2List.length != 0) {
      propsNft2[0] = await nft2Contract.methods.name().call({'from':walletAddress[0]});
      propsNft2[1] = await nft2Contract.methods.symbol().call({'from':walletAddress[0]});
      propsNft2[2] = nft2List[currentNft2];
      propsNft2[3] = await nft2Contract.methods.tokenURI(parseInt(nft2List[currentNft2])).call({'from':walletAddress[0]});
      propsNft2[4] = await nft2Contract.methods.ownerOf(parseInt(nft2List[currentNft2])).call({'from':walletAddress[0]});
      let fetchImg = await fetch(propsNft2[3]).then(function (response) {
        return response.json();
    });
      propsNft2[5] = fetchImg.image;
      handleNft2();
    }
  }
}

async function mintNft1() {
  if (!isInitialized) {
    return;
  }
return nft1Contract.methods.createCollectible().send({
  from: walletAddress[0], 
  gas: 250476,
  gasPrice: '20706681338'
})
}  
async function mintNft2() {
  if (!isInitialized) {
    return;
  }
return nft2Contract.methods.mintOwnership().send({
  from: walletAddress[0], 
  gas: 250476,
  gasPrice: '20706681338'
})
}

async function transferNft1() {
  if (!isInitialized) {
    return;
  }
return nft1Contract.methods.transferNft(nft1List[currentNft1], nft1Transfer).send({
  from: walletAddress[0], 
  gas: 250476,
  gasPrice: '20706681338'
})
}
async function transferNft2() {
  if (!isInitialized) {
    return;
  }
return nft2Contract.methods.transferOwnership(nft2List[currentNft2], nft2Transfer).send({
  from: walletAddress[0], 
  gas: 250476,
  gasPrice: '20706681338'
})
}




  return (
    <div className='flex justify-center items-center min-w-[100%] min-h-[100%]'>
      <div className='bg-gray-100 flex grid grid-cols-1 justify-center w-[80%] mt-[5%] border-solid border-2 border-black'> 
        <div className='flex w-[100%] justify-center items-center border-solid border-gray border-b-2 grid grid-cols-2 cursor-pointer' onClick={handlehiddeNft1}>
          <div className='flex justify-end'>
            GBN NFT
          </div>
          <div>
            {hiddeNft1 ? <AiFillCaretRight className='ml-[30px]' size={30} /> : <AiFillCaretDown className='ml-[30px]' size={30} />}
          </div>
        </div>
        <div className={!hiddeNft1 ? "flex border-solid border-gray border-t-2 border-b-2 justify-center items-center grid grid-cols-1 md:grid-cols-3" : 'hidden'}>
          <div className='flex justify-center'>
            <img src={nft1[5]} className="w-[250px] h-[250px] mt-[10px] mb-[10px] md:ml-[15%]" onClick={getNfts1}/>
          </div>
          <div className='flex grid grid-cols-2'>
            <div className='flex mt-[20px] justify-end'>
              <div className='flex border-solid border-black border-2 w-[50px] justify-center cursor-pointer' onClick={() => {HandleCurrentNft1(-1)}}>
                Prev
              </div>
              
            </div>
            <div className='flex mt-[20px] justify-items-start'>
              <div className='flex border-solid border-black border-2 w-[50px] justify-center cursor-pointer' onClick={() => {HandleCurrentNft1(1)}}>
                Next
              </div>
              
            </div>
            <div className='flex mt-[20px] justify-end'>
            Name:
            </div>
            <div className='flex mt-[20px] justify-items-start ml-[20px]'>
              {nft1[0]}
            </div>
            <div className='flex mt-[20px] justify-end'>
            Symbol:
            </div>
            <div className='flex mt-[20px] justify-items-start ml-[20px]'>
            {nft1[1]}
            </div>
            <div className='flex mt-[20px] justify-end'>
            ID:
            </div>
            <div className='flex mt-[20px] justify-items-start ml-[20px]'>
            {nft1[2]}
            </div>
            <div className='flex mt-[20px] justify-end'>
              URI:
            </div>
            <div className='flex mt-[20px] justify-items-start  w-[100px] ml-[20px] overflow-x-auto text-ellipsis md:w-[200px] lg:w-[300px] xl:w-[500px]'>
            {nft1[3]}
            </div>
            <div className='flex mt-[20px] justify-end'>
              Owner:
            </div>
            <div className='flex mt-[20px] justify-items-start  w-[100px] ml-[20px] overflow-x-auto text-ellipsi  md:w-[200px] lg:w-[300px] xl:w-[500px]'>
            {nft1[4]}
            </div>
          </div>
          <div className='flex grid grid-cols-1 justify-items-start ml-[50px] md:ml-[0px] mt-[20px] md:mt-[0px]'>
            <div className='flex'>
              <div className='flex cursor-pointer bg-cyan-700 border-solid border-black border-2 justify-center w-[100px] hover:bg-cyan-900' onClick={mintNft1}>
                Mint
              </div>
              <div className='ml-[50px]' onClick={getNfts1}>
                <MdOutlineRefresh size={25} />
              </div>
            </div>
            <div className='flex mt-[15px]'>
              <div className='flex cursor-pointer bg-cyan-700 border-solid border-black border-2 justify-center min-w-[100px] hover:bg-cyan-900' onClick={transferNft1}>
                Transfer To:
              </div>
              <div className='lg:hidden'> <br /> </div>
              <div className='flex'>
                <input className='flex justify-start border-solid border-black border-2 w-[100px] lg:w-[250px]' type="text" name="nft2Transfer" onChange={event => handleNft1Transfer(event.target.value)} />
              </div>
            </div>
          </div>
          <div className='mb-[20px]' />
        </div>
        <div className='flex w-[100%] justify-center items-center grid grid-cols-2 cursor-pointer' onClick={handlehiddeNft2}>
          <div className='flex justify-end'>
            GBNO NFT
          </div>
          <div>
            {hiddeNft2 ? <AiFillCaretRight className='ml-[30px]' size={30} /> : <AiFillCaretDown className='ml-[30px]' size={30} />}
          </div>  
        </div>
        <div className={!hiddeNft2 ? "flex border-solid border-gray border-t-2 justify-center items-center grid grid-cols-1 md:grid-cols-3 mb-[20px]" : 'hidden'}>
          <div className='flex justify-center'>
            <img src={nft2[5]} className="w-[250px] h-[250px] mt-[10px] mb-[10px] md:ml-[15%]" onClick={getNfts2}/>
          </div>
          <div className='flex grid grid-cols-2'>
            <div className='flex mt-[20px] justify-end'>
              <div className='flex border-solid border-black border-2 w-[50px] justify-center cursor-pointer' onClick={() => {HandleCurrentNft2(-1)}}>
                Prev
              </div>
              
            </div>
            <div className='flex mt-[20px] justify-items-start'>
              <div className='flex border-solid border-black border-2 w-[50px] justify-center cursor-pointer' onClick={() => {HandleCurrentNft2(1)}}>
                Next
              </div>
              
            </div>
            <div className='flex mt-[20px] justify-end'>
            Name:
            </div>
            <div className='flex mt-[20px] justify-items-start ml-[20px]'>
              {nft2[0]}
            </div>
            <div className='flex mt-[20px] justify-end'>
            Symbol:
            </div>
            <div className='flex mt-[20px] justify-items-start ml-[20px]'>
            {nft2[1]}
            </div>
            <div className='flex mt-[20px] justify-end'>
            ID:
            </div>
            <div className='flex mt-[20px] justify-items-start ml-[20px]'>
            {nft2[2]}
            </div>
            <div className='flex mt-[20px] justify-end'>
              URI:
            </div>
            <div className='flex mt-[20px] justify-items-start  w-[100px] ml-[20px] overflow-x-auto text-ellipsis md:w-[200px] lg:w-[300px] xl:w-[500px]'>
            {nft2[3]}
            </div>
            <div className='flex mt-[20px] justify-end'>
              Owner:
            </div>
            <div className='flex mt-[20px] justify-items-start  w-[100px] ml-[20px] overflow-x-auto text-ellipsi  md:w-[200px] lg:w-[300px] xl:w-[500px]'>
            {nft2[4]}
            </div>
          </div>
          <div className='flex grid grid-cols-1 justify-items-start ml-[50px] md:ml-[0px] mt-[20px] md:mt-[0px]'>
            <div className='flex'>
              <div className='flex cursor-pointer bg-cyan-700 border-solid border-black border-2 justify-center w-[100px] hover:bg-cyan-900' onClick={mintNft2}>
                Mint
              </div>
              <div className='ml-[50px]' onClick={getNfts2}>
                <MdOutlineRefresh  size={25} />
              </div>
            </div>
            <div className='flex mt-[15px]'>
              <div className='flex cursor-pointer bg-cyan-700 border-solid border-black border-2 justify-center min-w-[100px] hover:bg-cyan-900' onClick={transferNft2}>
                Transfer To:
              </div>
              <div className='lg:hidden'> <br /> </div>
              <div className='flex'>
                <input className='flex justify-start border-solid border-black border-2 w-[100px] lg:w-[250px]' type="text" name="nft1Transfer" onChange={event => handleNft2Transfer(event.target.value)} />
              </div>
            </div>
          </div>
          <div className='mb-[20px]' />
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

export default NFTS