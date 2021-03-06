import "react-app-polyfill/stable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Formik, Form, useFormikContext } from "formik";
import {
  Checkbox,
  FileInput,
  FileListInput,
  Group,
  Input,
  Item,
  Select,
  TextArea,
  ToggleButton
} from "./fields";

interface Values {
  text: string;
  select: string;
  textarea: string;
  checkbox: boolean;
  checkboxes: string[];
  radio: number | null;
  toggle: boolean;
  file: File | null;
  files: FileList | null;
}

const required = (value: any): string | undefined => {
  return typeof value === "undefined" || value === null || value === ""
    ? "This field is required"
    : undefined;
};

const notEmpty = (value: any[]): string | undefined => {
  return value.length ? undefined : "You must choose at least one";
};

const App = () => {
  const initialValues: Values = {
    text: "",
    select: "",
    textarea: "",
    checkbox: true,
    checkboxes: [],
    radio: null,
    toggle: false,
    file: null,
    files: null
  };

  return (
    <div className="container">
      <header>
        <h1>React Baseline Inputs</h1>
      </header>

      <main>
        <Formik
          initialValues={initialValues}
          onSubmit={values => console.log(values)}
        >
          <Form>
            <section className="mb-4">
              <fieldset className="mb-4">
                <legend>Controls</legend>

                <div className="row">
                  <div className="col-md">
                    <Input label="Text" name="text" validate={required} />
                  </div>

                  <div className="col-md">
                    <Select
                      name="select"
                      label="Select"
                      placeholder="Choose an option"
                      validate={required}
                    >
                      <option value="Milk">Milk</option>
                      <option value="Cheese">Cheese</option>
                      <option value="Eggs">Eggs</option>
                    </Select>
                  </div>
                </div>

                <TextArea
                  label="Comments"
                  name="textarea"
                  validate={required}
                />
              </fieldset>

              <fieldset className="mb-4">
                <legend>File Uploads</legend>

                <div className="row">
                  <div className="col-md">
                    <FileInput label="File" name="file" />
                  </div>

                  <div className="col-md">
                    <FileListInput label="Multiple Files" name="files" />
                  </div>
                </div>
              </fieldset>

              <fieldset className="mb-4">
                <legend>Toggles</legend>

                <div className="row">
                  <div className="col-md">
                    <Checkbox label="I agree" name="checkbox" />
                  </div>

                  <div className="col-md">
                    <ToggleButton label="Push notifications" name="toggle">
                      Toggle
                    </ToggleButton>
                  </div>
                </div>
              </fieldset>

              <div className="row mb-4">
                <Group
                  name="checkboxes"
                  type="checkbox"
                  legend="Multiple Checkboxes"
                  className="col-md"
                  validate={notEmpty}
                >
                  <Item value="PHL" label="Philadelphia" />
                  <Item value="CHI" label="Chicago" />
                  <Item value="NYC" label="New York" />
                </Group>

                <Group
                  name="radio"
                  type="radio"
                  legend="Radio Group"
                  className="col-md"
                  validate={required}
                >
                  <Item value={1} label="Bacon" />
                  <Item value={2} label="Cheetos" />
                  <Item value={3} label="Waffles" />
                </Group>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </section>

            <section>
              <FormState />
            </section>
          </Form>
        </Formik>
      </main>
    </div>
  );
};

const FormState = () => {
  const form = useFormikContext();

  return (
    <div className="row">
      <div className="col-md">
        <h4>Values</h4>
        <pre className="p-2 rounded bg-light border">
          <code>{JSON.stringify(form.values, null, 2)}</code>
        </pre>
      </div>

      <div className="col-md">
        <h4>Errors</h4>
        <pre className="p-2 rounded bg-light border">
          <code>{JSON.stringify(form.errors, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
