import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { FormElement } from "~/components/forms";
import { db } from "~/utils/db.server";
import { createUserSession, register } from "~/utils/session.server";

function validateMail(email: unknown) {
  if (
    typeof email !== "string" ||
    email.length < 3 ||
    !email.includes("leanscale")
  ) {
    return `Only Leanscale mail owners can register`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

function validateName(name: unknown) {
  if (typeof name !== "string" || name.length < 3) {
    return `Name must be at least 3 characters long`;
  }
}

function validateWorkspace(workspace: unknown) {
  if (typeof workspace !== "string" || workspace.length < 3) {
    return `Workspace Name must be at least 3 characters long`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    password: string | undefined;
    name: string | undefined;
    workspace: string | undefined;
  };
  fields?: {
    email: string;
    password: string;
    name: string;
    workspace: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const name = form.get("name");
  const workspace = form.get("workspace");

  if (
    typeof email !== "string" ||
    typeof name !== "string" ||
    typeof workspace !== "string" ||
    typeof password !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { email, password, name, workspace };
  const fieldErrors = {
    email: validateMail(email),
    password: validatePassword(password),
    name: validateName(name),
    workspace: validateWorkspace(workspace),
  };


  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  const userExists = await db.users.findFirst({
    where: { email },
  });
  if (userExists) {
    return badRequest({
      fields,
      formError: `User with username ${email} already exists`,
    });
  }

  const workspaceExists = await db.workspaces.findUnique({
    where: { name: workspace },
  });
  if (workspaceExists) {
    return badRequest({
      fields,
      formError: `Workspace with name ${workspace} already exists`,
    });
  }

  const user = await register({ email, password, name, workspace });
  if (!user) {
    return badRequest({
      fields,
      formError: `Something went wrong trying to create a new user.`,
    });
  }

  

  return createUserSession(user.id, "/");
};

const Register = () => {
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
            <p className="text-gray-800">Register asap 🚀</p>

            <FormElement
              id="email"
              title="Email"
              type="email"
              placeHolder="mehmet@leanscale.com"
              defaultValue={actionData?.fields?.email}
              errorValue={actionData?.fieldErrors?.email}
            />
            <FormElement
              id="name"
              title="Fullname"
              type="text"
              placeHolder="Jhon Doe"
              defaultValue={actionData?.fields?.name}
              errorValue={actionData?.fieldErrors?.name}
            />
            <FormElement
              id="workspace"
              title="Workspace"
              type="text"
              placeHolder="Lean Scale"
              defaultValue={actionData?.fields?.workspace}
              errorValue={actionData?.fieldErrors?.workspace}
            />
            <FormElement
              id="password"
              title="Password"
              type="password"
              placeHolder="***********"
              defaultValue={actionData?.fields?.name}
              errorValue={actionData?.fieldErrors?.name}
            />

            <button
              className="font-bold  bg-[#4945FF] border-[#4945FF] text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Register
            </button>
          </Form>
          <div className="flex justify-center mx-9">
            <Link to="/auth/login">
              <span className="text-[#4945FF] text-sm">
                Have an account? Login{" "}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
