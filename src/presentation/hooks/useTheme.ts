import { useThemeStore } from '../../application/stores';
import { Colors, ThemeColors } from '../../shared/theme';

export function useTheme() {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const isDark = theme === 'dark';
  const colors: ThemeColors = Colors[theme];

  return {
    theme,
    isDark,
    colors,
    toggleTheme,
    setTheme,
  };
}
