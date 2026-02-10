import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from './src/presentation/hooks';
import {
  Header,
  HeroSection,
  CategoriasList,
  GastoForm,
  Filtros,
  Historico,
} from './src/presentation/components';

function AppContent() {
  const { isDark, colors } = useTheme();
  const [categoriaFilter, setCategoriaFilter] = useState('todas');

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <HeroSection />
        <CategoriasList />
        <GastoForm />
        <Filtros categoriaFilter={categoriaFilter} setCategoriaFilter={setCategoriaFilter} />
        <Historico categoriaFilter={categoriaFilter} />
      </ScrollView>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 140,
  },
});
