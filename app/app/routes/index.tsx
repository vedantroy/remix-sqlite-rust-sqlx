import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "~/db/index.server";

export const loader: LoaderFunction = async () => {
  console.log(db);
  const pool = await db.createConnection("sqlite://test.db");
  console.log(pool);
  //console.log(pool)
  return json({ sum: 3 });
};

export default function Index() {
  const data = useLoaderData();
  return <div>Sum of 1 + 2: {data.sum}</div>;
}
