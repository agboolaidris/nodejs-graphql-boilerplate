import React from "react";
import { Formik, Form } from "formik";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";

//components
import { RegisterWrapper } from "../styles/auth";
import InputText from "../components/shared/inputText";
import Button from "../components/shared/button";
import { toast } from "react-toastify";

function Register() {
  const [{}, login] = useLoginMutation();
  const router = useRouter();
  return (
    <RegisterWrapper>
      <div>
        <div className="header">
          <h3>Welcome Back</h3>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (value, { setErrors }) => {
            const data = await login(value);

            const response = data.data?.Login;
            if (response?.errors) {
              setErrors(response?.errors);
            } else if (response?.msg) {
              toast.success("Welome back!!!");
              router.push("/");
            }
          }}
        >
          {({ handleSubmit, errors, values, handleChange, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <InputText
                label="Email"
                value={values?.email}
                name="email"
                onChange={handleChange}
                placeHolder="xyz@example.com"
                error={errors?.email}
              />

              <InputText
                label="Password"
                value={values.password}
                name="password"
                onChange={handleChange}
                placeHolder="*********"
                type="password"
                error={errors?.password}
              />

              <Button style="primary" type="submit" isloading={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </RegisterWrapper>
  );
}

export default Register;
