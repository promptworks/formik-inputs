import * as React from "react";
import { Formik, Form } from "formik";
import { SubmitButton } from "../src";
import { render, fireEvent, waitFor } from "@testing-library/react";

const onSubmit = () => Promise.resolve();
const renderFormik = (children: React.ReactNode, opts: any = {}) => {
  const { getByRole } = render(
    <Formik onSubmit={onSubmit} initialValues={{}} {...opts}>
      <Form role="form">{children}</Form>
    </Formik>
  );

  return { button: getByRole("button"), form: getByRole("form") };
};

describe("<SubmitButton />", () => {
  it("accepts children", () => {
    const { button } = renderFormik(<SubmitButton>Hello</SubmitButton>);

    expect(button.textContent).toEqual("Hello");
    expect(button.getAttribute("disabled")).toBeNull();
  });

  describe("when invalid", () => {
    it("is disabled", async () => {
      const { form, button } = renderFormik(<SubmitButton />, {
        initialErrors: { foo: "bar" },
      });

      fireEvent.submit(form);

      await waitFor(() => {
        expect(button.getAttribute("disabled")).not.toBeNull();
      });
    });
  });

  describe("when submitting", () => {
    it("is disabled", async () => {
      const { button, form } = renderFormik(<SubmitButton />);

      fireEvent.submit(form);

      await waitFor(() => {
        expect(button.getAttribute("disabled")).not.toBeNull();
      });
    });

    it("shows submitting label", async () => {
      const { button, form } = renderFormik(
        <SubmitButton submitting="Submitting..." />
      );

      fireEvent.submit(form);

      await waitFor(() => {
        expect(button.textContent).toEqual("Submitting...");
      });
    });
  });
});
