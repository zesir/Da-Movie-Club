export function getGenderTitle(gender?: number): "Mr" | "Mme" | "" {
  if (gender === 1) return "Mme";
  if (gender === 2) return "Mr";
  return "";
}
