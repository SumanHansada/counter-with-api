import React, { forwardRef, useImperativeHandle, useState } from 'react';

const CounterValue = forwardRef((props, ref) => {
  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  const [count, setCount] = useState(1);
  useImperativeHandle(ref, () => ({
    async fetchCounterValue() {
      await fetch(
        'https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json',
        {
          method: 'GET',
        }
      )
        .then((res) => res.json())
        .then((response) => {
          setCount(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }));
  return <div className="container left-align">Counter Value: {count}</div>;
});

export default CounterValue;
