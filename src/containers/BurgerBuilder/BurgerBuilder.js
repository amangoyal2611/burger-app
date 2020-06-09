import React, { Component } from 'react'
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import instance from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 10,
    cheese: 20,
    meat: 30,
    bacon: 15,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 20,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        instance.get('https://burger-79093.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data });
            })
            .catch(e => {
            this.setState({error: true})
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENTS_PRICE[type];
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENTS_PRICE[type];
        const newPrice = oldPrice - priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients);
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
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Aman',
                address: {
                    city: 'Ghaziabad',
                    country: "India"
                },
                email: 'aman@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        instance.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(e => {
                this.setState({ loading: false, purchasing: false });
            });
    }


    render() {

        let orderSummary = null;

        let burger = this.state.error ? <p>Can't connect to server</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={this.state.ingredients}
                        price={this.state.totalPrice}
                        isPurchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, instance);