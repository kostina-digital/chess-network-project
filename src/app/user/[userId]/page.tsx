export default async function UserByIdPage({
  params,
}: {
  params: Promise<{ userId: string }> | { userId: string };
}) {
  const { userId } = await Promise.resolve(params);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-xl font-semibold text-foreground">User</h1>
      <p className="mt-2 text-muted-foreground">ID: {userId}</p>
    </div>
  );
}
