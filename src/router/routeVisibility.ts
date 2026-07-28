export const RouteVisibility = {
  OnlyForLoggedIn: 0,
  OnlyForAnonymous: 1,
  ForEveryone: 2,
} as const;

export type RouteVisibility =
  (typeof RouteVisibility)[keyof typeof RouteVisibility];
