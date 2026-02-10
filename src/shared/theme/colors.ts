export const Colors = {
  light: {
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    textSecondary: '#3C3C43',
    textTertiary: '#8E8E93',
    separator: '#C6C6C8',
    blue: '#007AFF',
    indigo: '#5856D6',
    red: '#FF3B30',
    green: '#34C759',
    orange: '#FF9500',
    cyan: '#5AC8FA',
    purple: '#AF52DE',
    pink: '#FF2D55',
    gray: '#8E8E93',
  },
  dark: {
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#8E8E93',
    separator: '#38383A',
    blue: '#0A84FF',
    indigo: '#5E5CE6',
    red: '#FF453A',
    green: '#30D158',
    orange: '#FF9F0A',
    cyan: '#64D2FF',
    purple: '#BF5AF2',
    pink: '#FF375F',
    gray: '#8E8E93',
  },
} as const;

export const CategoryColors: Record<string, string> = {
  'Alimentação': '#FF9500',
  'Transporte': '#5AC8FA',
  'Essenciais': '#34C759',
  'Lazer': '#FF2D55',
  'Saúde': '#AF52DE',
  'Educação': '#5856D6',
  'Outros': '#8E8E93',
};

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  separator: string;
  blue: string;
  indigo: string;
  red: string;
  green: string;
  orange: string;
  cyan: string;
  purple: string;
  pink: string;
  gray: string;
};
