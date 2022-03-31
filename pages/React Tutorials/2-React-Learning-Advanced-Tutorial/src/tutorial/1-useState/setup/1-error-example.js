import React from 'react';

const ErrorExample = () => {
  let title = "1 - useState error example"
  let description = "What we want is a button where you can click a button to change a name using useState. This set up doesn't work though (notice that only the console logs a different title)."
  const handleClick = () => {
    title = "Well done, you clicked me!"
    console.log(title);
  }
  return <React.Fragment>
    <h2>{title}</h2>
    <p>{description}</p>
    <button type="button" className="btn" onClick={handleClick}>
      Change title
    </button>
    <br></br>
  </React.Fragment>
};

export default ErrorExample;
