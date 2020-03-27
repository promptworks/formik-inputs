import { useCallback } from "react";
import { useField as useFormikField, useFormikContext } from "formik";
import { FieldConfig } from "./types";

export const useField = <T extends FieldConfig>({
  name,
  validate,
  showErrorOnBlur,
  ...props
}: T) => {
  const [field, meta] = useFormikField<any>({ name, validate });
  const { setFieldValue, submitCount } = useFormikContext<any>();
  const onChange = useCallback((value) => setFieldValue(name, value), [
    name,
    setFieldValue,
  ]);

  const isErrorVisible = showErrorOnBlur ? meta.touched : submitCount > 0;

  return {
    name,
    onChange,
    onBlur: field.onBlur,
    value: field.value,
    touched: meta.touched,
    error: isErrorVisible ? meta.error : undefined,
    ...props,
  };
};
