import React, {useState} from 'react'
import {FaTimes} from 'react-icons/fa'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import Web3 from 'web3'
import Select from 'react-select'
import refreshpng from './logos/refresh.png'

const  votingAbi  = require('./votes_abi.json');
const  nftAbi  = require('./nft1_abi.json');

const providerUrl = 'https://eth-goerli.g.alchemy.com/v2/h4opxa8xhYtrb-j1VSfUylDul8DK27UM';
let isInitialized = false;

const web3 = new Web3(providerUrl);

let votingContract;
let nftContract;
async function init() {
  const web3 = new Web3(window.ethereum);
  const networkId = await web3.eth.net.getId();
  votingContract = new web3.eth.Contract(votingAbi , '0x7cA9EEc92277eBD4b34BF71b51F296CD3C82D213');
  nftContract = new web3.eth.Contract(nftAbi , '0x14C96E108748F3Fb6b501FdeA80eAA5D82923317');
  isInitialized = true;
};

let metaMaskDetected = false;

const Voting = () => {



  const [poll, setPoll] = useState('Loading Poll...');
  const [options, setOptions] = useState([]);
  const [nfts, setNfts] = useState([]);


  const [selectedValue, setSelectedValue] = useState(0);
  const handleChange = e => setSelectedValue(e.value);
  
  const [selectedNftValue, setSelectedNftValue] = useState(0);
  const handleNftChange = e => setSelectedNftValue(e.value);


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
        getPoll();
        getNfts();
        getResults();
    })
  }

  async function refresh() {
    setPoll('Loading Poll...');
    connect();
  }

  async function vote() {
    let voted= await votingContract.methods.voted(parseInt(selectedNftValue)).call();
    if (!voted) {
      return votingContract.methods.vote(parseInt(selectedNftValue), parseInt(selectedValue), 1).send({
        from: walletAddress[0], 
        gas: 120476,
        gasPrice: '10706681338',
      })
    }
    return votingContract.methods.changeVote(parseInt(selectedNftValue), parseInt(selectedValue), 1).send({
      from: walletAddress[0], 
      gas: 120476,
      gasPrice: '10706681338',
    })
  }

  const [showResults, setShowResults] = useState(false);
  const handleResults = () => {
    setShowResults(!showResults); 
    refresh();
  }

  const [alert, setAlert] = useState(false);
  const openAlert = () => {setAlert(true)}
  const closeAlert = () => {setAlert(false)}

  let resultsArray = [];
  const [results, setResults] = useState(resultsArray);



async function getPoll() {
  if(!isInitialized) {
    await init();
  }
  if (isInitialized) {
      let pollStructure = await votingContract.methods.getPoll().call();
      setPoll(pollStructure[0]);
      let optionsStructured = [];
      for (var i = 0; i < await pollStructure[1].length; i++){
        optionsStructured.push({value: i, label: pollStructure[1][i]});
      }
      setOptions(optionsStructured);
  }
}

async function getResults() {
  let pollResults= await votingContract.methods.countVotes().call();
  let pollStructure = await votingContract.methods.getPoll().call();
    for (var i = 0; i < pollResults.length; i++) {
      resultsArray.push(
      <div className='flex justify-center mt-[30px]' >
        {pollStructure[1][i]}: {pollResults[i]} Votes.
      </div>
      );
    }
    setResults(resultsArray);
  }


  async function getNfts() {
    if(!isInitialized) {
      await init();
    }
    if (isInitialized) {
      let nftsList = await nftContract.methods.getCollection().call({'from':walletAddress[0]});
      let tempList = [];
      if(nftsList.length >= 1){
        setSelectedNftValue(nftsList[0]);
      }
      for (var i = 0; i < nftsList.length; i ++){
       tempList.push({value: nftsList[i], label: 'ID: '+ nftsList[i]});
      }
      setNfts(tempList);
    }
  }


  return (
    <div className='flex justify-center items-center min-w-[100%] min-h-[100%]'>
      <div className='bg-green-300 flex grid grid-cols-1 w-[80%] mt-[5%] border-solid border-2 border-black rounded-2xl'>
        <div className={!showResults ? 'flex grid grid-cols-1' : 'hidden'}>
          <div className='flex justify-center items-center border-solid border-b-2 border-white h-[60px] text-xl'>
            Voting 
          </div>
          <div className='flex justify-end mt-[20px]'>
            <div className={!connected ? 'flex justify-center border-solid border-2 border-white mr-[20px] w-[150px] cursor-pointer hover:bg-white' : 'text-xs flex w-[150px] h-[25px] mr-[170px] items-center justify-center'} onClick={connect}>
              <img src={refreshpng} className={connected ? "w-[25px] h-[25px] mr-[20px]" : 'hidden'} onClick={refresh}/>
              {connected ? 'Wallet Connected: ' + walletAddress[0] : 'Connect Wallet'}
            </div>
          </div>
          <div className='flex justify-center mt-[30px]'>
          </div>
          <div className='flex justify-center mt-[30px]'>
            <div className='flex justify-center border-b-4 border-solid 	border-[#ff0000] w-[50%] min-w-[300px]'>
              {poll}
            </div>
          </div>
          <div className='flex justify-center mt-[30px] grid grid-cols-1'>
            <div className='flex justify-center'>
              Select NFT:
            </div>
            <div className='flex justify-center'>
              <div className='flex justify-center w-[50%] min-w-[300px]'>
                <Select options={nfts} className='w-[100%] border-solid border-4 border-white   rounded-lg' value={nfts.filter(obj => obj.value === selectedNftValue)} onChange={handleNftChange} />
              </div>
            </div>
            <div className='flex justify-center mt-[30px]'>
              Select Option:
            </div>
            <div className='flex justify-center'>
              <div className='flex justify-center w-[50%] min-w-[300px]'>
                <Select options={options} className='w-[100%] border-solid border-4 border-white   rounded-lg' value={options.filter(obj => obj.value === selectedValue)} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className='flex justify-center mt-[30px]'>
            <div className='flex justify-center items-center w-[150px] h-[50px] border-2 border-solid border-sky-500/75 mb-[30px] rounded-2xl cursor-pointer bg-sky-500/75 hover:bg-sky-500' onClick={vote}>
              VOTE
            </div>
            <div className='flex justify-center items-center w-[150px] h-[50px] border-2 border-solid border-sky-500/75 mb-[30px] ml-[50px] rounded-2xl cursor-pointer bg-sky-500/75 hover:bg-sky-500' onClick={handleResults}>
              SEE RESULTS
            </div>
          </div>
        </div>
        <div className={!showResults ? 'hidden' : 'flex grid grid-cols-1'}>
          <div className='flex justify-center items-center border-solid border-b-2 border-white h-[60px] text-xl'>
            Results
          </div>
          <div className='flex grid grid-cols-2 mt-[20px] w-[100%]'>
            <div className='flex justify-start ml-[50px] cursor-pointer'>
              <AiOutlineArrowLeft size={25} onClick={handleResults}/>
            </div>
            <div className='flex justify-end mr-[50px] cursor-pointer'>
            <img src={refreshpng} className="w-[25px] h-[25px]" onClick={refresh}/>
            </div>
          </div>
          <div className='flex justify-center mt-[30px]'>
          </div>
          <div className='flex justify-center mt-[30px]'>
            <div className='flex justify-center border-b-4 border-solid 	border-[#ff0000] w-[50%] min-w-[300px]'>
              {poll}
            </div>
          </div>
          <div className='flex justify-center mt-[30px] grid grid-cols-1 mb-[30px]'>
            
              {results}
            
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

export default Voting