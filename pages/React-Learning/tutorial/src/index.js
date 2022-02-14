import React from 'react';
import ReactDom from 'react-dom';

// Stateless functional component
// Always return JSX

function Greeting() {
  return (
    <React.Fragment>
      <div>
        <Welcome />

        <Message />
      </div>
    </React.Fragment>
  );
}

// An alternative way of writing a component using an arrow function.
// const Greeting = () => {
//   return React.createElement('h1', {}, 'Hello Luke');
// }

// Another way of adding multiple html tags using React.createElement.
// const Greeting = () => {
//   return React.createElement('div', {}, React.createElement('h4', {}, 'Hello Luke'));
// }

// Nested Components, Recat Tools

// Implicit Return
const Welcome = () => <h4>Hello Luke, this is your first React Tutorial talking.</h4>;

// Explicit Return
const Message = () => {
  return (
    <div>
      <h4>JSX Rules</h4>
      <ul>Return a single element.</ul>
      <ul>div / section / article or fragment, as per this example.</ul>
      <ul>Use camelCase for HTML attributes, e.g. "onClick" instead of "onclick" in normal HTML.</ul>
      <ul>className instead of class, e.g. "className='left'" instead of "class='left'" in normal HTML.</ul>
      <ul>Close every element, e.g. have to close the img tag unlike in normal HTML.</ul>
      <ul>Formatting: It's best to have brackets around your return statement as per this example.</ul>
    </div>)
}

ReactDom.render(<Greeting />, document.getElementById('root'));