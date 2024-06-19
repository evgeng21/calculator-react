import React from "react";
import Button from "../button/Button";

function Symbols({symbols, handleOnClick}) {
    // const symbols = ['+', '-', '*', '/']

    return (
        <div className="symbols">
            {symbols.map((symbol) => <Button symbol={symbol} handleOnClick={handleOnClick} key={symbol}/>)}
        </div>
    )
}

export default Symbols