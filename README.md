# Sistema de Gestão de Vendas — Parte 2 (Evolução Back-End)

Documentação focada exclusivamente nos aprimoramentos e novas funcionalidades implementadas na **Parte 2**, migrando a aplicação de uma estrutura Front-End estática para uma arquitetura Back-End em **Node.js** com **Programação Orientada a Objetos (POO)** e **persistência de dados em JSON**.

---

##  O que foi Aprimorado em Relação à Parte 1

### 1. Arquitetura Back-End & CLI em Node.js
- **Execução via Terminal (CLI):** Implementação do script `index.js` utilizando o módulo `readline`, permitindo interação dinâmica via terminal sem dependência do navegador.
- **Gestão do Catálogo:**
  - Cadastro interativo de novos produtos via terminal.
  - Listagem completa dos produtos cadastrados no catálogo.
  - Cálculo dinâmico e automatizado da **média de preços** de todos os produtos do catálogo.

### 2. Programação Orientada a Objetos (POO)
- **Classe Base (`Produto`):** Encapsulamento de dados e validações (impedindo preços menores ou iguais a zero).
- **Herança e Polimorfismo (`ProdutoFisico`):** Extension da classe `Produto` adicionando atributo de peso (`pesoKg`) e sobrescrevendo o método `obterResumo()` para exibir o peso junto ao preço.
- **Classe de Negócio (`Pedido`):** Gerenciamento de múltiplos produtos, calculador de valor total e vínculo com o cliente e seu endereço.

### 3. Validação de Dados e Operações Assíncronas
- **Validação de Entrada:** Tratamento estrito de exceções para preços inválidos e CEPs fora do padrão (devem possuir exatamente 8 dígitos numéricos).
- **Consumo Assíncrono da API ViaCEP:** Refatoração da busca de CEP utilizando `async/await` dentro do método `definirEnderecoPorCEP()` na classe `Pedido`.

### 4. Persistência de Dados em Arquivo JSON
- **Gravação em Arquivo (`pedidos.json`):** Utilização do módulo nativo `fs/promises` para ler, atualizar e salvar o histórico de pedidos em disco, garantindo persistência real sem perder dados entre execuções.

---

## 🛠️ Arquivos Adicionados/Aprimorados na Parte 2

- `package.json`: Configuração do ambiente e scripts Node.js.
- `classes.js`: Definição e exportação das classes (`Produto`, `ProdutoFisico`, `Pedido`), validações e integração com ViaCEP/JSON.
- `index.js`: Script principal de execução com menu interativo e chamadas dos métodos.
- `pedidos.json`: Arquivo gerado dinamicamente para armazenar a lista de pedidos em formato JSON.