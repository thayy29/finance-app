import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme, useFinance } from '../hooks';
import { formatInputCurrency, parseCurrency, getTodayISO } from '../../shared/utils';
import type { TipoPagamento } from '../../domain/entities';

export function GastoForm() {
  const { colors } = useTheme();
  const { categorias, addGasto } = useFinance();

  const [data, setData] = useState(getTodayISO());
  const [descricao, setDescricao] = useState('');
  const [valorInput, setValorInput] = useState('');
  const [categoria, setCategoria] = useState(categorias[0] || '');
  const [tipoPagamento, setTipoPagamento] = useState<TipoPagamento>('debito');

  const handleValorChange = (text: string) => {
    setValorInput(formatInputCurrency(text));
  };

  const handleSubmit = () => {
    if (!descricao || !valorInput || !data) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos para continuar.');
      return;
    }

    const valor = parseCurrency(valorInput);
    if (valor <= 0) {
      Alert.alert('Valor inválido', 'Informe um valor maior que zero.');
      return;
    }

    addGasto({ descricao, valor, data, categoria, tipoPagamento });
    setDescricao('');
    setValorInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>NOVO GASTO</Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={[styles.row, { borderBottomColor: colors.separator }]}>
          <Text style={[styles.label, { color: colors.text }]}>Data</Text>
          <TextInput
            value={data}
            onChangeText={setData}
            placeholder="AAAA-MM-DD"
            style={[styles.input, { color: colors.blue }]}
            placeholderTextColor={colors.gray}
          />
        </View>

        <View style={[styles.row, { borderBottomColor: colors.separator }]}>
          <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
          <TextInput
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Ex: Supermercado"
            style={[styles.input, { color: colors.blue }]}
            placeholderTextColor={colors.gray}
          />
        </View>

        <View style={[styles.row, { borderBottomColor: colors.separator }]}>
          <Text style={[styles.label, { color: colors.text }]}>Valor</Text>
          <TextInput
            keyboardType="numeric"
            value={valorInput}
            onChangeText={handleValorChange}
            placeholder="R$ 0,00"
            style={[styles.input, { color: colors.blue }]}
            placeholderTextColor={colors.gray}
          />
        </View>

        <View style={[styles.row, { borderBottomColor: colors.separator }]}>
          <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
          <Picker selectedValue={categoria} onValueChange={setCategoria} style={[styles.picker, { color: colors.blue }]}>
            {categorias.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        <View style={styles.rowLast}>
          <Text style={[styles.label, { color: colors.text }]}>Pagamento</Text>
          <Picker selectedValue={tipoPagamento} onValueChange={setTipoPagamento} style={[styles.picker, { color: colors.blue }]}>
            <Picker.Item label="Débito" value="debito" />
            <Picker.Item label="Crédito" value="credito" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: colors.blue }]} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Adicionar Gasto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { fontSize: 13, fontWeight: '400', marginBottom: 8, marginLeft: 16, letterSpacing: -0.08 },
  card: { borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  rowLast: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  label: { width: 100, fontSize: 17, fontWeight: '400' },
  input: { flex: 1, textAlign: 'right', fontSize: 17, fontWeight: '400' },
  picker: { flex: 1 },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
});
