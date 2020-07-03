import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import instance from '../../../axios'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
        console.log(order.price)
        instance.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false, purchasing: false });
                this.props.history.push('/');
            })
            .catch(e => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
        let form = (
            <form onSubmit={this.orderHandler}>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
                <input className={classes.Input} type="text" name="email" placeholder="Your Email"></input>
                <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"></input>
                <Button btnType="Success"  >Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner></Spinner>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;