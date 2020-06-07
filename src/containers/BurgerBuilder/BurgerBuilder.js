import React, { Component } from 'react'
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <Burger />
                <p>Build control</p>
            </Aux>
        );
    }
}

export default BurgerBuilder;