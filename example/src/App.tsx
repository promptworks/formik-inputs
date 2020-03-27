import "react-app-polyfill/stable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { FormikInputs } from "./FormikInputs";

const App = () => {
  return (
    <div className="container">
      <header>
        <h1 className="display-3">Formik Inputs</h1>
      </header>

      <main>
        <FormikInputs />
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
