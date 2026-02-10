import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Gasto, GastoInput, Metas } from '../../domain/entities';

interface FinanceState {
  salario: number;
  gastos: Gasto[];
  metas: Metas;
}

interface FinanceActions {
  setSalario: (salario: number) => void;
  addGasto: (gasto: GastoInput) => void;
  removeGasto: (id: number) => void;
  addCategoria: (nome: string) => void;
  removeCategoria: (nome: string) => void;
  updateMeta: (categoria: string, valor: number) => void;
  getSaldo: () => number;
  getTotalGastos: () => number;
  getTotalPlanejado: () => number;
  getCategorias: () => string[];
}

const initialMetas: Metas = {
  'Essenciais': 0,
  'Alimentação': 0,
  'Transporte': 0,
};

export const useFinanceStore = create<FinanceState & FinanceActions>()(
  persist(
    (set, get) => ({
      salario: 0,
      gastos: [],
      metas: initialMetas,

      setSalario: (salario) => set({ salario }),

      addGasto: (gasto) => {
        const newGasto: Gasto = { ...gasto, id: Date.now() };
        set((state) => ({ gastos: [newGasto, ...state.gastos] }));
      },

      removeGasto: (id) => {
        set((state) => ({ gastos: state.gastos.filter((g) => g.id !== id) }));
      },

      addCategoria: (nome) => {
        set((state) => ({ metas: { ...state.metas, [nome]: 0 } }));
      },

      removeCategoria: (nome) => {
        set((state) => {
          const newMetas = { ...state.metas };
          delete newMetas[nome];
          return { metas: newMetas };
        });
      },

      updateMeta: (categoria, valor) => {
        set((state) => ({ metas: { ...state.metas, [categoria]: valor } }));
      },

      getSaldo: () => {
        const { salario, gastos } = get();
        return salario - gastos.reduce((acc, g) => acc + g.valor, 0);
      },

      getTotalGastos: () => get().gastos.reduce((acc, g) => acc + g.valor, 0),

      getTotalPlanejado: () => Object.values(get().metas).reduce((acc, v) => acc + v, 0),

      getCategorias: () => Object.keys(get().metas).sort(),
    }),
    {
      name: 'finance-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
