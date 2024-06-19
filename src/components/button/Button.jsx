import React from "react";
import styles from './Button.module.css'

function Button({ symbol, handleOnClick }) {


    return (
        <button className={styles.btn} data-symbol={symbol} onClick={() => handleOnClick(symbol)}>{symbol}</button>
    )
}

export default Button