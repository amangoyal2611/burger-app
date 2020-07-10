import React, { Component } from 'react'
// import classes from './Orders.module.css'
import Order from '../../components/Order/Order'
import instance from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {



    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {

        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                console.log(order.ingredients);
                return <Order key={order.id} ingredients={order.ingredients} totalPrice={order.price}></Order>
            })
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => { dispatch(actions.fetchOrders()) }
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, instance));