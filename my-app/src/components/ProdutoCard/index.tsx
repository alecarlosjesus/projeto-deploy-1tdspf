import type { TipoProduto } from "../../types/types";
type Props = {
  produto: TipoProduto;
};
export default function ProdutoCard({ produto }: Props) {
  return (
    <article>
      {produto.avatar && (
        <img
          src={produto.avatar}
          alt={`Imagem do produto ${produto.nome}`}
          width={160}
          height={120}
        />
      )}
      <h3>{produto.nome}</h3>
      <p>Preço: R$ {produto.preco.toFixed(2)}</p>
      <p>Estoque: {produto.estoque}</p>
    </article>
  )
}