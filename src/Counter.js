import React, { useState } from 'react';
import {
  Button,
  InputGroup,
  FormControl,
  Alert,
  Spinner,
} from 'react-bootstrap';

function Counter(props) {
  const [count, setCount] = useState(1);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(1000);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMinValueChange = (event) => {
    const { value } = event.target;
    setMinValue(Number(value));
  };

  const handleMaxValueChange = (event) => {
    const { value } = event.target;
    setMaxValue(Number(value));
  };

  const handleIncrement = () => {
    if (count + 1 > maxValue) {
      setError(true);
      setCount((privCount) => Number(privCount));
    } else {
      setLoading(true);
      saveCounter(count + 1)
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setError(false);
            setCount((privCount) => Number(privCount) + 1);
            props.updateCounterValueComponent();
          } else {
            throw new Error('Counter value not saved');
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const handleDecrement = () => {
    if (count - 1 < minValue) {
      setError(true);
      setCount((privCount) => Number(privCount));
    } else {
      setLoading(true);
      saveCounter(count - 1)
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setError(false);
            setCount((privCount) => Number(privCount) - 1);
            props.updateCounterValueComponent();
          } else {
            throw new Error('Counter value not saved');
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const handleValueChange = (event) => {
    const { value } = event.target;
    if (Number(value) >= minValue && Number(value) <= maxValue) {
      setLoading(true);
      saveCounter(Number(value))
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setError(false);
            setCount(Number(value));
            props.updateCounterValueComponent();
          } else {
            throw new Error('Counter value not saved');
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else setError(true);
  };

  const saveCounter = async (newCount) => {
    const response = await fetch(
      'https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json',
      {
        method: 'PUT',
        body: JSON.stringify({
          counter1: newCount,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    return response;
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
      {loading && (
        <div className="left-align mb-2" >
          <Spinner animation="border" role="status" size="sm" className="mr-2">
            <span className="sr-only">Loading...</span>
          </Spinner>
          Saving counter value
        </div>
      )}
      <InputGroup style={{ width: '175px' }} className="mb-3">
        <InputGroup.Prepend>
          <Button
            variant="outline-danger"
            onClick={handleDecrement}
            disabled={loading}
          >
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
          <Button
            variant="outline-danger"
            onClick={handleIncrement}
            disabled={loading}
          >
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
