// Define another component that refers to the array of objects.
export const CarComponentImport = ({ ImageURL, Model, Manufacturer }) => {
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
        <article className="importedCar" onMouseOver={logCarComponent}>
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