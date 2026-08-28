const API_URL = 'http://localhost:3000/api/produtos';

// Carregar e listar produtos da API
async function carregarProdutos() {
  try {
    const res = await fetch(API_URL);
    const produtos = await res.json();
    
    const container = document.getElementById("catalogo-produtos") || document.body;
    
    // Se houver uma div de catálogo no seu HTML, atualiza o conteúdo
    const listaExistente = document.getElementById("lista-produtos-api");
    if (listaExistente) listaExistente.remove();

    const divLista = document.createElement("div");
    divLista.id = "lista-produtos-api";
    divLista.style.marginTop = "20px";

    divLista.innerHTML = "<h2>📦 Catálogo de Produtos (API REST)</h2>";

    produtos.forEach(prod => {
      const item = document.createElement("div");
      item.style.border = "1px solid #ccc";
      item.style.padding = "10px";
      item.style.margin = "10px 0";
      item.style.borderRadius = "5px";

      item.innerHTML = `
        <h3>${prod.nome}</h3>
        <p><strong>Categoria:</strong> ${prod.categoria}</p>
        <p><strong>Preço:</strong> R$ ${Number(prod.preco).toFixed(2)}</p>
        <button onclick="deletarProduto(${prod.id})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:3px;">Excluir</button>
      `;
      divLista.appendChild(item);
    });

    container.appendChild(divLista);
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
}

// Cadastrar produto na API (POST)
async function cadastrarProduto(event) {
  if (event) event.preventDefault();
  
  const nome = prompt("Nome do Produto:");
  const preco = prompt("Preço (R$):");
  const categoria = prompt("Categoria:");

  if (!nome || !preco) return;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, preco: Number(preco), categoria })
    });
    
    carregarProdutos();
  } catch (err) {
    console.error("Erro ao cadastrar produto:", err);
  }
}

// Deletar produto na API (DELETE)
async function deletarProduto(id) {
  if (!confirm("Deseja realmente excluir este produto?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarProdutos();
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
  }
}

window.onload = carregarProdutos;