const ANIMAL_AVATARS = [
  { emoji: "🐻", bg: "#F6D7A7" },
  { emoji: "🐰", bg: "#F9D9E8" },
  { emoji: "🐼", bg: "#E5E7EB" },
  { emoji: "🦊", bg: "#FBD1B7" },
  { emoji: "🐨", bg: "#DDE7F7" },
  { emoji: "🐶", bg: "#F6E2C3" },
  { emoji: "🐱", bg: "#FDE68A" },
  { emoji: "🐹", bg: "#FED7AA" },
] as const;

function hashSeed(input: string): number {
  let hash = 0;
  for (const char of input) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

export function createDefaultAvatarUrl(userName: string): string {
  const seed = userName.trim().toLowerCase() || "user";
  const { emoji, bg } = ANIMAL_AVATARS[hashSeed(seed) % ANIMAL_AVATARS.length];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Avatar">
      <rect width="96" height="96" rx="28" fill="${bg}" />
      <text x="48" y="50%" dominant-baseline="central" text-anchor="middle" font-size="44">${emoji}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function resolveAvatarUrl(userName: string, stored: string | null): string {
  const t = stored?.trim();
  if (t) return t;
  return createDefaultAvatarUrl(userName);
}
