import React, { Component } from 'react'
import Portfolio from '../Components/Tables/Portfolio'
import BuyStockForm from '../Components/Forms/BuyStock'


class PortfolioContainer extends Component {
   
    state = {
        tickerSymbol:'',
        quantity: 0,
        stockData: {},
      }
       
      //function to start process of fetching and purchasing stock
       handleOnSubmitBuyButton = async (e, ticker, amount) => {
          e.preventDefault()
         await this.setState({tickerSymbol:ticker, quantity:amount}) 
         await this.fetchStock(ticker)
         const {tickerSymbol, quantity, stockData: {price}} = this.state
         this.buyStock(1, tickerSymbol, price, quantity)
      }
      
      //function to fetch stock from IEX API
       fetchStock = async (tickerSymbol) => {
         let response = await fetch(`https://cloud.iexapis.com/stable/stock/${tickerSymbol}/quote?token=pk_a1bdb3b5a0ef403ba560643968b4e8e4`)
         let data = await response.json()   
        await this.setState({stockData: {
            symbol: data.symbol,
            price: data.latestPrice
         }})
         console.log(this.state)
       }
     
     //fucntion to Post bought stock to rails API
       buyStock = (user, symbol, price,quantity) => {
         fetch("http://localhost:3000/api/v1/transactions", {
           method: "POST",
           headers: {
             "content-type": "application/json",
             "accepts": "application/json"
           },
           body: JSON.stringify(
     
             {
               transaction: {
                 share_quantity: quantity,
                 price_per:price,
                 user_id: user,
                 ticker_symbol: symbol
               }
             }
           )
         })
       }
     
       



    render() {
        return (
            <>
            <div className="container">
               <Portfolio />
               <BuyStockForm handleOnSubmitBuyButton={this.handleOnSubmitBuyButton}/>
            </div>
            </>
        )
    }
}


export default PortfolioContainer