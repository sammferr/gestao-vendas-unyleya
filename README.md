Sistema de Gestão de Vendas - Parte 1

Aplicação web desenvolvida para auxiliar pequenos comerciantes na gestão básica de vendas, cálculo de descontos e consulta automática de endereço para entrega.

Estrutura do Projeto

- `index.html`: Estrutura HTML5 da página web.
- `style.css`: Estilização e layout responsivo.
- `script.js`: Lógica em JavaScript (Renderização do catálogo, cálculo de desconto e integração com a API ViaCEP).

Como Rodar o Sistema

1. Baixe os arquivos do repositório ou clone o projeto.
2. Abra o arquivo `index.html` em qualquer navegador web (Google Chrome, Firefox, Edge) ou utilize a extensão **Live Server** no VS Code.
3. Link do vídeo da Atividade: [Youtube](https://youtu.be/g1uwwM-BRl4)

Funcionalidades Implementadas

- **Catálogo de Produtos:** Listagem dinâmica de produtos a partir de um array de objetos contendo nome, preço e categoria.
- **Calculadora de Desconto:** Aplicação de descontos em porcentagem sobre o valor da venda com atualização do preço final em tempo real.
- **Consumo de API Externa (ViaCEP):** Preenchimento automático do endereço de entrega a partir do CEP informado pelo cliente.