import type { workspaces } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { ActionButton, BaseButton } from "~/components/buttons";
import { FormElement } from "~/components/forms";
import { getResources } from "~/utils/controller.server";
import { getUserId } from "~/utils/session.server";

type LoaderData = {
  workspaces: Pick<workspaces, "name" | "apiSecret">[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) redirect("/auth/login");

  const resources = await getResources(userId ?? "");
  if (!resources) {
    console.log("no resources");
  }

  const data: LoaderData = {
    workspaces: resources ?? [],
  };

  return data;
};

//TODO: ACTION for new workspace - edit - add  and refresh apiSecret

const Workspace = () => {
  const data = useLoaderData();
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="">
          <Form
            method="post"
            className="bg-white min-w-full	 flex flex-col justify-center text-center shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Workspaces</h2>
              <BaseButton icon="plus" text="Add" />
            </div>

            {data.workspaces.map(
              (
                workspace: { name: string; apiSecret: string },
                index: number
              ) => (
                <div
                  key={index}
                  className="flex space-x-10 justify-between items-baseline"
                >
                  <FormElement
                    id="name"
                    title="Workspace Name"
                    type="name"
                    placeHolder="Lean Scale"
                    value={workspace?.name}
                    defaultValue={""}
                    errorValue={""}
                  />
                  <FormElement
                    id="apiSecret"
                    title="API Secret Key"
                    type="text"
                    placeHolder=""
                    value={workspace.apiSecret}
                    defaultValue={""}
                    errorValue={""}
                    disable={true}
                  />
                  <div className="pt-2 space-x-4">
                    <ActionButton icon="cancel" styles="cancel" />
                    <ActionButton icon="tick" styles="save" />
                  </div>
                </div>
              )
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Workspace;
