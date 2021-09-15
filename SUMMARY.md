# Scan the latest pairs added on UniswapV3 using TheGraph in Google Sheets 

# Introduction
##### This tutorial is built to help non-technical people get a sense of how to interact with TheGraph and connect onchain data into Google Sheets. I've been working on gathering crypto data in Google Sheets for a couple of years now and I found that sheets is a useful interface when filtering for new listed pairs on decentralized exchanges. In this tutorial you'll learn how to find a UniswapV3 subgraph on The Graph, make a GraphQL request, translate the query in Javascript (Google Sheet's programming language) using Postman, and finally retrieve the pairs in the Sheet with a user-defined formula.

### Prerequisites
##### For beginners with basic coding skills. This training assumes that you have a Gmail/Google account as we will be building upon Google Sheets. Also it would help if you have access to Postman to get an easier view on how to test The Graph request models and transform GraphQL code into Javascript which is the Official Google Sheet programming language. 

* GraphQL & Javascript knowledge are a plus. Code can be written directly with the help of Postman and The Graph's website.
* Postman's software makes API development easier.
* Code :
  * uniswap.gs - for retrieving Uniswap's latest pair through The Graph API (later explained in the tutorial)
  * importJson.gs - for working with JSON objects in Google Sheets User-Interface (later explained in the tutorial)


### First, what is Uniswap?
##### [Uniswap](https://academy.binance.com/en/articles/what-is-uniswap-and-how-does-it-work) is a decentralized exchange protocol built on Ethereum. To be more precise, it is an automated liquidity protocol. There is no order book or any centralized party required to make trades. Uniswap allows users to trade without intermediaries, with a high degree of decentralization and censorship-resistance.

#### This is how Uniswap’s Decentralized Exchange looks like:
[<img src=https://user-images.githubusercontent.com/53000607/132863640-4889463d-0e54-4a9e-b7ca-3a71017f8fc7.png width="45%">](https://uniswap.exchange/swap)   <img src=https://user-images.githubusercontent.com/53000607/132863582-dd3c9ea6-e1e4-43f2-b42b-c27254631006.png width="45%">    


### Getting familiar with TheGraph and GraphQL queries
### Testing model & translating the query into javascript using Postman
### Connecting the model to Google Sheet
### Google Sheet Formula


```javascript
/**
* @OnlyCurrentDoc
*/
/*====================================================================================================================================*
  CryptoTools Google Sheet Feed by Eloise1988
  ====================================================================================================================================
  Version:      1.0.0
  Project Page: https://github.com/Eloise1988/THEGRAPH
  Copyright:    (c) 2021 by Eloise1988
                
  License:      GNU License
               
  ------------------------------------------------------------------------------------------------------------------------------------
  A library for importing Uniswap's V3 latest pairs using TheGraph:

     UNISWAP               For use by end users to retrieve Uniswap's V3 latest pairs
    
  For bug reports see https://github.com/Eloise1988/TEHGRAPH/issues

  ------------------------------------------------------------------------------------------------------------------------------------
  Changelog:
  
  2.1.0   Creation Uniswap function  *====================================================================================================================================*/
  

/**UNISWAP
 * Returns new tradable pairs on Uniswap, giving constraints on the number of Days Active, the Volume ($), the Liquidity ($), the number of Transactions 
 *
 * By default, data gets transformed into a table 
 * For example:
 *
 * =UNISWAP(5,10000,10000,100)
 *
 * @param {days}                    the number of Days since the pair is active
 * @param {volume}                  the minimum Volume ($)
 * @param {liquidity}               the minimum Liquidity ($)
 * @param {tx_count}                the number of Transactions existant since creation
 * @param {parseOptions}           an optional fixed cell for automatic refresh of the data
 * @customfunction
 *
 * @return a table with all new tradable pairs on Uniswap and their number of Days since Active, the Volume ($), the Liquidity ($), the number of Transactions 
 **/
 
async function UNISWAP(days,volume,liquidity,tx_count){
  Utilities.sleep(Math.random() * 100)
  
      unix_day=Math.floor(Date.now() / 1000-parseFloat(days)*86400);
      
      var graphql = JSON.stringify({
      query: "query{\n  \n  pools( where: {\n      volumeUSD_gte:"+String(volume)+"\n      totalValueLockedUSD_gte: "+String(liquidity)+"\n      txCount_gte:"+String(tx_count)+"\n      createdAtTimestamp_gte: "+String(unix_day)+"\n    } \n		) {\n  \n    token0 {\n      symbol\n    }\n    token0Price\n    token1 {\n      symbol\n    }\n    token1Price\n    id\n    volumeUSD\n    createdAtTimestamp\n    totalValueLockedUSD\n    txCount\n  }}",
        variables: {}
      })
      var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        payload: graphql,
        redirect: 'follow'
      };

      return ImportJSONAdvanced('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',requestOptions,'','noInherit',includeXPath_,defaultTransform_);      

    
}


```



![uni2](https://user-images.githubusercontent.com/53000607/132863582-dd3c9ea6-e1e4-43f2-b42b-c27254631006.png)
![uni1](https://user-images.githubusercontent.com/53000607/132863640-4889463d-0e54-4a9e-b7ca-3a71017f8fc7.png)

#### Some of the CryptoTools data analytics users have been interested in finding a way to get the latest tokens trading on Uniswap, most probably as a trading analytics tool.
#### As a result, I’ve created a Google Sheet templates that helps you filter new tradable coins.
### [ACCESS LIVE TEMPLATE SHEET HERE](https://docs.google.com/spreadsheets/d/1tME9nMh79KzZP4Wmld7lezom6je4BOw_0T9ABf5GKXE/edit?usp=sharing)
#### The sheet returns all new tradable pairs on Uniswap, giving constraints on the Number of Days the pair has been active, the Volume ($), the Liquidity ($), and the number of Transactions.
<img width="1346" alt="thegraph_code" src="https://user-images.githubusercontent.com/53000607/132865391-1d131a43-7973-47d1-a182-a4fb5bfec97c.png">
<img width="1346" alt="thegraph_uni2" src="https://user-images.githubusercontent.com/53000607/132865398-6227fe0c-d447-408d-9e67-5767d8125744.png">
https://thegraph.com/legacy-explorer/subgraph/uniswap/uniswap-v3
#### In order to get Uniswap’s analytics I used The Graph which is an indexing protocol for querying networks like Ethereum and IPFS. Anyone can use, build and publish open APIs, called subgraphs, making data easily accessible.
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
There are plenty more functionalities that can be added through the TheGraph API. Don’t hesitate to have a look at all available end points like:

* totalSupply
* untrackedVolumeUSD
* liquidityProviderCount
* and other ...

# Conclusion
A user-friendly interface that interacts with The Graph protocols
They will learn how to make data requests, write models, interact with the blockchain data


###[Manual authorization scopes for Sheets](https://developers.google.com/apps-script/guides/services/authorization)
When building an add-on or other script that uses the Spreadsheet service, you can force the authorization dialog to ask only for access to files in which the add-on or script is used, rather than all of a user's spreadsheets, documents, or forms. To do so, include the following JsDoc annotation in a file-level comment:
```javascript
/**
* @OnlyCurrentDoc
*/
```


<img width="588" alt="goog_auth_5" src="https://user-images.githubusercontent.com/53000607/132861811-0d7c4712-8f8c-4f4b-892c-2779a4035036.png">
<img width="632" alt="goog_auth_4" src="https://user-images.githubusercontent.com/53000607/132861818-d9d927d6-c230-4924-9c35-1bf528afbe72.png">
<img width="654" alt="goog_auth_3" src="https://user-images.githubusercontent.com/53000607/132861821-62440a1f-99b3-4891-80a0-3f6b2c6365d3.png">
<img width="1370" alt="goog_auth_2" src="https://user-images.githubusercontent.com/53000607/132861825-6da9adbc-6bf2-4733-bf9b-4d5476b8f19f.png">
<img width="1371" alt="goog_auth" src="https://user-images.githubusercontent.com/53000607/132861831-8dbba6ee-617f-44ec-938c-7a922b498f76.png">
<img width="1423" alt="postman" src="https://user-images.githubusercontent.com/53000607/132861836-9fe4bd08-9ad1-42ee-893d-70c89d9d9dd8.png">

