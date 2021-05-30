import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Alert } from 'react-bootstrap';

function Counter() {
  const [count, setCount] = useState(1);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(1000);
  const [error, setError] = useState(false);

  const handleMinValueChange = (event) => {
    const { value } = event.target;
    setMinValue(Number(value));
  };

  const handleMaxValueChange = (event) => {
    const { value } = event.target;
    setMaxValue(Number(value));
  };

  const handleIncrement = () => {
    setCount((privCount) => {
      if (Number(privCount) + 1 > maxValue) {
        setError(true);
        return Number(privCount);
      } else {
        setError(false);
        return Number(privCount) + 1;
      }
    });
  };

  const handleDecrement = () => {
    setCount((privCount) => {
      if (Number(privCount) - 1 < minValue) {
        setError(true);
        return Number(privCount);
      } else {
        setError(false);
        return Number(privCount) - 1;
      }
    });
  };

  const handleValueChange = (event) => {
    const { value } = event.target;
    if (Number(value) >= minValue && Number(value) <= maxValue) {
      setError(false);
      setCount(value);
    } else setError(true);
  };

  return (
    <div
      className="container mt-5"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <h2 className="counter-theme">Counter</h2>
      <InputGroup style={{ width: '175px' }} className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Min Value</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className="counter-theme"
          id="minValue"
          onChange={handleMinValueChange}
        />
      </InputGroup>
      <InputGroup style={{ width: '175px' }} className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Max Value</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className="counter-theme"
          id="maxValue"
          onChange={handleMaxValueChange}
        />
      </InputGroup>
      <InputGroup style={{ width: '175px' }} className="mb-3">
        <InputGroup.Prepend>
          <Button variant="outline-danger" onClick={handleDecrement}>
            -
          </Button>
        </InputGroup.Prepend>
        <FormControl
          className="counter-theme"
          value={count}
          aria-label="Count"
          onChange={handleValueChange}
        />
        <InputGroup.Append>
          <Button variant="outline-danger" onClick={handleIncrement}>
            +
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {error && (
        <Alert onClose={() => setError(false)} variant="danger" dismissible>
          Counter value should be between {minValue} and {maxValue} (inclusive)
        </Alert>
      )}
    </div>
  );
}

export default Counter;
