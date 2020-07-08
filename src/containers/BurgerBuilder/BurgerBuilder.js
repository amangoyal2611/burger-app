import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import instance from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions'



class BurgerBuilder extends Component {

    state = {

        totalPrice: 20,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {

        // instance.get('https://burger-79093.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data });
        //     })
        //     .catch(e => {
        //         this.setState({ error: true })
        //     })
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((newSum, el) => {
                return newSum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {

        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            // console.log(encodeURIComponent(i));
        }

        queryParams.push("price=" + this.props.totalPrice)

        const queryString = queryParams.join("&");

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });


    }


    render() {

        let orderSummary = null;

        let burger = this.state.error ? <p>Can't connect to server</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={this.props.ings}
                        price={this.props.totalPrice}
                        isPurchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.props.totalPrice}
            ></OrderSummary>

            if (this.state.loading) {
                orderSummary = <Spinner></Spinner>;
            }

        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {

        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName })

    }
}


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, instance));