import * as React from "react";
import * as Inputs from "react-baseline-inputs";
import { FieldValidator, useField } from "formik";

type InputCreator<P> = <T>(
  theme: Inputs.Theme<T, P>
) => React.ComponentType<T & P>;

export interface FormikThemeProps {
  touched?: boolean;
}

export type FormikInput<P> = Omit<P, "name" | "value" | "onChangeValue"> & {
  name: string;
  validate?: FieldValidator;
};

function getName(component: any): string {
  return component.displayName || component.name || "Field";
}

function convert<P>(createBaselineField: InputCreator<P>) {
  return function createField<T extends FormikThemeProps>(
    theme: Inputs.Theme<T, P>
  ) {
    const BaselineField = createBaselineField({
      ...theme,
      props: [...(theme.props || []), "touched"]
    });

    function Field(props: FormikInput<P>) {
      const { name, validate, ...otherProps } = props;
      const [field, meta, helpers] = useField({ name, validate });

      const fieldProps: any = {
        name: name,
        value: field.value,
        touched: meta.touched,
        error: meta.error,
        onBlur: field.onBlur,
        onChangeValue: helpers.setValue,
        ...otherProps
      };

      return <BaselineField {...fieldProps} />;
    }

    Field.displayName = `Formik${getName(BaselineField)}`;

    return Field;
  };
}

export function createItem<T extends FormikThemeProps>(
  theme: Inputs.Theme<T, Inputs.ItemProps>
) {
  return Inputs.createItem({
    ...theme,
    props: [...(theme.props || []), "touched"]
  });
}

export const createCheckbox = convert(Inputs.createCheckbox);
export const createFileInput = convert(Inputs.createFileInput);
export const createFileListInput = convert(Inputs.createFileListInput);
export const createGroup = convert(Inputs.createGroup);
export const createInput = convert(Inputs.createInput);
export const createSelect = convert(Inputs.createSelect);
export const createTextArea = convert(Inputs.createTextArea);
export const createToggleButton = convert(Inputs.createToggleButton);

export const Checkbox = createCheckbox({});
export const FileInput = createFileInput({});
export const FileListInput = createFileListInput({});
export const Group = createGroup({});
export const Input = createInput({});
export const Item = createItem({});
export const Select = createSelect({});
export const TextArea = createTextArea({});
export const ToggleButton = createToggleButton({});
