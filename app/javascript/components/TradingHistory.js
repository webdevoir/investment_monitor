import React, { Fragment } from 'react'
import axios from 'axios'
import TradingHistoryPanel from './TradingHistoryPanel'
import * as constants from './constants'

class TradingHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: null,
      currentUserId: null,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      currentUserId: nextProps.currentUserId,
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isLoading == false && this.state.currentUserId == null) { // trigger render after App loading has finished
      return true;
    } else if (this.state.stocks == null) { // trigger render after fetchTradingHistory
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    this.fetchTradingHistory();
  }

  fetchTradingHistory() {
    console.log(`TradingHistory: fetching Trading History data for user_id: ${this.state.currentUserId}`);
    axios.get(`${constants.BASE_STOCKS_URL}/stocks/stock_history_by_user.json?user_id=${this.state.currentUserId}`)
      .then( res => {
        const stocks = res.data;
        this.setState({ stocks });
      })
  }

  componentDidMount() {
    if (this.state.currentUserId == null) {
      console.log('TradingHistory: waiting for App component to finish fetching user data');
    } else {
      this.fetchTradingHistory();
    }
  }

  render() {
    const { stocks } = this.state;
    let panels;

    if (this.state.stocks == null) {
      panels = <div>loading...</div>
    } else {
      panels = (
        stocks.map(stock => {
          return <TradingHistoryPanel key={stock.id} stock={stock}/>
        })
      )
    }

    return (
      <Fragment>
        {panels}
      </Fragment>
    )
  }
}

export default TradingHistory;