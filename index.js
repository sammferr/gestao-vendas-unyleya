const readline = require('readline');
const { Produto, ProdutoFisico, Pedido } = require('./classes');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

const catalogo = [
  new ProdutoFisico("Teclado Mecânico RGB", 250.00, "Periféricos", 0.8),
  new ProdutoFisico("Mouse Gamer 16000 DPI", 120.00, "Periféricos", 0.2),
  new Produto("Licença Antivírus", 99.90, "Digital")
];

function calcularMediaPrecos(listaProdutos) {
  if (listaProdutos.length === 0) return 0;
  const soma = listaProdutos.reduce((acc, p) => acc + p.preco, 0);
  return soma / listaProdutos.length;
}

async function menu() {
  console.log("\n==========================================");
  console.log("   SISTEMA DE GESTÃO DE VENDAS - NODE.JS");
  console.log("==========================================\n");

  console.log("📦 CATÁLOGO DE PRODUTOS:");
  catalogo.forEach((p, idx) => console.log(` ${idx + 1}. ${p.obterResumo()}`));

  const media = calcularMediaPrecos(catalogo);
  console.log(`\n📊 Média de preços do catálogo: R$ ${media.toFixed(2)}\n`);

  console.log("➕ CADASTRO DE NOVO PRODUTO:");
  const nome = await askQuestion(" Nome do produto: ");
  const precoStr = await askQuestion(" Preço (R$): ");
  const categoria = await askQuestion(" Categoria: ");

  try {
    const novoProd = new Produto(nome, parseFloat(precoStr), categoria);
    catalogo.push(novoProd);
    console.log("✅ Produto cadastrado com sucesso!");
  } catch (err) {
    console.log(`❌ Falha ao cadastrar produto: ${err.message}`);
  }

  console.log("\n🛒 CRIAÇÃO DE PEDIDO:");
  const cliente = await askQuestion(" Nome do Cliente: ");
  const cep = await askQuestion(" Digite o CEP de entrega (somente números): ");

  const novoPedido = new Pedido(cliente, [catalogo[0], catalogo[catalogo.length - 1]]);

  try {
    console.log("⏳ Buscando endereço via API ViaCEP...");
    await novoPedido.definirEnderecoPorCEP(cep);
    console.log("📍 Endereço confirmado:", novoPedido.enderecoEntrega);

    await novoPedido.salvarEmJSON();
  } catch (err) {
    console.log(`❌ Erro no pedido: ${err.message}`);
  }

  rl.close();
}

menu();