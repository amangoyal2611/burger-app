import React from 'react'
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems'
import DrawerToogle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToogle clicked={props.drawerToogleClicked}></DrawerToogle>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly} >
            <NavigationItems></NavigationItems>
        </nav>
    </header>
); 

export default toolbar;