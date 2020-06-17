import React, { Component } from 'react';
import Layout from '../src/containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'

class App extends Component {

  render() {
    return (
      <Layout>
        <BurgerBuilder></BurgerBuilder>
        <Checkout></Checkout>
      </Layout>
    );
  }
}

export default App;