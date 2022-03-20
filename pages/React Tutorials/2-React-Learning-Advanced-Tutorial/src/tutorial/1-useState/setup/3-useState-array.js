import React from 'react';
import { data } from '../../../data';

const UseStateArray = () => {
  const title = "3 - useState array example";
  const description = "Create a useState example where the possible states are stored in an array. Clicking the button, passes an empty array to setPeople.";

  const [people, setPeople] = React.useState(data);
  const removeItem = (id) => {
    let newPeople = people.filter((person) => person.id !== id); // Filter out the item that matches the passed id, by creating a new array with all remaining ids.
    setPeople(newPeople);
  }

  return (
    <React.Fragment>
      <h2>{title}</h2>
      <p>{description}</p>
      {people.map((person) => {
        // console.log(person);
        const { id, name } = person
        return <div key={id} className="item">
          <h4>{name}</h4>
          <button onClick={() => removeItem(id)}>Remove</button>
        </div>
        // return "hello";
      })}
      <button className="btn" onClick={() => setPeople([])}>
        Click here to clear items
      </button>
      <button className="btn" onClick={() => setPeople(data)}>
        Click here to re-add items
      </button>
    </React.Fragment>
  );
};

export default UseStateArray;
