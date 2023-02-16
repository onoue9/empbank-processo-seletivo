
# Processo Seletivo Empbank

Projeto desenvolvido para realizar o Processo Seletivo Empbank - Desenvolvedor Full Stack.

Onde foi proposto desenvolver uma página de controle financeiro pessoal que permite aos usuários controlar suas finanças de maneira fácil e intuitiva.

## Documentação da API

#### Rota User

| GET /                           | GET /:userId                           | POST /login | POST /register |
| :---------------------------------- | :---------------------------------- | :---------------------------------- | :---------------------------------- | 
| Retorna todos os usuários | Retorna o usuário pelo Id | Faz o login do usuário | Faz o cadastro do usuário |

#### Rota Transaction

| GET /transaction/:userId | POST /transaction/createTransaction |
| :---------------------------------- | :---------------------------------- |
| Retorna todas as transações do usuário do Id especificado | Cria uma nova transação |


## Demonstração

Tela de Login

![alt text](https://cdn.discordapp.com/attachments/851591758211055627/1075569005726797934/image.png)

Tela de Cadastro

![alt text](https://cdn.discordapp.com/attachments/851591758211055627/1075569168356753479/image.png)

Tela Wallet

![alt text](https://cdn.discordapp.com/attachments/851591758211055627/1075569375328870400/image.png)

Modal Nova Transação

![alt text](https://cdn.discordapp.com/attachments/851591758211055627/1075569470975787108/image.png)


## Instalação

Passo a passo para instalação e configuração do projeto.

## Pré-requisitos

- Node.js e NPM/Yarn instalados
- PostgreSQL instalado e configurado
- (opcional) Prisma CLI instalado globalmente

## 1. Faça o clone do repositório

SSH:
```bash
  git clone git@github.com:onoue9/empbank-tech-challenge.git
```
HTTPS:
```bash
  git clone https://github.com/onoue9/empbank-tech-challenge.git
```

## 2. Instale as dependências

Você precisará entrar em cada diretório, tanto do frontend como do backend para instalar as dependências

Frontend:
```bash
  cd frontend
  npm install
```
Backend:
```bash
  cd backend
  npm install
```

3. Crie um arquivo .env

Esse .env deverá ser criado no diretório do backend.

Temos duas variáveis de ambiente no arquivo .env, que são elas:

`DATABASE_URL` `API_PORT`

API_PORT é usada para especificar a porta que será usada pelo servidor.

E a DATABASE_URL é usada pelo prisma para fazer a integração com o bando de dados, nela são passados os dados de acesso ao seu banco de dados (usuário e senha) como no exemplo:

DATABASE_URL="postgresql://{usuário}:{senha}@localhost:5432/empbank"

Onde você irá substituir {usuário} pelo seu usuário e {senha} pela sua senha.

4. Execute as migrações do Prisma

```bash
npx prisma migrate dev
```

5. Inicie o servidor

Após ter feito a instalação das dependências e adicionados as variáveis de ambiente, agora você deverá rodar o servidor do backend para fornecer os dados pela API e o de frontend para poder visualizar a página.

Começando pelo backend:

Entre no diretório do backend e rode o servidor

```bash
  cd backend
  npm start
```

Depois entre no diretório do frontend e rode o servidor

```bash
  cd frontend
  npm start
```

## Stacks utilizadas

**Front-end:** React.js, Typescript e Mantine.

**Back-end:** NodeJs, Typescript, Express e Prisma.

**Bando de dados:** PostgresSQL

