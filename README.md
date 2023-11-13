# Blog Login e CRUD App

Este é um exemplo de aplicação full-stack para um blog com funcionalidade de login e operações CRUD (Create, Read, Update, Delete) utilizando MySQL, Node.js, Next.js e TypeScript.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas e dependências instaladas:

- [Node.js](https://nodejs.org/): Certifique-se de ter o Node.js instalado em sua máquina.
- [MySQL](https://www.mysql.com/): Você precisará de um servidor MySQL instalado e um banco de dados configurado.
- [Git](https://git-scm.com/): Para clonar este repositório.
- Um editor de código, como [Visual Studio Code](https://code.visualstudio.com/).

## Configuração

1. Clone este repositório:

   ```bash
   [https://github.com/DarlanSantosCarvalho/Blog-CRUD.git](https://github.com/DarlanSantosCarvalho/Blog-CRUD.git)
   ```

2. Navegue para o diretório do projeto:

   ```bash
   cd src/app
   ```

3. Instale as dependências para o servidor Node.js:

   ```bash
   cd src/app/api
   npm install
   ```

4. Configure as variáveis de ambiente no arquivo `.env` no diretório `server`. Você deve especificar as configurações do banco de dados, como host, usuário, senha e nome do banco de dados.

   ```
   DB_HOST=seu-host
   DB_USER=seu-usuario
   DB_PASSWORD=sua-senha
   DB_DATABASE=nome-do-banco-de-dados
   ```

5. Inicie o servidor Node.js:

   ```bash
   cd src/app/api
   npm run start
   ```

8. Inicie o cliente Next.js:

   ```bash
   npm run dev
   ```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Funcionalidades

- **Login:** Os usuários podem se autenticar para acessar o sistema.
- **Listagem de Postagens:** Os usuários autenticados podem visualizar uma lista de postagens existentes.
- **Criar Postagens:** Os usuários autenticados podem criar novas postagens.
- **Editar Postagens:** Os usuários autenticados podem editar postagens existentes.
- **Excluir Postagens:** Os usuários autenticados podem excluir postagens existentes.

## Tecnologias Utilizadas

- **Node.js:** Para o servidor da aplicação.
- **MySQL:** Como banco de dados.
- **Next.js:** Para a interface do cliente.
- **TypeScript:** Para tipagem estática e segurança de código.

## Contribuição

Sinta-se à vontade para contribuir, relatar problemas ou fazer melhorias neste projeto. Basta criar um fork e enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
