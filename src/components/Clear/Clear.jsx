import React from "react";
import Button from "../button/Button";

function Clear({ symbols, handleOnClick }) {
    // const symbols = ['c']

    return (
        <div className="clear">
            {symbols.map((symbol) => <Button symbol={symbol} handleOnClick={handleOnClick} key={symbol} />)}
        </div>
    )
}

export default Clear