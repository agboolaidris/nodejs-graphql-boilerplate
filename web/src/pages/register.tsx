import React from "react";
import { Formik, Form } from "formik";
import { useCreateUserMutation } from "../generated/graphql";
import { useRouter } from "next/router";

//components
import { RegisterWrapper } from "../styles/auth";
import InputText from "../components/shared/inputText";
import Button from "../components/shared/button";
import SelectInput from "../components/shared/selectInput";
import { toast } from "react-toastify";

function Register() {
  const [{}, register] = useCreateUserMutation();
  const router = useRouter();
  return (
    <RegisterWrapper>
      <div>
        <div className="header">
          <h3>Register with us</h3>
        </div>
        <Formik
          initialValues={{
            name: "",
            telephone: "",
            email: "",
            role: "",
            password: "",
          }}
          onSubmit={async (value, { setErrors }) => {
            const data = await register(value);
            const response = data.data?.Register;
            if (response?.errors) {
              setErrors(response?.errors);
            } else if (response?.msg) {
              toast.success("Account Created");
              router.push("/login");
            }
          }}
        >
          {({ handleSubmit, errors, values, handleChange, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <InputText
                label="Username"
                value={values.name}
                name="name"
                onChange={handleChange}
                placeHolder="User867"
                error={errors?.name}
              />
              <InputText
                label="Email"
                value={values?.email}
                name="email"
                onChange={handleChange}
                placeHolder="xyz@example.com"
                error={errors?.email}
              />
              <InputText
                label="Phone Number"
                value={values.telephone}
                name="telephone"
                onChange={handleChange}
                placeHolder="+23400000...."
                error={errors?.telephone}
              />
              <SelectInput
                label="Role"
                placeHolder="choose your role"
                onSelect={(value) => (values.role = value)}
                error={errors?.role}
                items={[
                  { name: "User", value: "user" },
                  { name: "Admin", value: "admin" },
                ]}
              ></SelectInput>

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
