export const darkColors = {
  primary: '#eb723a',
  background: '#0B0E14',
  surface: '#141821',
  border: '#1F2933',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A7B4',
  success: '#22C55E',
  warning: '#FACC15',
  error: '#EF4444',
} as const;

export const lightColors = {
  primary: '#eb723a',
  background: '#FFFFFF',
  surface: '#F5F6F8',
  border: '#E5E7EB',
  textPrimary: '#0B0E14',
  textSecondary: '#6B7280',
  success: '#22C55E',
  warning: '#FACC15',
  error: '#EF4444',
} as const;

export type ThemeColors = typeof darkColors;

export default { dark: darkColors, light: lightColors };
