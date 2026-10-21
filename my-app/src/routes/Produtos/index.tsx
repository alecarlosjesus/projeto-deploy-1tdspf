import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";
import { Link } from "react-router";
import CardProduto from "../../components/CardProduto";
import { FaEdit as Editar } from "react-icons/fa";
import { MdDeleteForever as Excluir } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

export default function Produtos() {
  // Para alterar o título da página:
  document.title = "Produtos";

  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  useEffect(() => {
    const carregaProdutos = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(
            `Erro na listagem dos produtos: ${response.status} - ${response.statusText}`,
          );
        }

        const {data,status} = await response.json();
        
        if(status === "error"){
          throw new Error(`Erro na listagem dos produtos ${status}`);
        }

        setProdutos(data);
      } catch (error) {
        console.error(error);
      }
    };

    carregaProdutos();
  }, []);

  const handleDelete = async (id: string) => {
    try {

      const acao = {
        action:"DELETE",
        id:id
      }

      const contentHeader = {
          "Content-Type":"text/plain;charset=utf-8"
        }

      const requObj = {
        method:"POST",
        headers:contentHeader,
        body: JSON.stringify(acao)
      }

      const response = await fetch(API_URL, requObj);

      //ERRO
      if (!response.ok) { 
        throw new Error(
          `Erro na exclusão do produto: ${response.status} - ${response.statusText}`,
        );
      }

        const {status} = await response.json();
        
        if(status === "error"){
          throw new Error(`Erro na exclusão do produto ${status}`);
        }


      //SUCESSO
      alert("Produto exculído com sucesso!");
      //RECARREGANDO O ESTADO DOS PRODUTOS
      setProdutos((prevProdutos)=>prevProdutos.filter((p)=> p.id !== id))
     
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h2>Produtos</h2>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>

      <div>
        <table
          border={1}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>ESTOQUE</th>
              <th>AVATAR</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.preco}</td>
                <td>{produto.estoque}</td>
                <td>
                  <img src={produto.avatar} alt={produto.nome} width={40} />
                </td>
                <td>
                  <Link to={`/editar-produtos/${produto.id}`}><Editar /></Link> /
                  <Link to="#" onClick={() => handleDelete(produto.id)}><Excluir /></Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>Quantidade de registros : {produtos.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}
