import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useTheme, useFinance } from '../hooks';
import { formatCurrency, formatInputCurrency, parseCurrency } from '../../shared/utils';
import { Svg, Path } from 'react-native-svg';

export function CategoriasList() {
  const { colors } = useTheme();
  const { metas, categorias, totalPlanejado, addCategoria, removeCategoria, updateMeta } = useFinance();
  const [novaCategoria, setNovaCategoria] = useState('');
  const [metaInputs, setMetaInputs] = useState<Record<string, string>>({});

  const handleAddCategoria = () => {
    const nome = novaCategoria.trim();
    if (nome && !metas[nome]) {
      addCategoria(nome);
      setNovaCategoria('');
    }
  };

  const handleMetaChange = (categoria: string, value: string) => {
    setMetaInputs((prev) => ({ ...prev, [categoria]: formatInputCurrency(value) }));
  };

  const handleMetaBlur = (categoria: string) => {
    const value = metaInputs[categoria] || formatCurrency(metas[categoria]);
    updateMeta(categoria, parseCurrency(value));
    setMetaInputs((prev) => {
      const newInputs = { ...prev };
      delete newInputs[categoria];
      return newInputs;
    });
  };

  const handleDeleteCategoria = (categoria: string) => {
    Alert.alert('Excluir Categoria', `Deseja excluir "${categoria}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removeCategoria(categoria) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>ORÇAMENTO</Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={[styles.totalRow, { borderBottomColor: colors.separator }]}>
          <Text style={[styles.totalLabel, { color: colors.text }]}>Total Planejado</Text>
          <Text style={[styles.totalValue, { color: colors.blue }]}>{formatCurrency(totalPlanejado)}</Text>
        </View>

        {categorias.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.gray }]}>Nenhuma categoria criada</Text>
          </View>
        ) : (
          categorias.map((categoria, index) => (
            <View
              key={categoria}
              style={[styles.row, index < categorias.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separator }]}
            >
              <TouchableOpacity onPress={() => handleDeleteCategoria(categoria)} style={styles.deleteBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <View style={styles.deleteIcon}>
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                    <Path d="M5 12H19" stroke={colors.red} strokeWidth={2.5} strokeLinecap="round" />
                  </Svg>
                </View>
              </TouchableOpacity>
              <Text style={[styles.categoriaText, { color: colors.text }]}>{categoria}</Text>
              <TextInput
                keyboardType="numeric"
                value={metaInputs[categoria] ?? formatCurrency(metas[categoria])}
                onChangeText={(text) => handleMetaChange(categoria, text)}
                onBlur={() => handleMetaBlur(categoria)}
                style={[styles.metaInput, { color: colors.blue }]}
              />
            </View>
          ))
        )}
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.addRow}>
          <TextInput
            placeholder="Nova categoria"
            value={novaCategoria}
            onChangeText={setNovaCategoria}
            onSubmitEditing={handleAddCategoria}
            style={[styles.addInput, { color: colors.text }]}
            placeholderTextColor={colors.gray}
          />
          <TouchableOpacity onPress={handleAddCategoria} activeOpacity={0.6}>
            <Text style={[styles.addButtonText, { color: colors.blue }]}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { fontSize: 13, fontWeight: '400', marginBottom: 8, marginLeft: 16, letterSpacing: -0.08 },
  card: { borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  totalLabel: { fontSize: 17, fontWeight: '400' },
  totalValue: { fontSize: 17, fontWeight: '600' },
  emptyContainer: { paddingVertical: 20 },
  emptyText: { textAlign: 'center', fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'center', paddingLeft: 12, paddingRight: 16, paddingVertical: 11 },
  deleteBtn: { marginRight: 12 },
  deleteIcon: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FF3B30', alignItems: 'center', justifyContent: 'center' },
  categoriaText: { flex: 1, fontSize: 17, fontWeight: '400' },
  metaInput: { fontSize: 17, fontWeight: '400', textAlign: 'right', minWidth: 100 },
  addRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 11 },
  addInput: { flex: 1, fontSize: 17 },
  addButtonText: { fontSize: 17, fontWeight: '400' },
});
