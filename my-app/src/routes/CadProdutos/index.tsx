import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProduto } from "../../types/types";

const API_URL = import.meta.env.VITE_API_URL;

export default function CadProdutos() {
  // Para alterar o título da página:
  document.title = "Cadastrar Produtos";

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<TipoProduto>({ id: "", nome: "", preco: 0, estoque: 0, avatar: "" });


  const onSubmit = async () => {
    try {

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(produto)
      });

      //ERRO
      if (!response.ok) {
        throw new Error(
          `Erro no cadastro do produto: ${response.status} - ${response.statusText}`,
        );
      }
      
        const {status} = await response.json();
        
        if(status === "error"){
          throw new Error(`Erro no cadastro do produto ${status}`);
        }

      //SUCESSO
      alert("Produto cadastrado com sucesso!");
      //REDIRECT
      navigate("/produtos");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h2>Cadastrar Produtos</h2>
      <h1>{id}</h1>
      <div>
        <form>
          <fieldset>
            <legend>Dados do produto:</legend>
            <div>
              <label htmlFor="nome">Nome do produto </label>
              <input type="text" name="nome" id="nome" value={produto.nome} onChange={(e) => setProduto({ ...produto, nome: e.target.value })} />
            </div>
            <div>
              <label htmlFor="preco">Preço do produto </label>
              <input type="number" step={0.1} name="preco" id="preco" value={produto.preco} onChange={(e) => setProduto({ ...produto, preco: parseFloat(e.target.value) })} />
            </div>
            <div>
              <label htmlFor="estoque">Estoque do produto </label>
              <input type="number" step={1} name="estoque" id="estoque" value={produto.estoque} onChange={(e) => setProduto({ ...produto, estoque: parseFloat(e.target.value) })} />
            </div>
            <div>
              <label htmlFor="avatar">Descrição do produto </label>
              <input type="text" name="avatar" id="avatar" value={produto.avatar} onChange={(e) => setProduto({ ...produto, avatar: e.target.value })} />
            </div>
            <div>
              <label htmlFor="avatar">Avatar do produto </label>
              <figure>
                <img src={produto.avatar} alt={produto.nome} />
              </figure>
            </div>
            <div>
              <button type="button" onClick={() => onSubmit()}>CADASTRAR</button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
