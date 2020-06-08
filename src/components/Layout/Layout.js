import React from 'react'
import Aux from "../../hoc/Auxx";
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar'

const layout = (props) => {
    return (
        <Aux>
            <Toolbar></Toolbar>
            <div>Sidedrawer, Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default layout;