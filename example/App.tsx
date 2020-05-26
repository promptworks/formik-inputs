import * as React from "react";
import * as ReactDOM from "react-dom";
import { Formik, Form } from "formik";
import {
  bootstrapTheme,
  Checkbox,
  CheckboxList,
  DateInput,
  DateTimeInput,
  FieldSet,
  FileInput,
  FileListInput,
  FloatInput,
  Input,
  IntegerInput,
  RadioGroup,
  Select,
  TextArea,
  ToggleButton,
  ThemeProvider,
  TimeInput,
  SubmitButton
} from "formik-inputs";

interface Values {
  checkbox: boolean | null;
  checkboxList: string[] | null;
  date: string | null;
  datetime: string | null;
  file: File | null;
  filelist: FileList | null;
  float: number | null;
  integer: number | null;
  radioGroup: string | null;
  select: string | null;
  text: string | null;
  masked: string | null;
  textarea: string | null;
  time: string | null;
  toggle: boolean | null;
}

const initialValues: Values = {
  checkbox: null,
  checkboxList: null,
  date: null,
  datetime: null,
  file: null,
  filelist: null,
  float: null,
  integer: null,
  radioGroup: null,
  select: null,
  text: null,
  masked: null,
  textarea: null,
  time: null,
  toggle: null
};

const notBlank = (value: any) => {
  return value === null ? "This field is required." : undefined;
};

const App = () => (
  <ThemeProvider value={bootstrapTheme}>
    <section>
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.table(values)}
      >
        <Form>
          <div className="row">
            <div className="col">
              <Input name="text" label="Text" validate={notBlank} />
            </div>

            <div className="col">
              <IntegerInput label="Integer" name="integer" />
            </div>

            <div className="col">
              <FloatInput label="Float" name="float" />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <DateInput label="Date" name="date" />
            </div>

            <div className="col">
              <TimeInput label="Time" name="time" />
            </div>

            <div className="col">
              <DateTimeInput label="DateTime" name="datetime" />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-4">
              <Select
                name="select"
                label="Select"
                options={["One", "Two", "Three"]}
              />
            </div>
          </div>

          <div className="row mt-3 mb-2">
            <div className="col">
              <FileInput label="File" name="file" />
            </div>

            <div className="col">
              <FileListInput label="FileList" name="filelist" />
            </div>
          </div>

          <TextArea label="TextArea" name="textarea" />

          <div className="row mt-2">
            <div className="col">
              <Checkbox label="Checkbox" name="checkbox" />
            </div>

            <div className="col">
              <ToggleButton label="Toggle" name="toggle" />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col">
              <FieldSet legend="Checkbox List">
                <CheckboxList
                  name="checkboxList"
                  options={[
                    { label: "Foo", value: "foo" },
                    { label: "Bar", value: "bar" },
                    { label: "Disabled", value: "buzz", disabled: true }
                  ]}
                />
              </FieldSet>
            </div>

            <div className="col">
              <FieldSet legend="Radio Group">
                <RadioGroup
                  name="radioGroup"
                  options={[
                    { label: "Foo", value: "foo" },
                    { label: "Bar", value: "bar" },
                    { label: "Disabled", value: "buzz", disabled: true }
                  ]}
                />
              </FieldSet>
            </div>
          </div>

          <SubmitButton className="btn btn-primary mt-2 float-right" />
        </Form>
      </Formik>
    </section>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
