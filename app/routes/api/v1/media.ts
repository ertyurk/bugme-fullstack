import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  // So you can write this:
  return json({ media: "ajnkmsbdbhjkasdghbjkasghjkld", request });
};