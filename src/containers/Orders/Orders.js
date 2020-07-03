import React, { Component } from 'react'
// import classes from './Orders.module.css'
import Order from '../../components/Order/Order'
import instance from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        instance.get('orders.json')
            .then((res) => {

                let fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false, orders: fetchedOrders })
                console.log(this.state.orders)

            })
            .catch(e => {
                this.setState({ loading: false })
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => {
                        console.log(order.ingredients);
                        return <Order key={order.id} ingredients={order.ingredients} totalPrice={order.price}></Order>
                    })
                }
            </div>
        );
    }
}

export default withErrorHandler(Orders, instance);