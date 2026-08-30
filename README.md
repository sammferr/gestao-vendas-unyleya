# 🛒 Marketplace API — Sistema de Gestão de Vendas
> **Atividade 4 (Final)** — Disciplina Backend
> **Desenvolvedor:** José Samuel Ferreira da Silva  
> **Repositório:** [github.com/sammferr/gestao-vendas-unyleya](https://github.com/sammferr/gestao-vendas-unyleya/tree/unidade-4)  
> **Vídeo de Demonstração:** [Assista no YouTube](https://youtu.be/mcGD-c0JkY0)

---

## Sobre o Projeto

A **Marketplace API** é uma solução completa de backend para comércio eletrônico desenvolvida com **Node.js**, **Express** e **MongoDB Atlas**. A aplicação adota uma arquitetura em camadas estruturada com os padrões **MVC + Services**, garantindo isolamento de responsabilidades, validações de regras de negócio, persistência de dados em nuvem, controle de acesso baseado em perfis (RBAC) com **JWT** e documentação interativa com **Swagger (OpenAPI 3.0)**.

---

## Vídeo de Apresentação

Confira a demonstração completa da arquitetura do projeto e o teste dos endpoints no Swagger UI:
👉 **[Assistir no YouTube (https://youtu.be/mcGD-c0JkY0)](https://youtu.be/mcGD-c0JkY0)**

---

## Tecnologias Utilizadas

* **Runtime:** Node.js (v18+)
* **Framework Web:** Express.js
* **Banco de Dados:** MongoDB Atlas (Nuvem)
* **ODM:** Mongoose
* **Autenticação & Segurança:** JSON Web Tokens (JWT) e Bcrypt.js (hash de senhas)
* **Documentação:** Swagger UI Express & Swagger JSDoc (OpenAPI 3.0)
* **Testes de API:** Thunder Client (Coleção inclusa no projeto)
* **Desenvolvimento:** Nodemon & Dotenv

---

## 📂 Arquitetura do Projeto

```text
gestao-vendas-unyleya/
├── src/
│   ├── config/
│   │   ├── db.js             # Conexão com MongoDB Atlas
│   │   └── swagger.js        # Configuração OpenAPI 3.0
│   ├── controllers/
│   │   ├── authController.js     # Gerenciamento de login/registro
│   │   ├── categoryController.js # Controle de categorias
│   │   ├── productController.js  # Controle de produtos
│   │   ├── cartController.js     # Controle do carrinho
│   │   └── orderController.js    # Controle de pedidos
│   ├── middlewares/
│   │   └── authMiddleware.js # Validação de token JWT e permissões por role
│   ├── models/
│   │   ├── User.js           # Schema de Usuários
│   │   ├── Category.js       # Schema de Categorias
│   │   ├── Product.js        # Schema de Produtos
│   │   ├── Cart.js           # Schema de Carrinho de Compras
│   │   └── Order.js          # Schema de Pedidos
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   └── services/
│       ├── cartService.js    # Regras de negócio e totais do carrinho
│       └── orderService.js   # Regras de checkout e controle atômico de estoque
├── .env.example              # Modelo de variáveis de ambiente
├── .gitignore
├── package.json
├── server.js                 # Ponto de entrada da aplicação
├── thunder-collection_gestao_vendas.json # Coleção de testes para Thunder Client
└── README.md
📑 Principais Funcionalidades & Endpoints
A documentação interativa completa fica disponível na rota /api-docs.

1. Autenticação (/api/auth)
POST /api/auth/registrar — Criação de novo usuário com senha criptografada via bcryptjs.

POST /api/auth/login — Autenticação de credenciais e geração do token JWT.

GET /api/auth/perfil — Consulta dos dados do usuário autenticado (Rota Protegida).

2. Categorias (/api/categorias)
GET /api/categorias — Listagem geral de categorias.

POST /api/categorias — Cadastro de categoria (Apenas Admin).

DELETE /api/categorias/{id} — Exclusão de categoria (Apenas Admin).

3. Produtos (/api/produtos)
GET /api/produtos — Consulta paginada de produtos com categorias populadas (populate).

POST /api/produtos — Cadastro de novo produto com saldo de estoque e preço (Apenas Admin).

4. Carrinho de Compras (/api/carrinho)
GET /api/carrinho — Retorna o carrinho do usuário com cálculo automático do valor total.

POST /api/carrinho/adicionar — Adiciona produto com validação prévia de estoque.

DELETE /api/carrinho/remover/{produtoId} — Remove item específico do carrinho.

5. Pedidos & Checkout (/api/pedidos)
POST /api/pedidos — Checkout: converte o carrinho em pedido, debita o estoque dos produtos e limpa o carrinho.

GET /api/pedidos/meus-pedidos — Histórico de pedidos do usuário autenticado.

GET /api/pedidos — Listagem global de todos os pedidos da plataforma (Apenas Admin).

PATCH /api/pedidos/{id}/status — Atualização de status do pedido (pendente, pago, enviado, entregue, cancelado) (Apenas Admin).

⚙️ Como Executar o Projeto Localmente
Pré-requisitos
Node.js instalado (v18+)

Cluster MongoDB Atlas configurado

Passo a Passo
Clone o repositório:

Bash
git clone -b unidade-4 [https://github.com/sammferr/gestao-vendas-unyleya.git](https://github.com/sammferr/gestao-vendas-unyleya.git)
cd gestao-vendas-unyleya
Instale as dependências:

Bash
npm install
Configure as Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto seguindo o modelo:

Snippet de código
PORT=3000
MONGO_URI=sua_string_de_conexao_mongodb_atlas
JWT_SECRET=sua_chave_secreta_jwt
Inicie o servidor de desenvolvimento:

Bash
npm run dev
Acesse a documentação:
Abra o navegador em http://localhost:3000/api-docs para testar todos os endpoints interativamente.

🧪 Testes Manuais com Thunder Client
Na raiz do projeto está disponível o arquivo thunder-collection_gestao_vendas.json. Para utilizá-lo:

Abra a extensão Thunder Client no VS Code;

Vá na aba Collections > Import;

Selecione o arquivo exportado para carregar todas as requisições pré-configuradas.

