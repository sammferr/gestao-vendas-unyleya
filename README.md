Markdown
# Sistema de Gestão de Vendas — Parte 3 (API REST & Padrão MVC)

Evolução do sistema de gestão de vendas para uma arquitetura Back-End robusta em **Node.js** com **Express**, organizada no padrão arquitetural **MVC (Model-View-Controller)**. A aplicação conta com **CRUD completo** de produtos, persistência de dados em arquivos JSON e integração assíncrona entre o Front-End e a API.

---

## 📁 Estrutura do Projeto (Arquitetura MVC)

```text
├── data/
│   ├── produtos.json          # Base de dados em JSON (Produtos)
│   └── pedidos.json           # Base de dados em JSON (Pedidos)
├── public/
│   ├── index.html             # Interface Web (Front-End)
│   ├── script.js              # Consumo da API via Fetch API
│   └── style.css              # Estilização da interface
├── src/
│   ├── controllers/
│   │   └── produtoController.js   # Lógica de controle e respostas HTTP
│   ├── models/
│   │   └── produtoModel.js        # Regras de negócio e operações de I/O em JSON
│   └── routes/
│       └── produtoRoutes.js       # Mapeamento dos endpoints REST
├── server.js                  # Ponto de entrada da aplicação Express
├── package.json               # Dependências do projeto (Express, Cors, Nodemon)
└── README.md                  # Documentação completa
🚀 Como Iniciar a Aplicação
Pré-requisitos
Node.js (versão 18 ou superior) instalado.

Passo a Passo
Instalar as dependências:

Bash
npm install
Iniciar o servidor em modo de desenvolvimento:

Bash
npm run dev
Acessar no navegador:

Aplicação Front-End: http://localhost:3000

Endpoint REST (JSON): http://localhost:3000/api/produtos

📡 Endpoints da API REST e Exemplos
1. Listar todos os produtos
Método: GET

URL: /api/produtos

Resposta (200 OK):

JSON
[
  {
    "id": 1,
    "nome": "Teclado Mecânico RGB",
    "preco": 250,
    "categoria": "Periféricos"
  },
  {
    "id": 2,
    "nome": "Mouse Gamer 16000 DPI",
    "preco": 120,
    "categoria": "Periféricos"
  }
]
2. Buscar produto por ID
Método: GET

URL: /api/produtos/1

Resposta (200 OK):

JSON
{
  "id": 1,
  "nome": "Teclado Mecânico RGB",
  "preco": 250,
  "categoria": "Periféricos"
}
3. Cadastrar produto
Método: POST

URL: /api/produtos

Corpo da Requisição (JSON):

JSON
{
  "nome": "Monitor Gamer 144Hz",
  "preco": 1200.00,
  "categoria": "Monitores"
}
Resposta (201 Created):

JSON
{
  "id": 1787948000000,
  "nome": "Monitor Gamer 144Hz",
  "preco": 1200,
  "categoria": "Monitores"
}
4. Atualizar produto
Método: PUT

URL: /api/produtos/1

Corpo da Requisição (JSON):

JSON
{
  "nome": "Teclado Mecânico RGB Sem Fio",
  "preco": 299.90
}
Resposta (200 OK):

JSON
{
  "id": 1,
  "nome": "Teclado Mecânico RGB Sem Fio",
  "preco": 299.9,
  "categoria": "Periféricos"
}
5. Deletar produto
Método: DELETE

URL: /api/produtos/1

Resposta (200 OK):

JSON
{
  "mensagem": "Produto removido com sucesso."
}
🔗 Link do Repositório
GitHub (Branch Unidade 3): https://github.com/sammferr/gestao-vendas-unyleya/tree/unidade-3