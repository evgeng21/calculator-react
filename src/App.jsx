import { useState } from 'react'
import './App.css'
import Symbols from './components/Symbols/Symbols'
import Clear from './components/Clear/Clear'
import NumberButtons from './components/NumberButtons/NumberButtons'

function App() {

  const symbolsList = ['+', '-', '*', '/']
  const clearSymbolsList = ['c']
  const numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '=']

  const [result, setResult] = useState(0)
  const [calculateSymbol, setCalculateSymbol] = useState('')
  const [tempResult, setTempResult] = useState(0)
  const [isFirstCalculate, setIsFirstCalculate] = useState(true)
  const [errorResult, setErrorResult] = useState('')

  function handleOnClick(buttonSymbol) {
    // const totalResult = calculateResult()
    if (symbolsList.includes(buttonSymbol)) {
      const totalResult = calculateResult()
      if (!isNaN(Number(totalResult))) {
        setCalculateSymbol(buttonSymbol)
        setTempResult(totalResult)
        setResult(0)
      } else {
        setErrorResult(totalResult)
      }

      console.log(result)
    } else if (clearSymbolsList.includes(buttonSymbol)) {
      setResult(0)
      setTempResult(0)
      setIsFirstCalculate(true)
    } else {
      if (buttonSymbol !== '=') {
        addResultContent(buttonSymbol)
      } else {
        const totalResult = calculateResult()
        if (!isNaN(Number(totalResult))) {
          setResult(totalResult)
          setTempResult(0)
          setIsFirstCalculate(true)
        } else {
          setErrorResult(totalResult)
        }

      }

    }
  }

  function addResultContent(num) {
    if (result !== 0) {
      setResult(String(result) + String(num))
    } else {
      setResult(num)
    }
  }

  function calculateResult() {
    setErrorResult('')
    // debugger
    if (isFirstCalculate) {
      setIsFirstCalculate(false)
      return parseFloat(result) || 0
    }

    switch (calculateSymbol) {
      case '+':
        return tempResult + parseFloat(result)
      case '-':
        return tempResult - parseFloat(result)
      case '*':
        return tempResult * parseFloat(result)
      case '/':
        if (parseFloat(result) === 0) {
          return 'На ноль делить нельзя'
        }
        return tempResult / parseFloat(result)
      default:
        return tempResult
    }
  }

  return (
    <div className='container'>
      <h3>{errorResult}</h3>
      <h2>{result}</h2>
      <div className="wrapper">

        <p> = {tempResult}</p>
        <Symbols symbols={symbolsList} handleOnClick={handleOnClick} />
        <Clear symbols={clearSymbolsList} handleOnClick={handleOnClick} />
        <NumberButtons symbols={numbersList} handleOnClick={handleOnClick} />
      </div>

    </div>
  )
}

export default App
