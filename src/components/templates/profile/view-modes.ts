const PROFILE_MODES = ['view', 'edit-password', 'edit-profile'] as const;
export type ProfileModes = (typeof PROFILE_MODES)[number];

export default function isProfileMode(
  value: string | undefined,
): value is ProfileModes {
  return value !== undefined && PROFILE_MODES.includes(value as ProfileModes);
}
