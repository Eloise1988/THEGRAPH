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

