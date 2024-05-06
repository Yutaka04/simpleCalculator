import './Calculator.css';
import React, { useState } from 'react';
console.log("calculator has been initialised");

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [memoryValue, setMemoryValue] = useState('');
  const [operator, setOperator] = useState('');
  const [calculatedValue, setCalculatedValue] = useState(false);
  const [displayValueLock, setDisplayValueLock] = useState(true);

  const evaluation=(memoryValue, displayValue, operator) => {
    let result;
    switch(operator){
      case '+':
        result = parseFloat(memoryValue) + parseFloat(displayValue);
        break;
      case '-':
        result = parseFloat(memoryValue) - parseFloat(displayValue);
          break;
      case '×':
        result = parseFloat(memoryValue) * parseFloat(displayValue);
        break;
      case '÷':
        if (displayValue === 0){
          setDisplayValue('Infinity');
          setMemoryValue(displayValue);
          break;
        }else{
          result = parseFloat(memoryValue) / parseFloat(displayValue);
          break;
        }
      default:
        break;
    }
    setDisplayValue(result);
    setDisplayValueLock(true);
    setMemoryValue(result);
    setCalculatedValue(true);
  }


  //handles the number button
  const handleButtonClick = (value) => {
    if (displayValue === "0"  || displayValueLock) {
      setDisplayValue(value);
      setDisplayValueLock(false);
    } else {
      //if displayValueLock is false, append number to existing displayValue.
      setDisplayValue((prevDisplayValue) => prevDisplayValue + value.toString());
    }
  }

  //handles the numerical button
  const handleDecimalButtonClick = () => {
    //if the display value is not blank, no calculation is done and the display value does not have a decimal point
    if(displayValue !== '' && !displayValue.includes('.')){
      //appends decimal point onto existing display value
      console.log("adding decimal point...");
      setDisplayValue((prevDisplayValue) => prevDisplayValue + '.');
      console.log("line 41 " + displayValue);
    }
  }

  //handles the operator button
  const handleOperatorButtonClick = (value) =>{    
    console.log("line 50 " + value + displayValue);
    //upon clicking the operator button the first time, displayValueLock turns true and the operator button is set
    //if displayValueLock is on, clicking the operator button can only change the operator.
    //else if displayValueLock is off, clicking the operator button perform evaluation.
    if(!operator){
      setOperator(value);
      setDisplayValueLock(true);
      setMemoryValue(displayValue);
    }else{
      if (value !== operator && displayValueLock){
        setOperator(value);
      }else if (!displayValueLock){
        evaluation(memoryValue, displayValue, operator);
        setOperator(value);
      }
    }
  }

  //handles the +/- button
  const handlePlusMinusButton = () => {
    if (!displayValueLock){
      const newValue = parseFloat(displayValue) * -1;
      setDisplayValue(newValue.toString());
    }
  }

  //handles the delete button
  const handleDeleteButtonClick = () => {
    if(displayValue.length === 1){
      setDisplayValue('0');
    }else{
      if(displayValue !== '0' && !calculatedValue){
        //possible type error
        const newValue = displayValue.slice(0,-1);
        setDisplayValue(newValue.toString());
      }  
    }
  }

  //handles the equal button
  const handleEqualButtonClick = () => {
    evaluation(memoryValue,displayValue,operator);
    setOperator('');
  }

  const handleClearButtonClick = () => {
    setDisplayValue('0');
    setMemoryValue('');
    setDisplayValueLock(true);
    setOperator('');
  }

  return (
    <div className="container">
      <fieldset id="container">
        <form name="container">
          <input id="display" type="text" name="display" value={displayValue} readOnly></input>
          <input class="button digits" type="button" value="7" onClick={(e)=> handleButtonClick(e.target.value)}></input>
          <input class="button digits" type="button" value="8" onClick={(e)=> handleButtonClick(e.target.value)}></input>
          <input class="button digits" type="button" value="9" onClick={(e)=> handleButtonClick(e.target.value)}></input>
          <input className={`button mathButtons ${operator === '+' ? 'active' : ''}`} type="button" value="+" onClick={(e) => handleOperatorButtonClick(e.target.value)}></input>
          <br/>
          <input class="button digits" type="button" value="4" onClick={(e)=> handleButtonClick(e.target.value)}></input>
          <input class="button digits" type="button" value="5" onClick={(e)=> handleButtonClick(e.target.value)}></input>
          <input class="button digits" type="button" value="6" onClick={(e)=> handleButtonClick(e.target.value)}></input>
          <input className={`button mathButtons ${operator === '-' ? 'active' : ''}`} type="button" value="-" onClick={(e) => handleOperatorButtonClick(e.target.value)}></input>
          <br/>
          <input class="button digits" type="button" value="1" onClick={(e)=> handleButtonClick(e.target.value)}></input>
          <input class="button digits" type="button" value="2" onClick={(e)=> handleButtonClick(e.target.value)}></input>
          <input class="button digits" type="button" value="3" onClick={(e)=> handleButtonClick(e.target.value)}></input>
          <input className={`button mathButtons ${operator === '×' ? 'active' : ''}`} type="button" value="×" onClick={(e) => handleOperatorButtonClick(e.target.value)}></input>
          <br/>
          <input class="button digits" type="button" value="0" onClick={(e)=> handleButtonClick(e.target.value)}></input>
          <input class="button digits" type="button" value="." onClick={() => handleDecimalButtonClick()}></input>
          <input class="button mathButtons" type="button" value="+/-" onClick={handlePlusMinusButton}></input>
          <input className={`button mathButtons ${operator === '÷' ? 'active' : ''}`} type="button" value="÷" onClick={(e) => handleOperatorButtonClick(e.target.value)}></input>
          <br/>
          <input id="clearButton" class="button" type="button" value="C" onClick={handleClearButtonClick}></input>
          <input id="clearButton" class="button" type="button" value="Del" onClick={handleDeleteButtonClick}></input>
          <input class="equalButton mathButtons" type="button" value="=" onClick={handleEqualButtonClick}></input>
          <br/>
        </form>
      </fieldset>
    </div>
  );
}

export default Calculator;
