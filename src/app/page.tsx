import { redirect } from "next/navigation";

/** The deployment is the pipeline: the home page opens the console. */
export default function Home() {
  redirect("/console");
}
