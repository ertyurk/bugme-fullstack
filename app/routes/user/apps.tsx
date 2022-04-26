import type { workspaces } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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

//TODO: ACTION FOR PROFILE UPDATE

const Apps = () => {
  const data = useLoaderData();
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="">
          <h2 className="font-bold text-lg">Your Apps</h2>
        </div>
      </div>
    </>
  );
};

export default Apps;

/**
 * 
 * <div className="text-left">
            <p>
              <b>Adding a new app Go</b>
              <br />
              on and add our SDK into your app — the first run will
              automatically add that app here. Read how to add the SDK into your
              Android, iOS, React Native or Flutter app.
            </p>
          </div>

          <details>
            <summary>Android | ALPHA</summary>
            <h1>BUNDLE IDcom.leanscale.dca.multi.alpha</h1>
            <p>Do you want to forward bugs to the tools you already use?</p>
            <p>
              Epcot is a theme park at Walt Disney World Resort featuring
              exciting attractions, international pavilions, award-winning
              fireworks and seasonal special events.
            </p>
            <p>
              Forward bugs to Connected Manage Asana Azure DevOps Clickup Github
              Jira Slack Trello Zapier Follow this app
            </p>
          </details>

          <details>
            <summary>iOS | ALPHA</summary>
            <h1>BUNDLE IDcom.leanscale.dca.multi.alpha</h1>
            <p>Do you want to forward bugs to the tools you already use?</p>
            <p>
              Epcot is a theme park at Walt Disney World Resort featuring
              exciting attractions, international pavilions, award-winning
              fireworks and seasonal special events.
            </p>
            <p>
              Forward bugs to Connected Manage Asana Azure DevOps Clickup Github
              Jira Slack Trello Zapier Follow this app
            </p>
          </details>
 * 
 */
