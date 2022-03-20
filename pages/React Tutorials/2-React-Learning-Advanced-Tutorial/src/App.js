import React from "react";
import ErrorExample from "./tutorial/1-useState/setup/1-error-example";
// import FinalErrorExample from "./tutorial/1-useState/final/1-error-example"; Comment back in to see the final working solution.
import UseStateBasics from "./tutorial/1-useState/setup/2-useState-basics";
import UseStateArray from "./tutorial/1-useState/setup/3-useState-array";

function App() {
    return (
        <div className="container" >
            <h2> 2 React Advanced Tutorial </h2>{" "}
            <h3><a href="https://www.youtube.com/watch?v=4UZrsTqkcW4&t=12175s&ab_channel=freeCodeCamp.org">Link here</a> @3:33:00</h3>
            <br></br>
            <hr></hr>
            <br></br>
            {/* 1-Error-Example */}
            <ErrorExample />
            {/* Comment back in the below to see the final error example if required. */}
            {/* <FinalErrorExample /> */}
            <br></br>
            <hr></hr>
            <br></br>
            <UseStateBasics />
            <br></br>
            <hr></hr>
            <br></br>
            <UseStateArray />
        </div>
    );
}

export default App;