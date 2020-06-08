import React from 'react'
import clases from './Backdrop.module.css'

const backdrop = (props) => (
    props.show ? <div className={clases.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;