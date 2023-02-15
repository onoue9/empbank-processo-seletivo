
# Cashforce Tech Challenge

Projeto desenvolvido para realizar o teste prático da Cashforce para vaga de Fullstack Node/Vue.js Developer - Júnior [Remoto, Brasil].

Onde nele criei uma API em Node utilizando express e sequelize, conectando-se a um [banco de dados](https://gist.githubusercontent.com/Allan96/a3538e88600559587155a01b0330124e/raw/c7ad85e464dca320fbf54b5e84fb1dd79a888511/teste.sql).

Depois a criação da API, construí uma tela baseando-se no [Figma](https://www.figma.com/file/NY1fe6PAZ6DKeD9eOzyrju/Teste-Cashfroce?node-id=0%3A1) disponibilizado, utilizando Vue.JS como framework, consultando a API que criei e exibindo os dados retornados por ela.


## Documentação da API

#### Retorna todos os orders

```http
  GET /orders
```

| Descrição                           |
| :---------------------------------- |
| Retorna todos os orders |


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

