import { ClassName, FieldProps } from "react-baseline-inputs";
import {
  FormikThemeProps,
  createCheckbox,
  createFileInput,
  createFileListInput,
  createGroup,
  createInput,
  createItem,
  createSelect,
  createTextArea,
  createToggleButton
} from "../src";

const theme = {
  helpClassName: "form-text text-muted",
  errorClassName: "invalid-feedback",
  fieldClassName: "form-group"
};

const className: ClassName<FieldProps & FormikThemeProps> = {
  "is-valid": props => props.touched && !props.error,
  "is-invalid": props => props.touched && props.error
};

export const Input = createInput({
  ...theme,
  className: { ...className, "form-control": true }
});

export const FileInput = createFileInput({
  ...theme,
  className: { ...className, "form-control-file": true }
});

export const FileListInput = createFileListInput({
  ...theme,
  className: { ...className, "form-control-file": true }
});

export const Select = createSelect({
  ...theme,
  className: { ...className, "custom-select": true }
});

export const TextArea = createTextArea({
  ...theme,
  className: { ...className, "form-control": true }
});

export const Checkbox = createCheckbox({
  ...theme,
  labelClassName: "custom-control-label",
  fieldClassName: "form-group custom-control custom-checkbox",
  className: { ...className, "custom-control-input": true }
});

export const Item = createItem({
  ...theme,
  labelClassName: "custom-control-label",
  className: { ...className, "custom-control-input": true },
  fieldClassName: {
    "custom-control": true,
    "custom-checkbox": props => props.type === "checkbox",
    "custom-radio": props => props.type === "radio"
  }
});

export const ToggleButton = createToggleButton({
  ...theme,
  className: {
    "btn btn-sm btn-outline-primary mr-2": true,
    active: props => props.value
  }
});

export const Group = createGroup({
  helpClassName: "form-text text-muted",
  errorClassName: {
    "text-danger": true,
    "d-none": props => !props.touched
  }
});
