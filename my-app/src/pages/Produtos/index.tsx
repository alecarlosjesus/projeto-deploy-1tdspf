import { useEffect, useState } from "react";
import { Link } from "react-router";
import ProdutoCard from "../../components/ProdutoCard";
import {
  excluirProduto,
  listarProdutos,
} from "../../services/produtos";
import type { TipoProduto } from "../../types/types";
export default function Produtos() {
  const [produtos, setProdutos] = useState<TipoProduto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");
        const lista = await listarProdutos();
        setProdutos(lista);
      } catch (error) {
        setErro(error instanceof Error ? error.message : "Erro inesperado");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

    async function handleDelete(id: string) {
    const confirmou = window.confirm(
      "Deseja realmente excluir este produto?",
    );
    if (!confirmou) return;
    try {
      await excluirProduto(id);
      setProdutos((listaAtual) =>
        listaAtual.filter((produto) => produto.id !== id),
      );
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro inesperado";
      alert(mensagem);
    }
  }
  if (carregando) return <p>Carregando produtos...</p>;
  if (erro) return <p role="alert">{erro}</p>;
  return (
    <main>
      <h1>Produtos</h1>
      <Link to="/CadastrarProduto">Cadastrar produto</Link>
      {produtos.length === 0 && <p>Nenhum produto cadastrado.</p>}
      <section>
        {produtos.map((produto) => (
          <div key={produto.id}>
            <ProdutoCard produto={produto} />
            <Link to={`/EditarProdutos/${produto.id}`}>Editar</Link>
            <button type="button" onClick={() => handleDelete(produto.id)}>
              Excluir
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}   