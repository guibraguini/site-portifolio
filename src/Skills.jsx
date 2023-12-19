import React from 'react'
import solidity from './logos/solidity.png'
import js from './logos/js.png'
import truffle from './logos/truffle.png'
import ganache from './logos/ganache.png'
import hardhat from './logos/hardhat.png'
import web3js from './logos/web3js.png'
import ethersjs from './logos/ethersjs.png'
import nodejs from './logos/nodejs.png'
import react from './logos/react.png'
import metamask from './logos/metamask.png'
import c from './logos/C.png'
import cpp from './logos/cpp.png'
import html from './logos/html.png'
import css from './logos/css.png'
import remix from './logos/remix.png'
import SkillsConteiner from './SkillsConteiner'

const Skills = () => {
  return (
    <div className='w-full'>
        <div className='relative flex flex-col justify-center items-center w-[100%]  h-[80%] mt-[25%]'>
            <div>
                <div>
                    <p className='text-2xl underline decoration-red-600	decoration-2 underline-offset-2 md:decoration-4 md:underline-offset-4 md:text-6xl flex flex-col justify-center items-center w-full'>
                        Skills
                    </p>
                    <p className='relative flex flex-col justify-center items-center text-sm mt-[10px] text-emerald-700'> 
                        // Hover or Touch to learn more about it        
                    </p>
                </div>
                <div className='w-full mt-[10%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[5px] lg:gap-[10px] xl:gap-[20px] 2xl:gap-[30px]  justify-center items-center'>
                    <SkillsConteiner image={solidity} title="solidity" content="
                    Security. This is the First word that come to my mind when thinking about develope any smart contract with solidity. Once deployed a smart contract can not be changed, that's why all my contracts logic is built around security. In addition to that i constantly make use of my knowleged about how systems and the evm works to make those contracts gas-eficint.
                    "/>
                    <SkillsConteiner image={js} title="javascript" content="
                    JavaScript was one of the first programming language that i've ever learned, and probably one of those that i'm most comfortable with, considering its versatility it may be the one i use the most.
                    "/>
                    <SkillsConteiner image={truffle} title="truffle" content="
                    In my opinion truffle is one of the best tools a smart contract developer can have under his belt. Sometimes, depending on the project, i would prefer to use other tools like hardhat or even remix, but truffle does one thing and do it the best. If i had a dapp project using web3js and could chose a tool to build it all, i would definitely use truffle.    
                    "/>
                    <SkillsConteiner image={ganache} title="ganache" content="
                    If truffle is one of the best tools, then ganache would be the icing on truffle's cake. The ganache UI makes it really enjoyable for me to use. The lack of UI in others tools isn't a problem at all, but the addition of it is definitely a plus.
                    "/>
                    <SkillsConteiner image={hardhat} title="hardhat" content="
                    Despite the lack of a use interface like ganache, i really like to work with hardhat, especially because of the console.log() function.
                    "/>
                    <SkillsConteiner image={remix} title="remix" content="
                    Remix is a powerful and useful tool. What i like about it is that it's quick, i still prefer to use hardhat or truffle in most scenarios, but sometimes when i want to do small contracts in a quick way remix is what i use.    
                    "/>
                    <SkillsConteiner image={web3js} title="Web3Js" content="
                    Web3Js was my first contact with a library that allow interaction with an Ethereum (or other chains) node. I think is great to use with truffle for instance...
                    "/>
                    <SkillsConteiner image={ethersjs} title="EthersJs" content="
                    EthersJs is another great library, i use it mainly while developing with hardhat. 
                    "/> 
                    <SkillsConteiner image={nodejs} title="NodeJs" content="
                    NodeJs is one of the tools i use the most. I've started learning it years ago to develop discord bots, and now the knowledge that i got on it turned ou to be a great advantage.
                    "/>
                    <SkillsConteiner image={react} title="ReactJs" content="
                    React is a tool that i feel im using for years now, even tho i've just learned it. The way it makes web development easier and faster is really something.    
                    "/>
                    <SkillsConteiner image={metamask} title="MetaMask" content="
                    I've been using metamask since before i've start to develop dapps and smart contracts. I've used to like it a lot, but now, using things like it API, i like it even more.    
                    "/>
                    <SkillsConteiner image={c} title="C" content="
                    C was the language that made me understand how systems works and that was fundamental for me to understand evm and gas consumption on smart contracts.    
                    "/>
                    <SkillsConteiner image={cpp} title="C++" content="
                    C++ is the language that i've used to do some of my longests projects. Back then i had to make some games with my colleagues using some C++ graphic library. In doing it, i've learned the importance of writing a well written code for others programmers to understand it in rapid easy way.
                    "/>
                    <SkillsConteiner image={html} title="HTML" content="
                    I don't know what much can i say about html, it's really unusual these days to use html only, at least for me. Like, i can use it, but with so much technologies that facilitate the work, why should i?
                    "/>
                    <SkillsConteiner image={css} title="CSS" content="
                    What would be the web without an beautifully organized interfaces? I think css can be a very powerful tool that can do lots of things. If you search in the web, it's easy to find lots of crazy things using html + css only... But for me, i still think the best way to use css is doing just elements styles and simple animations.
                    "/>                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Skills