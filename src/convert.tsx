import * as React from "react";
import { FieldValidator, useField } from "formik";
import { FC, Element } from "react-baseline-inputs";
import { Theme } from "./theme";

export interface UseFieldProps {
  name: string;
  validate?: FieldValidator;
}

export type Convert<T> = UseFieldProps &
  Omit<T, "name" | "value" | "onChangeValue">;

const getName = (component: any) =>
  component.displayName || component.name || "Field";

export function convert<Props extends UseFieldProps>(
  create: any,
  exclude: string[] = []
) {
  return function createField<ThemeProps>(
    theme: Theme<ThemeProps, Props>
  ): FC<Props> {
    const BaselineField = create({
      ...theme,
      props: [...(theme.props || []), "touched"]
    });

    function Field(props: Props): Element {
      const { name, validate, ...otherProps } = props;
      const [field, meta, helpers] = useField({ name, validate });

      const fieldProps: any = {
        name: name,
        value: field.value,
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
