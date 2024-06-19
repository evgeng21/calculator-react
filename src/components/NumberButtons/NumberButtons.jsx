import React from "react";
import Button from "../button/Button";

function NumberButtons({symbols,handleOnClick}) {
    // const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '=']

    return (
        <div className="numbers">
            {symbols.map((symbol) => <Button symbol={symbol} handleOnClick={handleOnClick} key={symbol}/>)}
        </div>
    )
}

export default NumberButtons