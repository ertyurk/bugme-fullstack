import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { BaseButton } from "~/components/buttons";
import { FormElement } from "~/components/forms";
import { db } from "~/utils/db.server";
import { getUserId } from "~/utils/session.server";

type LoaderData = {
  email: string | undefined;
  name: string | undefined;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) redirect("/auth/login");

  const user = await db.users.findUnique({
    where: { id: userId ?? "" },
    select: { email: true, name: true },
  });
  if (!user) redirect("/auth/login");

  const data: LoaderData = {
    email: user?.email,
    name: user?.name,
  };
  return data;
};

//TODO: ACTION FOR PROFILE UPDATE

const Settings = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="">
          <Form
            method="post"
            className="bg-white min-w-full	 flex flex-col justify-center text-center shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Account information</h2>
              <BaseButton icon="tick" text="Save" />
            </div>

            <div className="flex space-x-10">
              <FormElement
                id="email"
                title="Email"
                type="email"
                placeHolder="mehmet@leanscale.com"
                value={data?.email}
                defaultValue={""}
                errorValue={""}
                disable={true}
              />
              <FormElement
                id="name"
                title="Fullname"
                type="text"
                placeHolder="Jhon Doe"
                value={data?.name}
                defaultValue={""}
                errorValue={""}
              />
              <FormElement
                id="password"
                title="Password"
                type="password"
                placeHolder="***********"
                defaultValue={""}
                errorValue={""}
                disable={true}
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Settings;
