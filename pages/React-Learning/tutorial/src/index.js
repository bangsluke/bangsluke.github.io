import React from 'react';
import ReactDom from 'react-dom';

// CSS
import './index.css';

// Import components
// import { CarListArrayImport } from './data/CarListArrayImport'; // Example shows how to import from other folder directories.
// import { CarComponentImport } from './CarComponentImport'; // Don't need to have the .js file extension. This is only for JS.
import ImportedCarList from './ImportedCarList'; // Note - because the export is default from ImportedCarList.js, you don't need the curly brackets.

// Introduction 00:00:00

// Stateless functional component
// Always return JSX

function Greeting() {
  return (
    <React.Fragment>
      <div>
        <h1>React Tutorial Page</h1>
        <h2>Initial Tutorial</h2>
        <Welcome />

        <Message />
      </div>
      <div id="end1"></div>
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

// Mini Book Project 1:36:00

// Import the CSS
// The import has to exist at the top of the page.

const Car5Details = {
  ImageURL: "https://tse4.mm.bing.net/th?id=OIP.Notu4f0sx6bjekTzOk1oeQHaE6&pid=Api",
  Model: "Gallardo",
  Manufacturer: "Lamborghini"
}

const Car6Details = {
  ImageURL: "https://tse3.mm.bing.net/th?id=OIP.s1p_7HB5c-FvgfyPS08rxAHaEK&pid=Api",
  Model: "Roadster",
  Manufacturer: "Tesla"
}

function CarList() {
  return (
    <React.Fragment>
      <h2>Mini Car Project</h2>
      <section className="carList">
        <Car />
        <Car2 />
        <Car3 />
        <Car4 Model="Model 3" Manufacturer="Tesla" ImageURL="https://cdcssl.ibsrv.net/autodata/images/?IMG=USD10TSC032B01308.JPG&WIDTH=1200" />
        <Car5 Model={Car5Details.Model} Manufacturer={Car5Details.Manufacturer} ImageURL={Car5Details.ImageURL} />
        <Car6 Model={Car6Details.Model} Manufacturer={Car6Details.Manufacturer} ImageURL={Car6Details.ImageURL} >
          <p>0-60 in 0.3 seconds</p>
        </Car6>
      </section>
      <div id="end2"></div>
    </React.Fragment>
  );
};

// Define the component.
const Car = () => {
  return (
    <article className="car">
      <Image />
      <ModelName />
      <Manufacturer />
    </article>
  )
};

// Define the components that make up the above component..
const Image = () => (
  <img
    src="https://s1.cdn.autoevolution.com/images/gallery/HONDA-Civic-5-Doors-888_32.jpg" alt="">
  </img>
);
const ModelName = () => <h3>Civic 2005</h3>;
const Manufacturer = () => <h4 style={{ color: '#617232', fontSize: '0.75rem', margin: '0.25rem' }}>Honda</h4 >; // Note you can have inline style as shown.

// Define an alternative Car component showing how you can add different component set ups.
const Car2 = () => {
  return (
    <article className="car">
      <img
        src="https://s1.cdn.autoevolution.com/images/gallery/HONDA-Civic-5-Doors-888_32.jpg" alt="">
      </img>
      <h3>Civic 2005</h3>
      <h4>Honda</h4 >
    </article>
  )
};

// Define another alternative Car component showing how you can use JavaScript variables for the name.
const Car3Model = "Mazda 3";
const Car3 = () => {
  const Manufacturer = "Mazda";
  return (
    <article className="car">
      <img
        src="http://s3.caradvice.com.au/wp-content/uploads/2013/06/Mazda-3-hatch-71.jpg" alt="">
      </img>
      <h3>{Car3Model}</h3>
      <h4>{Manufacturer.toUpperCase()}</h4 >
    </article>
  )
};

// Define another component that uses props.
const Car4 = (props) => {
  // console.log(props);
  return (
    <article className="car">
      <img
        src={props.ImageURL} alt="">
      </img>
      <h3>{props.Model}</h3>
      <h4>{props.Manufacturer}</h4 >
    </article>
  )
};

// Define another component that uses props but destructures the props object.
const Car5 = (props) => {
  const { ImageURL, Model, Manufacturer } = props; // By adding this destructuring line, I don't need to call each below variable as "props.xxx"
  return (
    <article className="car">
      <img
        src={ImageURL} alt="">
      </img>
      <h3>{Model}</h3>
      <h4>{Manufacturer}</h4 >
    </article>
  )
};

// Define another component that uses props, destructures the props object in the top line and also calls the children item of props.
const Car6 = ({ ImageURL, Model, Manufacturer, children }) => { // The destructuring line has moved to here, I don't need to call each below variable as "props.xxx"
  // const { ImageURL, Model, Manufacturer } = props;
  return (
    <article className="car">
      <img
        src={ImageURL} alt="">
      </img>
      <h3>{Model}</h3>
      <h4>{Manufacturer}</h4 >
      {children}
    </article>
  )
};

ReactDom.render(<CarList />, document.getElementById('end1'));

// Re-Factored Mini Book Project 2:39:00

const CarListArray = [
  {
    id: 1,
    ImageURL: "http://s3.caradvice.com.au/wp-content/uploads/2013/06/Mazda-3-hatch-71.jpg",
    Model: "Mazda 3",
    Manufacturer: "Mazda"
  },
  {
    id: 2,
    ImageURL: "https://tse4.mm.bing.net/th?id=OIP.Notu4f0sx6bjekTzOk1oeQHaE6&pid=Api",
    Model: "Gallardo",
    Manufacturer: "Lamborghini"
  },
  {
    id: 3,
    ImageURL: "https://tse3.mm.bing.net/th?id=OIP.s1p_7HB5c-FvgfyPS08rxAHaEK&pid=Api",
    Model: "Roadster",
    Manufacturer: "Tesla"
  }
];

function RefactoredCarList() {
  return (
    <React.Fragment>
      <h2>Refactored Mini Car Project</h2>
      <section className="refactoredCarList">
        {CarListArray.map((car) => { // Use map to iterate through all of the objects in the above array. Map returns objects from the array.
          //console.log(car); // Logs the object to the console.
          // const { ImageURL, Model, Manufacturer } = car; // Don't need this.
          return <CarComponent key={car.id} car={car} />; // Call the CarComponent component passing the new object. Pass the Key prop which is a unique value.
        })}
        {/* Alternatively can do as below. */}
        {/* {CarListArray.map((car) => {
          return <CarComponent key={car.id} {...car} />; // Pass as a spread operator {...car}.
        })} */}
      </section>
      <div id="end3"></div>
    </React.Fragment>
  );
};

// Define another component that refers to the array of objects.
const CarComponent = (props) => {
  const { ImageURL, Model, Manufacturer } = props.car; // See the updated .car value here.
  // const { ImageURL, Model, Manufacturer } = props; // If using the alternative code above, wouldn't need the .car. 
  return (
    <article className="refactoredCar">
      <img src={ImageURL} alt=""></img>
      <h3>{Model}</h3>
      <h4>{Manufacturer}</h4 >
    </article>
  )
};

ReactDom.render(<RefactoredCarList />, document.getElementById('end2'));

// Re-Factored Mini Book Project with Events (and State) 3:00:00

// To see more possible Events in React - Google "Synthetic Events".
// https://reactjs.org/docs/events.html

// Still using the CarListArray from above.

function RefactoredCarListWithEvents() {
  return (
    <React.Fragment>
      <h2>Refactored Mini Car Project With Events (State)</h2>
      <section className="refactoredCarListWithEvents">
        {CarListArray.map((car) => { // Use map to iterate through all of the objects in the above array. Map returns objects from the array.
          console.log(car); // Logs the object to the console.
          return <CarComponentWithEvents key={car.id} {...car} />; // Call the CarComponent component passing the new object. Pass the Key prop which is a unique value.
        })}
      </section>
      <div id="end4"></div>
    </React.Fragment>
  );
};

// Define another component that refers to the array of objects.
const CarComponentWithEvents = ({ ImageURL, Model, Manufacturer }) => {
  // attribute, eventHandler
  // onClick, onMouseOver - camelCase in React

  // Simple event.
  const clickHandler = () => { // Set up the eventHandler as a reference. Can also do as inline.
    alert("Hello");
  }

  // The below set up allows us to pass a variable to the handler event.
  const clickHandlerComplexExample = (Manufacturer) => { // Set up the eventHandler as a reference.
    alert("Hello");
  }

  // The below returns details of where the click was made from, by passing e the event object.
  const clickHandlerWhere = (e) => {
    console.log(e.target);
  }

  // Add an onMouseOver event to log all hovered over components.
  const logCarComponent = () => {
    console.log(Manufacturer + " " + Model);
  }

  return (
    <article className="refactoredCarWithEvents" onMouseOver={logCarComponent}>
      <img src={ImageURL} alt=""></img>
      <h3>{Model}</h3>
      <h4>{Manufacturer}</h4 >
      <button type="button" onClick={clickHandler}>Get Hello</button> {/* Example here calls the reference function above. */}
      <button type="button" onClick={() => alert(Model)}>Get Model</button> {/* Example here uses an inline function. */}
      <button type="button" onClick={() => clickHandlerComplexExample(Manufacturer)}>Get Manufacturer</button> {/* Example here calls a more complex reference function above, showing how to pass an argument combining an arrow function with a reference function. */}
      <button type="button" onClick={clickHandlerWhere}>Where?</button> {/* Example here calls the reference function above. */}
    </article>
  )
};

ReactDom.render(<RefactoredCarListWithEvents />, document.getElementById('end3'));

// Importing and Exporting Mini Book Project Components 3:13:00

// See file CarComponentImport.js and CarListImport.js

// function ImportedCarList() {
//   return (
//     <React.Fragment>
//       <h2>Imported Mini Car Project</h2>
//       <section className="importedCarList">
//         {CarListArrayImport.map((car) => { // Use map to iterate through all of the objects in the above array. Map returns objects from the array.
//           console.log(car); // Logs the object to the console.
//           return <CarComponentImport key={car.id} {...car} />; // Call the CarComponent component passing the new object. Pass the Key prop which is a unique value.
//         })}
//       </section>
//       <div id="end5"></div>
//     </React.Fragment>
//   );
// };



ReactDom.render(<ImportedCarList />, document.getElementById('end4'));