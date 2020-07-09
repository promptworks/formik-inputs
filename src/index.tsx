import * as React from "react";
import * as Inputs from "react-baseline-inputs";
import { FieldValidator, useField } from "formik";

type InputCreator<P> = <T>(theme: Inputs.Theme<T, P>) => Inputs.FC<T & P>;

export type FormikInputTheme<T, P> = Inputs.Theme<T & { touched?: boolean }, P>;
export type FormikInput<P> = Omit<P, "name" | "value" | "onChangeValue"> & {
  name: string;
  validate?: FieldValidator;
};

function getName(component: any): string {
  return component.displayName || component.name || "Field";
}

function convert<P>(create: InputCreator<P>, exclude: string[] = []) {
  return function createField<T>(
    theme: FormikInputTheme<T, P>
  ): Inputs.FC<FormikInput<P>> {
    const BaselineField = create({
      ...theme,
      props: [...(theme.props || []), "touched"]
    });

    function Field(props: FormikInput<P>): Inputs.Element {
      const { name, validate, ...otherProps } = props;
      const [field, meta, helpers] = useField({ name, validate });

      const fieldProps: any = {
        name: name,
        value: field.value,
        error: meta.error,
        touched: meta.touched,
        onBlur: field.onBlur,
        onChangeValue: helpers.setValue,
        ...otherProps
      };

      for (const prop of exclude) {
        delete fieldProps[prop];
      }

      return <BaselineField {...fieldProps} />;
    }

    Field.displayName = `Formik${getName(BaselineField)}`;

    return Field;
  };
}

export const createFieldSet = convert(Inputs.createFieldSet, [
  "name",
  "value",
  "onBlur",
  "onChangeValue"
]);

export const createCheckbox = convert(Inputs.createCheckbox);
export const createCheckboxItem = convert(Inputs.createCheckboxItem);
export const createFileInput = convert(Inputs.createFileInput);
export const createFileListInput = convert(Inputs.createFileListInput);
export const createInput = convert(Inputs.createInput);
export const createRadio = convert(Inputs.createRadio);
export const createSelect = convert(Inputs.createSelect);
export const createTextArea = convert(Inputs.createTextArea);
export const createToggleButton = convert(Inputs.createToggleButton);

export const Checkbox = createCheckbox({});
export const CheckboxItem = createCheckboxItem({});
export const FieldSet = createFieldSet({});
export const FileInput = createFileInput({});
export const FileListInput = createFileListInput({});
export const Input = createInput({});
export const Radio = createRadio({});
export const Select = createSelect({});
export const TextArea = createTextArea({});
export const ToggleButton = createToggleButton({});
