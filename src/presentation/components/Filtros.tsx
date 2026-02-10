import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme, useFinance } from '../hooks';

interface FiltrosProps {
  categoriaFilter: string;
  setCategoriaFilter: (value: string) => void;
}

export function Filtros({ categoriaFilter, setCategoriaFilter }: FiltrosProps) {
  const { colors } = useTheme();
  const { categorias } = useFinance();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>FILTRAR</Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
          <Picker
            selectedValue={categoriaFilter}
            onValueChange={setCategoriaFilter}
            style={[styles.picker, { color: colors.blue }]}
          >
            <Picker.Item label="Todas" value="todas" />
            {categorias.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { fontSize: 13, fontWeight: '400', marginBottom: 8, marginLeft: 16, letterSpacing: -0.08 },
  card: { borderRadius: 12, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 6 },
  label: { width: 100, fontSize: 17, fontWeight: '400' },
  picker: { flex: 1 },
});
