// 1. CATÁLOGO DE PRODUTOS (Array de Objetos)
const produtos = [
  { nome: "Teclado Mecânico", preco: 250.00, categoria: "Periféricos" },
  { nome: "Mouse Gamer", preco: 120.00, categoria: "Periféricos" },
  { nome: "Monitor 24 Polegadas", preco: 850.00, categoria: "Monitores" },
  { nome: "Cadeira Ergonômica", preco: 650.00, categoria: "Móveis" }
];

// Exibe os produtos dinamicamente na tela
function renderizarProdutos() {
  const container = document.getElementById("catalogo-produtos");
  container.innerHTML = "";

  produtos.forEach(prod => {
    const card = document.createElement("div");
    card.className = "produto-item";
    card.innerHTML = `
      <h3>${prod.nome}</h3>
      <p class="categoria">Categoria: ${prod.categoria}</p>
      <p class="preco">R$ ${prod.preco.toFixed(2)}</p>
    `;
    container.appendChild(card);
  });
}

// 2. CALCULADORA DE DESCONTO
function calcularDesconto() {
  const valor = parseFloat(document.getElementById("valor-venda").value);
  const desconto = parseFloat(document.getElementById("porcentagem-desconto").value);
  const campoResultado = document.getElementById("resultado-desconto");

  if (isNaN(valor) || isNaN(desconto) || valor <= 0) {
    campoResultado.innerHTML = "<span style='color:red;'>Preencha os valores corretamente.</span>";
    return;
  }

  const valorDesconto = (valor * desconto) / 100;
  const valorFinal = valor - valorDesconto;

  campoResultado.innerHTML = `
    <p>Desconto: <strong>R$ ${valorDesconto.toFixed(2)}</strong></p>
    <p>Valor Final: <strong>R$ ${valorFinal.toFixed(2)}</strong></p>
  `;
}

// 3. CONSUMO DA API VIA CEP
async function buscarCEP() {
  const cepInput = document.getElementById("cep").value.replace(/\D/g, '');

  if (cepInput.length !== 8) {
    alert("Por favor, digite um CEP válido com 8 dígitos.");
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado.");
      return;
    }

    document.getElementById("logradouro").textContent = data.logradouro || "N/A";
    document.getElementById("bairro").textContent = data.bairro || "N/A";
    document.getElementById("cidade-uf").textContent = `${data.localidade}/${data.uf}`;
  } catch (error) {
    alert("Erro ao buscar o CEP. Tente novamente.");
    console.error(error);
  }
}

// Inicializa o catálogo ao carregar a página
window.onload = renderizarProdutos;