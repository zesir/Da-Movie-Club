// utils/getProfileImage.ts
export function getProfileImage(
  profilePath: string | null | undefined,
  name: string,
) {
  if (profilePath) {
    return `https://image.tmdb.org/t/p/w185${profilePath}`;
  }

  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name,
  )}`;
}
