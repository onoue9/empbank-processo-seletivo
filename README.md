
# Empbank Tech Challenge

Projeto desenvolvido para realizar o Processo Seletivo Empbank - Desenvolvedor Full Stack.

Onde foi proposto desenvolver uma página de controle financeiro pessoal que permite aos usuários controlar suas finanças de maneira fácil e intuitiva.

## Documentação da API

#### Rota User

| GET /                           | GET /:userId                           | POST /login | POST /register |
| :---------------------------------- | :---------------------------------- | :---------------------------------- | :---------------------------------- | 
| Retorna todos os usuários | Retorna o usuário pelo Id | Faz o login do usuário | Faz o cadastro do um usuário |


## Demonstração

Tela proposta

![alt text](https://cdn.discordapp.com/attachments/851591758211055627/1060218940904710214/image.png)


## Instalação

Faça o clone do repositório

SSH:
```bash
  git clone git@github.com:onoue9/cashforce-tech-challenge.git
```
HTTPS:
```bash
  git clone https://github.com/onoue9/cashforce-tech-challenge.git
```

Após o clone, você precisará entrar em cada diretório, tanto do frontend como do backend para instalar as dependências

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
    
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DB_HOST` `DB_PORT` `DB_USER` `DB_PASS` `DB_NAME` `API_PORT`


## Rodando localmente

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
  npm run serve
```
## Stacks utilizadas

**Front-end:** Vue.js

**Back-end:** Node, Express, Sequelize

