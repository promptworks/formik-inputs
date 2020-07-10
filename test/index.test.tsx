import "@testing-library/jest-dom";
import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Formik } from "formik";
import {
  Checkbox,
  Input,
  TextArea,
  Select,
  ToggleButton,
  Item,
  Group
} from "../src";

function setup(children: React.ReactNode, value: any, error?: any) {
  return render(
    <Formik
      initialValues={{ value }}
      initialErrors={{ value: error }}
      onSubmit={jest.fn()}
    >
      {children}
    </Formik>
  );
}

describe("<Checkbox />", () => {
  it("retrieves `value` from `<Formik />`", () => {
    const field = setup(<Checkbox name="value" />, false);
    const input = field.getByRole("checkbox");
    fireEvent.click(input);
    expect(input).toBeChecked();
  });

  it("retrieves `error` from `<Formik />`", () => {
    const field = setup(<Checkbox name="value" />, true, "Boom");
    expect(field.container).toHaveTextContent("Boom");
  });
});

describe("<ToggleButton />", () => {
  it("retrieves `value` from `<Formik />`", () => {
    const field = setup(<ToggleButton name="value" />, false);
    const input = field.getByRole("switch");

    fireEvent.click(input);
    expect(input).toBeChecked();
  });

  it("retrieves `error` from `<Formik />`", () => {
    const field = setup(<ToggleButton name="value" />, true, "Boom");
    expect(field.container).toHaveTextContent("Boom");
  });
});

describe("<Input />", () => {
  it("retrieves `value` from `<Formik />`", () => {
    const field = setup(<Input name="value" />, "");
    const input = field.getByRole("textbox");

    fireEvent.change(input, {
      target: { value: "hello" }
    });

    expect(input).toHaveValue("hello");
  });

  it("retrieves `error` from `<Formik />`", () => {
    const field = setup(<Checkbox name="value" />, "", "Boom");
    expect(field.container).toHaveTextContent("Boom");
  });
});

describe("<TextArea />", () => {
  it("retrieves `value` from `<Formik />`", () => {
    const field = setup(<TextArea name="value" />, "");
    const input = field.getByRole("textbox");

    fireEvent.change(input, {
      target: { value: "hello" }
    });

    expect(input).toHaveValue("hello");
  });

  it("retrieves `error` from `<Formik />`", () => {
    const field = setup(<TextArea name="value" />, "", "Boom");
    expect(field.container).toHaveTextContent("Boom");
  });
});

describe("<Select />", () => {
  const tree = (
    <Select name="value">
      <option value="hello">Hello</option>
    </Select>
  );

  it("retrieves `value` from `<Formik />`", () => {
    const field = setup(tree, "");
    const input = field.getByRole("combobox");

    fireEvent.change(input, {
      target: { value: "hello" }
    });

    expect(input).toHaveValue("hello");
  });

  it("retrieves `error` from `<Formik />`", () => {
    const field = setup(tree, "", "Boom");
    expect(field.container).toHaveTextContent("Boom");
  });
});

describe('<Group type="checkbox" />', () => {
  const tree = (
    <Group type="checkbox" name="value">
      <Item value="foo" />
    </Group>
  );

  it("retrieves `value` from `<Formik />`", () => {
    const field = setup(tree, []);
    const input = field.getByRole("checkbox");
    fireEvent.click(input);
    expect(input).toBeChecked();
  });

  it("retrieves `error` from `<Formik />`", () => {
    const field = setup(tree, "", "Boom");
    expect(field.container).toHaveTextContent("Boom");
  });
});

describe('<Group type="radio" />', () => {
  const tree = (
    <Group type="radio" name="value">
      <Item value="foo" />
    </Group>
  );

  it("retrieves `value` from `<Formik />`", () => {
    const field = setup(tree, null);
    const input = field.getByRole("radio");
    fireEvent.click(input);
    expect(input).toBeChecked();
  });

  it("retrieves `error` from `<Formik />`", () => {
    const field = setup(tree, "", "Boom");
    expect(field.container).toHaveTextContent("Boom");
  });
});
