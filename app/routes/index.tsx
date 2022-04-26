import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { requireUserId } from "~/utils/session.server";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name: string | undefined;
    content: string | undefined;
  };
  fields?: {
    name: string;
    content: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  return redirect(`/?${userId}`);
};

export default function Index() {
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <div className="">
        <h1 className="text-red-700">HomePage</h1>
        <p>{actionData}</p>
      </div>
    </div>
  );
}
