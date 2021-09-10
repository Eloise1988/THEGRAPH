What is Uniswap?
Uniswap is a decentralized exchange protocol built on Ethereum. To be more precise, it is an automated liquidity protocol. There is no order book or any centralized party required to make trades. Uniswap allows users to trade without intermediaries, with a high degree of decentralization and censorship-resistance.
Traders can exchange Ethereum tokens (ERC20) on Uniswap without having to trust anyone with their funds. Meanwhile, anyone can lend their crypto to special reserves called liquidity pools. In exchange for providing money to these pools, they earn fees. https://academy.binance.com/en/articles/what-is-uniswap-and-how-does-it-work

This is how Uniswap’s Decentralized Exchange looks like:
![uni2](https://user-images.githubusercontent.com/53000607/132863582-dd3c9ea6-e1e4-43f2-b42b-c27254631006.png)
![uni1](https://user-images.githubusercontent.com/53000607/132863640-4889463d-0e54-4a9e-b7ca-3a71017f8fc7.png)

Some of the CryptoTools data analytics users have been interested in finding a way to get the latest tokens trading on Uniswap, most probably as a trading analytics tool.
As a result, I’ve created a Google Sheet templates that helps you filter new tradable coins.
ACCESS LIVE TEMPLATE SHEET HERE https://docs.google.com/spreadsheets/d/1tME9nMh79KzZP4Wmld7lezom6je4BOw_0T9ABf5GKXE/edit?usp=sharing
The sheet returns all new tradable pairs on Uniswap, giving constraints on the Number of Days the pair has been active, the Volume ($), the Liquidity ($), and the number of Transactions.
<img width="1346" alt="thegraph_code" src="https://user-images.githubusercontent.com/53000607/132865391-1d131a43-7973-47d1-a182-a4fb5bfec97c.png">
<img width="1346" alt="thegraph_uni2" src="https://user-images.githubusercontent.com/53000607/132865398-6227fe0c-d447-408d-9e67-5767d8125744.png">
https://thegraph.com/legacy-explorer/subgraph/uniswap/uniswap-v3
In order to get Uniswap’s analytics I used The Graph which is an indexing protocol for querying networks like Ethereum and IPFS. Anyone can use, build and publish open APIs, called subgraphs, making data easily accessible.
<img width="1346" alt="uniswap-info" src="https://user-images.githubusercontent.com/53000607/132865907-1d48eec7-e688-4843-9db7-b97279951ab2.png">
https://info.uniswap.org/home

UNISWAP FUNCTION IN GOOGLE SHEETS:
Returns new tradable pairs on Uniswap, giving constraints on the Number of Days the coin is active, the Volume ($), the Liquidity ($), and the number of Transactions .
![UNISWAP](https://user-images.githubusercontent.com/53000607/132866211-131dc269-638f-4328-ad7d-f8ef8d9f3651.gif)

For example, if I want to get the new Uniswap pairs where:
the pool was launched in the last 7 Days
the daily Volume is greater than $20'000
the Liquidity is above $30'000
and there has been more than1'000 Transactions since the launch
The formula becomes:
=UNISWAP(7,20000,30000,1000)

@param {days} the number of Days since the pair is active
@param {volume} the minimum Volume ($)
@param {liquidity} the minimum Liquidity ($)
@param {tx_count} the number of Transactions existant since creation


* @return a table (see GIF above)with all new tradable pairs on Uniswap and their number of Days since Active, the Volume ($), the Liquidity ($), the number of Transactions

More indicators for scanning ?
There are plenty more functionalities that can be added through the TheGraph API. Don’t hesitate to have a look at all available end points like:

totalSupply
untrackedVolumeUSD
liquidityProviderCount

<img width="588" alt="goog_auth_5" src="https://user-images.githubusercontent.com/53000607/132861811-0d7c4712-8f8c-4f4b-892c-2779a4035036.png">
<img width="632" alt="goog_auth_4" src="https://user-images.githubusercontent.com/53000607/132861818-d9d927d6-c230-4924-9c35-1bf528afbe72.png">
<img width="654" alt="goog_auth_3" src="https://user-images.githubusercontent.com/53000607/132861821-62440a1f-99b3-4891-80a0-3f6b2c6365d3.png">
<img width="1370" alt="goog_auth_2" src="https://user-images.githubusercontent.com/53000607/132861825-6da9adbc-6bf2-4733-bf9b-4d5476b8f19f.png">
<img width="1371" alt="goog_auth" src="https://user-images.githubusercontent.com/53000607/132861831-8dbba6ee-617f-44ec-938c-7a922b498f76.png">
<img width="1423" alt="postman" src="https://user-images.githubusercontent.com/53000607/132861836-9fe4bd08-9ad1-42ee-893d-70c89d9d9dd8.png">

