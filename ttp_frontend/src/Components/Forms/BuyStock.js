import React, { Component } from 'react'

class BuyStockForm extends Component {
    
    state = {
        tickerSymbol: '',
        quantity: 0
    }

     handleChange = async(e) => {
     await this.setState({[e.target.name]:e.target.value});
      console.log(this.state)
    }



    render() {

        const {tickerSymbol, quantity} = this.state

        
        return (
          <div className="buy-container">
          <h1 className="text-center display-4 style={{width: '40%'}}">Buy Stock</h1>
          <h3 className="display-7 style={{width: '40%', color:'green'}}">Balance: ${this.props.user.balance}</h3>
          <form action="" onSubmit={((e) => this.props.handleOnSubmitBuyButton(e, tickerSymbol, quantity))}>
            <div className="form-group">
               <label for="tickerSymbol" className="text-center">Search Stocks</label>
               <input type="text" className="form-control" name="tickerSymbol" placeholder="Ticker Symbol" value={tickerSymbol} onChange={e => this.handleChange(e)} style={{width: '100%'}}/>
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Quantity</label>
              <input type="number" className="form-control"  name="quantity" value={quantity} onChange={(e) => this.handleChange(e)} style={{width: '50%'}}/>
            </div>
                <button type="submit" className="btn btn-primary">Buy</button>
          </form>  
          </div>
        
        )

       
       
    } 
}

export default BuyStockForm

// <input type="text" name="tickerSymbol" value={tickerSymbol} onChange={e => this.handleChange(e)}/>
// <input type="number" name="quantity" value={quantity} onChange={(e) => this.handleChange(e)}/>
// <button>Buy</button>