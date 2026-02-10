export type TipoPagamento = 'debito' | 'credito';

export interface Gasto {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  tipoPagamento: TipoPagamento;
}

export interface GastoInput {
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  tipoPagamento: TipoPagamento;
}

export type Metas = Record<string, number>;
