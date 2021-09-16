# Scan the latest pairs added on UniswapV3 using TheGraph in Google Sheets 
[<img width="1381" alt="gif_uni" src="https://user-images.githubusercontent.com/53000607/133595220-6e918166-cfc9-4d9c-9b5b-5bc4395852ce.gif">](https://docs.google.com/spreadsheets/d/1tME9nMh79KzZP4Wmld7lezom6je4BOw_0T9ABf5GKXE/edit?usp=sharing)

# Introduction
##### This tutorial is built to help non-technical people get a sense of how to interact with TheGraph and connect onchain data into Google Sheets. I've been working on gathering crypto data in Google Sheets for a couple of years now and I found that sheets is a useful interface when filtering for new listed pairs on decentralized exchanges. In this tutorial you'll learn how to find a UniswapV3 subgraph on The Graph, make a GraphQL request, translate the query in Javascript (Google Sheet's programming language) using Postman, and finally retrieve the pairs in the Sheet with a user-defined formula.

### Prerequisites
##### For beginners with basic coding skills. This training assumes that you have a Gmail/Google account as we will be building upon Google Sheets. Also it would help if you have access to Postman to get an easier view on how to test a GraphQL request from TheGraph and transform it into Javascript code which is  the Official programming language of Google Sheet . 

* GraphQL & Javascript knowledge are a plus. Code can be written directly with the help of Postman and The Graph's website.
* Postman's software makes API development easier.
* Code :
  * uniswap.gs - for retrieving Uniswap's latest pair through The Graph API (later explained in the tutorial)
  * importJson.gs - for working with JSON objects in Google Sheets (later explained in the tutorial)


### First, what is Uniswap?
##### [Uniswap](https://academy.binance.com/en/articles/what-is-uniswap-and-how-does-it-work) is a decentralized exchange protocol built on Ethereum. To be more precise, it is an automated liquidity protocol. There is no order book or any centralized party required to make trades. Uniswap allows users to trade without intermediaries, with a high degree of decentralization and censorship-resistance.

#### This is how Uniswap’s Decentralized Exchange looks like:
[<img src=https://user-images.githubusercontent.com/53000607/132863640-4889463d-0e54-4a9e-b7ca-3a71017f8fc7.png width="500">](https://uniswap.exchange/swap)   <img src=https://user-images.githubusercontent.com/53000607/132863582-dd3c9ea6-e1e4-43f2-b42b-c27254631006.png width="500">    


### Getting familiar with TheGraph and GraphQL queries
##### [The Graph](https://thegraph.com/) is a decentralized protocol for indexing and querying data from blockchains. It is able to query networks like Ethereum and since Uniswap is built on Ethereum, it will allow us to get its onchain data. 
 
#### Finding Uniswap V3 subgraph on Thegraph
##### In this tutorial, we will be focusing on getting blockchain data on Version 3 of Uniswap. All you need to do is to search in TheGraph's explorer bar for Uniswap V3. The following picture shows you what TheGraph looks like and which subgraph we will be using.

##### [<img width="500" alt="thegraph" src="https://user-images.githubusercontent.com/53000607/133580577-56cecc0a-79c3-473d-83f9-6e9420ec6afd.png">](https://thegraph.com/legacy-explorer/) [<img width="500" alt="thegraph_uni2" src="https://user-images.githubusercontent.com/53000607/132865398-6227fe0c-d447-408d-9e67-5767d8125744.png">](https://thegraph.com/legacy-explorer/subgraph/uniswap/uniswap-v3)


### Testing model & translating the query into javascript using Postman
##### [GraphQL](https://en.wikipedia.org/wiki/GraphQL) is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. GraphQL was developed internally by Facebook in 2012 before being publicly released in 2015. 


[<img width="45%" alt="thegraph_code" src="https://user-images.githubusercontent.com/53000607/132865391-1d131a43-7973-47d1-a182-a4fb5bfec97c.png">](https://thegraph.com/legacy-explorer/subgraph/uniswap/uniswap-v3)

##### The Uniswap Info website is also feeding with GraphQL queries from the same subgraph.
[<img width="1346" alt="uniswap-info" src="https://user-images.githubusercontent.com/53000607/132865907-1d48eec7-e688-4843-9db7-b97279951ab2.png">](https://info.uniswap.org/home)

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






### [ACCESS LIVE TEMPLATE SHEET HERE](https://docs.google.com/spreadsheets/d/1tME9nMh79KzZP4Wmld7lezom6je4BOw_0T9ABf5GKXE/edit?usp=sharing)
#### The sheet returns all new tradable pairs on Uniswap, giving constraints on the Number of Days the pair has been active, the Volume ($), the Liquidity ($), and the number of Transactions.


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


#### [<img width="32%" alt="goog_auth_5" src="https://user-images.githubusercontent.com/53000607/132861811-0d7c4712-8f8c-4f4b-892c-2779a4035036.png"> <img width="32%" alt="goog_auth_4" src="https://user-images.githubusercontent.com/53000607/132861818-d9d927d6-c230-4924-9c35-1bf528afbe72.png"> <img width="32%" alt="goog_auth_3" src="https://user-images.githubusercontent.com/53000607/132861821-62440a1f-99b3-4891-80a0-3f6b2c6365d3.png"> <img width="32%" alt="goog_auth_2" src="https://user-images.githubusercontent.com/53000607/132861825-6da9adbc-6bf2-4733-bf9b-4d5476b8f19f.png"> <img width="32%" alt="goog_auth" src="https://user-images.githubusercontent.com/53000607/132861831-8dbba6ee-617f-44ec-938c-7a922b498f76.png"> <img width="32%" alt="postman" src="https://user-images.githubusercontent.com/53000607/132861836-9fe4bd08-9ad1-42ee-893d-70c89d9d9dd8.png">](https://developers.google.com/apps-script/guides/services/authorization)

Picture en trop
[<img width="1381" alt="gs_uni" src="https://user-images.githubusercontent.com/53000607/133581515-37656860-4604-4caa-8e65-38d6bf9f0815.png">](https://docs.google.com/spreadsheets/d/1tME9nMh79KzZP4Wmld7lezom6je4BOw_0T9ABf5GKXE/edit?usp=sharing)
