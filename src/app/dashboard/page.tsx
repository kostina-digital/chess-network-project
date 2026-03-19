import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth/getCurrentUser";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Signed in as {user.email}</p>
    </div>
  );
}