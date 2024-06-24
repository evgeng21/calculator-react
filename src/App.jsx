import { useState } from 'react'
import './App.css'
import Symbols from './components/Symbols/Symbols'
import Clear from './components/Clear/Clear'
import NumberButtons from './components/NumberButtons/NumberButtons'

function App() {

  const symbolsList = ['+', '-', '*', '/']
  const clearSymbolsList = ['c']
  const numbersList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '=']

  const [result, setResult] = useState('')
  const [tempResult, setTempResult] = useState('0')
  const [isFirstCalculate, setIsFirstCalculate] = useState(true)
  const [errorResult, setErrorResult] = useState('')

  function handleOnClick(buttonSymbol) {
    if ((numbersList.includes(buttonSymbol) || symbolsList.includes(buttonSymbol)) & buttonSymbol !== '=') {
      addResultContent(buttonSymbol)
    } else if (buttonSymbol === '=') {
      // debugger
      if (tempResult[tempResult.length - 1] == 0 && tempResult[tempResult.length - 3] === '/') {
        calculateResult()
      } else {
        setResult(tempResult)
        setTempResult(calculateResult())
        setIsFirstCalculate(true)
      }

    } else {
      clearSymbol()
    }
  }

  function clearSymbol() {
    if (tempResult.length === 1 || isFirstCalculate) {
      setResult('')
      setTempResult('0')
      setErrorResult('')
      setIsFirstCalculate(true)
    } else if (tempResult[tempResult.length - 1] == ' ') {
      setTempResult(tempResult.slice(0, -3))
    } else {
      setTempResult(tempResult.slice(0, -1))
    }
  }

  function addResultContent(num) {
    if (!isFirstCalculate) {
      if (numbersList.includes(num)) {
        setTempResult(tempResult + num)
      } else {

        if (parseFloat(tempResult.split(' ').pop()) || parseFloat(tempResult.split(' ').pop()) === 0) {
          setTempResult(`${tempResult} ${num} `)
          setResult(calculateResult())
        } else {
          const tempArray = tempResult.split(' ')
          tempArray.pop()
          tempArray.pop()
          const el = tempArray.join(' ')
          setTempResult(`${el} ${num} `)
        }

      }
    } else {
      // setResult(tempResult)
      if (parseFloat(tempResult) && tempResult != 0 && !parseFloat(num)) {
        setTempResult(`${tempResult} ${num} `)
      } else {
        setTempResult(num)
      }
      setIsFirstCalculate(false)
    }
  }

  function calculateResult() {
    setErrorResult('')

    const calculatedArray = tempResult.split(' ')
    // debugger
    if (!parseFloat(calculatedArray[calculatedArray.length - 1]) && parseFloat(calculatedArray[calculatedArray.length - 1]) !== 0) {
      calculatedArray.pop()
    }
    let calculatedResult = parseFloat(calculatedArray[0])
    for (let i = 1; i < calculatedArray.length; i += 2) {
      const operator = calculatedArray[i];
      const operand = parseFloat(calculatedArray[i + 1]);

      switch (operator) {
        case '+':
          calculatedResult += operand;
          break;
        case '-':
          calculatedResult -= operand;
          break;
        case '*':
          calculatedResult *= operand;
          break;
        case '/':
          if (operand === 0) {
            setErrorResult('На ноль делить нельзя')
            calculatedArray.pop()
            setTempResult(calculatedArray.join(' ') + ' ')
            break
          }
          calculatedResult /= operand;
          break;
      }
    }
    return calculatedResult

  }

  return (
    <div className='container'>
      <h3>{errorResult}</h3>
      <div className="result">
        <p>{result}</p>
        <h2>{tempResult}</h2>
      </div>

      <div className="wrapper">


        <Symbols symbols={symbolsList} handleOnClick={handleOnClick} />
        <Clear symbols={clearSymbolsList} handleOnClick={handleOnClick} />
        <NumberButtons symbols={numbersList} handleOnClick={handleOnClick} />
      </div>

    </div>
  )
}

export default App
