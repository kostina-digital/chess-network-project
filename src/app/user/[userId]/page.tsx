import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth/getCurrentUser";

type Props = {
  params: { userId: string };
};

export default async function UserPage({ params }: Props) {
  const { userId } = params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const isOwnProfile = String(user.id) === userId;

  return (
    <div>
      {isOwnProfile ? (
        <>
          <h1>Ваш профиль</h1>
          <p>Содержимое, которое видите только вы (настройки, черновики и т.д.).</p>
        </>
      ) : (
        <>
          <h1>Профиль пользователя</h1>
          <p>Пользователь: {userId}</p>
          <p>Содержимое, которое видят другие (публичная карточка).</p>
        </>
      )}
      <Link href="/">На главную</Link>
    </div>
  );
}
