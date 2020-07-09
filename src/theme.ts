import * as Inputs from "react-baseline-inputs";

export interface FormikThemeProps {
  touched?: boolean;
}

export type Theme<ThemeProps = {}, Props = {}> = Inputs.Theme<
  ThemeProps & FormikThemeProps,
  Props
>;
