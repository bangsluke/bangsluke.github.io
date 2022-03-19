import React from "react";

// Import the required components.
import { CarListArrayImport } from "./data/CarListArrayImport"; // Don't need to have the .js file extension. This is only for JS.
import { CarComponentImport } from "./CarComponentImport";

const ImportedCarList = () => {
  return (
    <React.Fragment>
      <h2>Imported Mini Car Project</h2>
      <section className="importedCarList">
        {CarListArrayImport.map((car) => {
          // Use map to iterate through all of the objects in the above array. Map returns objects from the array.
          console.log(car); // Logs the object to the console.
          return <CarComponentImport key={car.id} {...car} />; // Call the CarComponent component passing the new object. Pass the Key prop which is a unique value.
        })}
      </section>
      <div id="end5"></div>
    </React.Fragment>
  );
};

export default ImportedCarList;
