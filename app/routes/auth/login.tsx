import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";

import { createUserSession, login } from "~/utils/session.server";
import { FormElement } from "~/components/forms";

function validateMail(mail: unknown) {
  if (typeof mail !== "string" || mail.length < 3) {
    return `Mail must be at least 3 characters long.`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    password: string | undefined;
  };
  fields?: {
    email: string;
    password: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { email, password };
  const fieldErrors = {
    email: validateMail(email),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  const user = await login({ email, password });
  if (!user) {
    return badRequest({
      fields,
      formError: `Username/Password combination is incorrect`,
    });
  }

  return createUserSession(user.id, "/");
};

const Login = () => {
  const actionData = useActionData<ActionData>();

  return (
    <>
      <div className="flex m-auto justify-center h-screen items-center w-screen">
        <div className="w-full max-w-md">
          <Form
            method="post"
            className="bg-white flex flex-col justify-center text-center shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-8"
          >
            <h1 className="text-gray-800 font-bold align-middle text-3xl">
              BUGGER 🐞
            </h1>
            <p className="text-gray-800">Login asap 🚀</p>

            <FormElement
              id="email"
              title="Email"
              type="email"
              placeHolder="mehmet@leanscale.com"
              defaultValue={actionData?.fields?.email}
              errorValue={actionData?.fieldErrors?.email}
            />
            <FormElement
              id="password"
              title="Password"
              type="password"
              placeHolder="***********"
              defaultValue={actionData?.fields?.password}
              errorValue={actionData?.fieldErrors?.password}
            />

            <button
              className=" font-bold  bg-[#4945FF] border-[#4945FF] text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Login
            </button>
          </Form>
          <div className="flex justify-between mx-9">
            <Link to="/auth/forgotpassword">
              <span className="text-[#4945FF] text-sm">Forgot password</span>
            </Link>
            <Link to="/auth/register">
              <span className="text-[#4945FF] text-sm">Register</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
