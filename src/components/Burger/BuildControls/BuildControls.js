import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Price: <strong>Rs.{props.price}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl
                    key={ctrl.type}
                    label={ctrl.label}
                    type={ctrl.type}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}/>
            })}
            <button
                disabled={!props.isPurchasable}
                className={classes.OrderButton}
                onClick={props.ordered}
            >ORDER NOW</button>
        </div>
    );
};

export default buildControls;