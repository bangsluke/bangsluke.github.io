import React, { useState } from 'react';
// Notice the different import above.
// UseState is a function from React.


const UseStateBasics = () => {
  // console.log(useState());
  const title = "2 - useState basic example"
  const description = "This time we are going to correctly use useState to change the text."
  // Good convention is to have a variable below and then name the second function as "set" Variable.
  const [text, setText] = useState('Random Title')
  const handleClick = () => {
    if (text === "Random Title") {
      setText("Hello");
    } else {
      setText("Random Title");
    }
  };
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <p>{description}</p>
      <h3>{text}</h3>
      <button className="btn" onClick={handleClick}>
        Change text above
      </button>
      <br></br>
    </React.Fragment>
  );
};

export default UseStateBasics;
