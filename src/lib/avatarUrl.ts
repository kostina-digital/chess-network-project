export function resolveAvatarUrl(userName: string, stored: string | null): string {
  const t = stored?.trim();
  if (t) return t;
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}`;
}
