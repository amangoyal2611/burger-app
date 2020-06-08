import React, { Component } from 'react'
import Aux from "../../hoc/Auxx";
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }

    render() {
        return (
            <Aux>
                <Toolbar></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}></SideDrawer>
                <div>Sidedrawer, Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

export default Layout;