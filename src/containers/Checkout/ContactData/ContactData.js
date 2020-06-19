import React, { Component } from 'react'
import { render } from '@testing-library/react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name"></input>
                    <input type="text" name="email" placeholder="Your Email"></input>
                    <input type="text" name="street" placeholder="Street"></input>
                    <input type="text" name="postal" placeholder="Postal Code"></input>
                    <Button btnType="Success" >Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;