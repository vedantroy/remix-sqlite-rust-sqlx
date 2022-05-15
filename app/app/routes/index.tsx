import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "~/db/index.server"

export const loader: LoaderFunction = () => {
  return json({ sum: db.sum(1, 2) })
}

export default function Index() {
  const data = useLoaderData()
  return <div>Sum of 1 + 2: {data.sum}</div>
}
