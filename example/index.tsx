import "react-app-polyfill/stable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Formik, Form, useFormikContext } from "formik";
import {
  Checkbox,
  CheckboxItem,
  FieldSet,
  FileInput,
  FileListInput,
  Input,
  Radio,
  Select,
  TextArea,
  ToggleButton
} from "./fields";

interface Person {
  name: string;
}

const people: Person[] = [
  { name: "Guy Fietti" },
  { name: "Abe Lincoln" },
  { name: "Oprah Winfrey" }
];

interface Values {
  text: string;
  select: string;
  textarea: string;
  checkbox: boolean;
  checkboxes: Person[];
  radio: Person | null;
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
                      label="Select"
                      options={["A", "B"]}
                      placeholder="Choose an option"
                      name="select"
                      validate={required}
                    />
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
                <div className="col-md">
                  <FieldSet name="checkboxes" legend="Multiple Checkboxes">
                    {people.map(person => (
                      <CheckboxItem
                        key={person.name}
                        label={person.name}
                        represents={person}
                        name="checkboxes"
                      />
                    ))}
                  </FieldSet>
                </div>

                <div className="col-md">
                  <FieldSet name="checkboxes" legend="Radio Group">
                    {people.map(person => (
                      <Radio
                        key={person.name}
                        label={person.name}
                        represents={person}
                        name="radio"
                      />
                    ))}
                  </FieldSet>
                </div>
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
