import * as I from "react-baseline-inputs";
import { convert, Convert } from "./convert";

export * from "./theme";

export interface FieldSetProps extends Convert<I.FieldSetProps> {}
export const createFieldSet = convert<FieldSetProps>(I.createFieldSet, [
  "name",
  "error",
  "value",
  "onBlur",
  "onChangeValue"
]);
export const FieldSet = createFieldSet({});

export interface InputProps extends Convert<I.InputProps> {}
export const createInput = convert<InputProps>(I.createInput);
export const Input = createInput({});

export interface TextAreaProps extends Convert<I.TextAreaProps> {}
export const createTextArea = convert<TextAreaProps>(I.createTextArea);
export const TextArea = createTextArea({});

export interface SelectProps extends Convert<I.SelectProps> {}
export const createSelect = convert<SelectProps>(I.createSelect);
export const Select = createSelect({});

export interface RadioProps extends Convert<I.RadioProps<any>> {}
export const createRadio = convert<RadioProps>(I.createRadio, ["error"]);
export const Radio = createRadio({});

export interface CheckboxProps extends Convert<I.CheckboxProps> {}
export const createCheckbox = convert<CheckboxProps>(I.createCheckbox);
export const Checkbox = createCheckbox({});

export interface CheckboxItemProps extends Convert<I.CheckboxItemProps<any>> {}
export const createCheckboxItem = convert<CheckboxItemProps>(
  I.createCheckboxItem,
  ["error"]
);
export const CheckboxItem = createCheckboxItem({});

export interface FileInputProps extends Convert<I.FileInputProps> {}
export const createFileInput = convert<FileInputProps>(I.createFileInput);
export const FileInput = createFileInput({});

export interface FileListInputProps extends Convert<I.FileListInputProps> {}
export const createFileListInput = convert<FileListInputProps>(
  I.createFileListInput
);
export const FileListInput = createFileListInput({});

export interface ToggleButtonProps extends Convert<I.ToggleButtonProps> {}
export const createToggleButton = convert<ToggleButtonProps>(
  I.createToggleButton
);
export const ToggleButton = createToggleButton({});
