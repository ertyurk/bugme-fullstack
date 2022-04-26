import { db } from "./db.server";

export async function generateApiSecret() {
  var start = "BG_";
  var length = 64;
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  var text = "";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return start + text;
}

export async function getResources(userId: string) {
  const resources = await db.resources.findMany({
    where: { userId: userId },
    select: {
      workspaceId: true,
    },
  });
  if (resources.length === 0) {
    return null;
  }
  const workspaceList = await db.workspaces.findMany({
    where: { id: { in: resources.map((resource) => resource.workspaceId) } },
    select: {
      name: true,
      apiSecret: true,
    },
  });

  return workspaceList;
}

export async function bundleController(bundle_id: string) {
  const appExists = await db.apps.findUnique({
    where: { bundle_id },
  });
  if (appExists) {
    return { id: appExists.id };
  }

  const newApp = await db.apps.create({
    data: {
      bundle_id,
      platform: "",
      userId: "",
      workspaceId: "",
      name: bundle_id,
    },
  });

  if (!newApp) {
    return null;
  }

  return { id: newApp.id };
}

// Demo function
export async function createBug(bug: any) {
  const newBug = await db.bugs.create({
    data: {
      ...bug,
      userId: "",
      workspaceId: "",
    },
  });

  if (!newBug) {
    return null;
  }

  return { id: newBug.id };
}

//demo function
export async function bugMediaHandler(params:any) {
  return {}
}

