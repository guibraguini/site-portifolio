import React from 'react'
import WorksConteiner from './WorksConteiner';
import Tokens from './logos/tokens.png'
import NFTS from './logos/nfts.png'
import Exchange from './logos/exchange.png'
import Voting from './logos/voting.png'
import Carousel from './Carousel'

const Works = () => {

    const slides = [
        {
            title: "ERC20 TOKENS",
            image: Tokens, 
            text: "A simple ERC20 Token project where i used my knowleged to implement 2 tokens from scratch using no outside code, just some documentation. You can test it by adding the token contract addresses on the Goerli testnet by clicking on the add token button on demo site or by hand getting the adresses on the demo site and following the insctructions. On the demo site you can also get a small amounth of token to test it and test my others token dependent contracts, but be aware that tokens will be sent only 1 time per wallet.",  
            link1: "https://github.com/guibraguini/Tokens" ,
            Link2: "/tokens",
            Link3: ""
        },
        {
            title: "NFTS",
            image: NFTS, 
            text: "A simple concept project where you can mint and controll 2 types of nfts that can be use in another project. You can test it in the demo section using the Goerli testnet. The code on the demo is a little different from the original code, that's because the new code fits better on the demo purpose, permiting to mint the nfts with no prerequisite but only 1 time per wallet. You can test the original code by coping it from code section and implementing it, like i show in the video section.",  
            link1: "https://github.com/guibraguini/NFTS" ,
            Link2: "/nfts",
            Link3: ""
        },
        {
            title: "EXCHANGE",
            image: Exchange, 
            text: "A simple concept project where i've tryed to create a simple exchange from scratch, in this exchange the owner can register new tokens and add or remove they liquidit according on how much of it his wallet and the contract have. On the demo section you can test it by using some Goerli ETH, or by redeming the tokens from my tokens project.",  
            link1: "https://github.com/guibraguini/Exchange" ,
            Link2: "/exchange",
            Link3: ""
        },
        {
            title: "NFT VOTING SYSTEM",
            image: Voting, 
            text: "Another concept project where i've use nfts to create a voting system where one type of nfts let you create and change the topic of the vote, and the other let you vote on the current topic. You can test the demo by reedeming the nfts of my other project, but the code of this demo is slight diferent from the original code, just to fit better to the purpose of the demo. You can test the original code by coping it from code section and implementing it, like i show in the video section.",  
            link1: "https://github.com/guibraguini/NFTS-Voting" ,
            Link2: "/voting ",
            Link3: ""
        },
      ];
      
      

  return (
    <div className='w-full'>

        
        <div className='relative flex flex-col justify-center items-center w-[100%]  h-[80%] mt-[15%]'>
            <div>
                <div>
                    <p className='text-2xl underline decoration-red-600	decoration-2 underline-offset-2 md:decoration-4 md:underline-offset-4 md:text-6xl flex flex-col justify-center items-center w-full'>
                        Works
                    </p>
                </div>
                <div className="mt-[10%]">
                <Carousel slides={slides} />
                { /*
                    <WorksConteiner title="ERC20 TOKENS" image={Tokens} text="
                        A simple ERC20 Token project where i used my knowleged to implement 2 tokens from scratch using no outside code, just some documentation. You can test it by adding the token contract addresses on the Goerli testnet by clicking on the add token button on demo site or by hand getting the adresses on the demo site and following the insctructions. On the demo site you can also get a small amounth of token to test it and test my others token dependent contracts, but be aware that tokens will be sent only 1 time per wallet.
                    " 
                    link1="
                        https://github.com/guibraguini/Tokens
                    "
                    link2="
                        /tokens
                    "
                    link3="
                        
                    "
                    />
                    <WorksConteiner title="NFTS" image={NFTS} text="
                        A simple concept project where you can mint and controll 2 types of nfts that can be use in another project. You can test it in the demo section using the Goerli testnet. The code on the demo is a little different from the original code, that's because the new code fits better on the demo purpose, permiting to mint the nfts with no prerequisite but only 1 time per wallet. You can test the original code by coping it from code section and implementing it, like i show in the video section.
                    "  
                    link1="
                        https://github.com/guibraguini/NFTS
                    "
                    Link2="
                        /nfts
                    "
                    Link3="
                    
                    "
                    />
                    <WorksConteiner title="EXCHANGE" image={Exchange} text="
                        A simple concept project where i've tryed to create a simple exchange from scratch, in this exchange the owner can register new tokens and add or remove they liquidit according on how much of it his wallet and the contract have. On the demo section you can test it by using some Goerli ETH, or by redeming the tokens from my tokens project.
                    "  
                    link1="
                        https://github.com/guibraguini/Exchange
                    "
                    Link2="
                        /exchange
                    "
                    Link3="
                        
                    "
                    />
                    <WorksConteiner title="NFT VOTING SYSTEM" image={Voting} text="
                        Another concept project where i've use nfts to create a voting system where one type of nfts let you create and change the topic of the vote, and the other let you vote on the current topic. You can test the demo by reedeming the nfts of my other project, but the code of this demo is slight diferent from the original code, just to fit better to the purpose of the demo. You can test the original code by coping it from code section and implementing it, like i show in the video section.
                    "  
                    link1="
                        https://github.com/guibraguini/NFTS-Voting
                    "
                    Link2="
                        /voting 
                    "
                    Link3="
                    
                    "
                    />
                */}
                </div>

            </div>
        </div>
        <div className='relative h-[10%]  mt-[10%]'/>
    </div>
  )
}

export default Works