import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme, useFinance } from '../hooks';
import { formatCurrency, formatInputCurrency, parseCurrency } from '../../shared/utils';

export function HeroSection() {
  const { colors } = useTheme();
  const { salario, saldo, setSalario } = useFinance();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(formatCurrency(salario));
  }, [salario]);

  const handleInputChange = (text: string) => {
    setInputValue(formatInputCurrency(text));
  };

  const handleBlur = () => {
    setSalario(parseCurrency(inputValue));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={styles.label}>Saldo Disponível</Text>
        <Text style={[styles.saldo, { color: saldo < 0 ? colors.red : colors.text }]}>
          {formatCurrency(saldo)}
        </Text>
      </View>

      <View style={[styles.incomeCard, { backgroundColor: colors.card }]}>
        <View style={styles.incomeRow}>
          <Text style={[styles.incomeLabel, { color: colors.textSecondary }]}>Renda Mensal</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="R$ 0,00"
            value={inputValue}
            onChangeText={handleInputChange}
            onBlur={handleBlur}
            style={[styles.incomeInput, { color: colors.blue }]}
            placeholderTextColor={colors.gray}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 12,
  },
  label: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 4,
  },
  saldo: {
    textAlign: 'center',
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: -1.5,
  },
  incomeCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  incomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  incomeLabel: {
    fontSize: 17,
    fontWeight: '400',
  },
  incomeInput: {
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'right',
    minWidth: 120,
  },
});
