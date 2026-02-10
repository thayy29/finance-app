import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks';
import { Svg, Path, Circle } from 'react-native-svg';

export function Header() {
  const { isDark, toggleTheme, colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, backgroundColor: colors.background }]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Finanças</Text>
      </View>
      <TouchableOpacity
        onPress={toggleTheme}
        style={styles.themeButton}
        activeOpacity={0.6}
      >
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          {isDark ? (
            <Path
              d="M12 3V4M12 20V21M4 12H3M6.31 6.31L5.6 5.6M17.69 6.31L18.4 5.6M6.31 17.69L5.6 18.4M17.69 17.69L18.4 18.4M21 12H20M16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z"
              stroke={colors.blue}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <Path
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              stroke={colors.blue}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  themeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
