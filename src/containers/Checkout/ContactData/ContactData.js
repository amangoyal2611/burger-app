import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import instance from '../../../axios'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {

        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {
                    
                },
                value: 'fastest',
                valid: true
            }
        },
        isFormValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required != null)
            isValid = value.trim() !== '' && isValid;

        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid;

        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid;

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        let formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: +this.props.totalPrice,
            orderData: formData
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

    formChangedhandler = (event, inputIdentifier) => {
        const updatedFormData = { ...this.state.orderForm };

        let updatedElement = { ...updatedFormData[inputIdentifier] };

        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true

        let isFormValid = true;

        for (let inputIdentifier in updatedFormData) {
            
            isFormValid = updatedFormData[inputIdentifier].valid && isFormValid
        }

        console.log(isFormValid)

        updatedFormData[inputIdentifier] = updatedElement

        this.setState({ orderForm: updatedFormData, isFormValid: isFormValid });
    }

    render() {

        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => (this.formChangedhandler(event, formElement.id))}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                    />
                ))}

                <Button btnType="Success" disabled={!this.state.isFormValid} >Order</Button>
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