import type {
  TipoProduto,
  TipoProdutoForm,
  TipoRespostaApi,
} from "../types/types";
const API_URL = import.meta.env.VITE_API_URL;

function validarUrl() {
  if (!API_URL) {
    throw new Error("VITE_API_URL não foi configurada no arquivo .env");
  }
}

async function lerResposta<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }
  const resultado: TipoRespostaApi<T> = await response.json();
  if (resultado.status === "error") {
    throw new Error(resultado.message || "Erro informado pela API");
  }

  if (resultado.data === undefined) {
    throw new Error("A API não devolveu o campo data");
  }
  return resultado.data;
  
}

export async function listarProdutos(): Promise<TipoProduto[]> {
  validarUrl();
  const response = await fetch(API_URL, {
    method: "GET",
    redirect: "follow",
  });
  return lerResposta<TipoProduto[]>(response);
}
export async function buscarProdutoPorId(id: string,): Promise<TipoProduto> {
  validarUrl();

  const url = `${API_URL}?id=${encodeURIComponent(id)}`;
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
  });
  return lerResposta<TipoProduto>(response);
}


  async function enviarAcao<T>(body: object): Promise<T> {
  validarUrl();
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(body),
    redirect: "follow",
  });
  return lerResposta<T>(response);
}
export function cadastrarProduto(
  dados: TipoProdutoForm,
): Promise<TipoProduto> {
  return enviarAcao<TipoProduto>({
    action: "POST",
    ...dados,
  });
}
export function atualizarProduto(
  produto: TipoProduto,
): Promise<TipoProduto> {
  return enviarAcao<TipoProduto>({
    action: "PUT",
    ...produto,
  });
}
export function excluirProduto(
  id: string,
): Promise<{ id: string }> {
  return enviarAcao<{ id: string }>({
    action: "DELETE",
    id,
  });
}