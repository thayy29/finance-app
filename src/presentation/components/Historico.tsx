import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useTheme, useFinance } from '../hooks';
import { formatCurrency, formatDateBR, getMonthYear } from '../../shared/utils';
import { CategoryColors } from '../../shared/theme';
import { Svg, Path } from 'react-native-svg';
import type { Gasto } from '../../domain/entities';

interface HistoricoProps {
  categoriaFilter: string;
}

export function Historico({ categoriaFilter }: HistoricoProps) {
  const { colors } = useTheme();
  const { gastos, removeGasto } = useFinance();

  const gastosFiltrados = useMemo(() => {
    return gastos.filter((g) => categoriaFilter === 'todas' || g.categoria === categoriaFilter);
  }, [gastos, categoriaFilter]);

  const gastosAgrupados = useMemo(() => {
    const agrupado: Record<string, Gasto[]> = {};
    gastosFiltrados.forEach((g) => {
      const mesAno = getMonthYear(g.data);
      if (!agrupado[mesAno]) agrupado[mesAno] = [];
      agrupado[mesAno].push(g);
    });
    return agrupado;
  }, [gastosFiltrados]);

  const handleDelete = (id: number) => {
    Alert.alert('Excluir Gasto', 'Deseja remover este gasto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removeGasto(id) },
    ]);
  };

  if (Object.keys(gastosAgrupados).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>HISTÓRICO</Text>
        <View style={[styles.emptyCard, { backgroundColor: colors.card }]}>
          <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" style={{ marginBottom: 12 }}>
            <Path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke={colors.gray} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Sem gastos</Text>
          <Text style={[styles.emptySubtitle, { color: colors.gray }]}>Adicione seu primeiro gasto acima</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Object.entries(gastosAgrupados).map(([mes, itens], groupIndex) => (
        <View key={mes}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary, marginTop: groupIndex === 0 ? 0 : 24 }]}>
            {mes.toUpperCase()}
          </Text>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            {itens
              .sort((a, b) => b.data.localeCompare(a.data))
              .map((gasto, index) => (
                <TouchableOpacity
                  key={gasto.id}
                  onLongPress={() => handleDelete(gasto.id)}
                  activeOpacity={0.7}
                  style={[styles.row, index < itens.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separator }]}
                >
                  <View style={styles.leftColumn}>
                    <Text style={[styles.description, { color: colors.text }]}>{gasto.descricao}</Text>
                    <View style={styles.metaRow}>
                      <Text style={[styles.date, { color: colors.gray }]}>{formatDateBR(gasto.data)}</Text>
                      <Text style={[styles.dot, { color: colors.gray }]}>·</Text>
                      <Text style={[styles.categoria, { color: CategoryColors[gasto.categoria] || colors.gray }]}>{gasto.categoria}</Text>
                      <Text style={[styles.dot, { color: colors.gray }]}>·</Text>
                      <Text style={[styles.tipo, { color: gasto.tipoPagamento === 'debito' ? colors.blue : colors.indigo }]}>
                        {gasto.tipoPagamento === 'debito' ? 'Débito' : 'Crédito'}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.value, { color: colors.red }]}>-{formatCurrency(gasto.valor)}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionHeader: { fontSize: 13, fontWeight: '400', marginBottom: 8, marginLeft: 16, letterSpacing: -0.08 },
  card: { borderRadius: 12, overflow: 'hidden' },
  emptyCard: { borderRadius: 12, padding: 40, alignItems: 'center' },
  emptyTitle: { fontSize: 17, fontWeight: '600', marginBottom: 4 },
  emptySubtitle: { fontSize: 15, fontWeight: '400' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  leftColumn: { flex: 1, marginRight: 12 },
  description: { fontSize: 17, fontWeight: '400', marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  date: { fontSize: 13, fontWeight: '400' },
  dot: { fontSize: 13, marginHorizontal: 6 },
  categoria: { fontSize: 13, fontWeight: '500' },
  tipo: { fontSize: 13, fontWeight: '500' },
  value: { fontSize: 17, fontWeight: '600' },
});
