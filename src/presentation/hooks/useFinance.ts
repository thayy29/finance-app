import { useFinanceStore } from '../../application/stores';

export function useFinance() {
  const store = useFinanceStore();

  return {
    salario: store.salario,
    gastos: store.gastos,
    metas: store.metas,
    saldo: store.getSaldo(),
    totalGastos: store.getTotalGastos(),
    totalPlanejado: store.getTotalPlanejado(),
    categorias: store.getCategorias(),
    setSalario: store.setSalario,
    addGasto: store.addGasto,
    removeGasto: store.removeGasto,
    addCategoria: store.addCategoria,
    removeCategoria: store.removeCategoria,
    updateMeta: store.updateMeta,
  };
}
