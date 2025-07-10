import { redirect } from "next/navigation";

export default function Home() {
  // return (
  //   // <main className="flex min-h-screen items-center justify-center  text-center p-6">
  //   // </main>
  // );
  redirect("/teacher/1");
}
