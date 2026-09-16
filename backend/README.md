# Projeto DSW – Autenticação com Node.js

## 1. Objetivo do projeto

Este projeto tem como objetivo desenvolver uma API de autenticação utilizando Node.js e Express, com cadastro de usuários, login, criptografia de senhas, autenticação por token JWT e controle de acesso para usuários administradores.

O projeto faz parte da disciplina de Desenvolvimento de Sistemas Web (DSW).

---

## 2. Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- MySQL
- bcrypt
- JSON Web Token (JWT)
- CORS
- dotenv
- Nodemon
- Insomnia

---

## 3. Estrutura de pastas

```text
backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── prismaClient.js
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 4. Configuração do projeto

Para executar o projeto, é necessário possuir o Node.js instalado e configurar as variáveis de ambiente no arquivo `.env`.

A aplicação utiliza uma variável `DATABASE_URL` para a conexão com o banco de dados e uma variável `JWT_SECRET` para a criação e validação dos tokens JWT.

As dependências do projeto são instaladas utilizando:

```bash
npm install
```

---

## 5. Como executar o projeto

Para iniciar o servidor em modo de desenvolvimento, utilize:

```bash
npm run dev
```

O servidor será executado, por padrão, em:

```text
http://localhost:3000
```

Também é possível verificar se a API está funcionando através da rota:

```text
GET /health
```

---

## 6. Banco de dados

O projeto utiliza o Prisma ORM para comunicação com o banco de dados.

As alterações do banco de dados são controladas através das migrations do Prisma.

Para executar as migrations, utilize:

```bash
npx prisma migrate dev
```

O banco possui a tabela de usuários com os seguintes dados principais:

- `id`
- `name`
- `email`
- `password`
- `role`
- `createdAt`
- `updatedAt`

O campo `role` define o nível de acesso do usuário, podendo ser `USER` ou `ADMIN`.

---

## 7. Como rodar o seed

O projeto possui um seed do Prisma para criar usuários de teste no banco de dados.

Para executar o seed, utilize:

```bash
npm run prisma:seed
```

O seed cria dois usuários:

- Usuário comum (`USER`)
- Usuário administrador (`ADMIN`)

Ambos utilizam a senha de teste:

```text
123456
```

---

## 8. Autenticação e controle de acesso

As senhas dos usuários não são armazenadas diretamente no banco de dados. Antes do armazenamento, elas são criptografadas utilizando a biblioteca bcrypt.

Durante o login, a senha informada é comparada com a senha criptografada armazenada no banco.

Quando o login é realizado corretamente, a API gera um token JWT.

As rotas privadas utilizam o `authMiddleware`, responsável por verificar se o token foi informado e se é válido.

O `adminMiddleware` realiza uma segunda verificação para permitir o acesso às rotas administrativas somente para usuários com a função `ADMIN`.

Os principais códigos de resposta utilizados são:

- `200` – Requisição realizada com sucesso
- `201` – Cadastro realizado com sucesso
- `400` – Dados obrigatórios não informados
- `401` – Usuário não autenticado ou token inválido
- `403` – Usuário autenticado, mas sem permissão
- `409` – Email já cadastrado
- `500` – Erro interno do servidor

---

## 9. Rotas da API

### Cadastro de usuário

**POST `/usuarios`**

Realiza o cadastro de um novo usuário.

Exemplo de dados enviados:

```json
{
  "name": "Usuario Teste",
  "email": "teste@teste.com",
  "password": "123456"
}
```

A senha é criptografada com bcrypt antes de ser armazenada no banco de dados.

---

### Login

**POST `/login`**

Realiza a autenticação do usuário.

Exemplo:

```json
{
  "email": "teste@teste.com",
  "password": "123456"
}
```

Quando o login é realizado corretamente, a API retorna um token JWT.

---

### Perfil

**GET `/perfil`**

É uma rota privada e exige um token JWT válido.

O token deve ser enviado no cabeçalho `Authorization` utilizando o formato:

```text
Bearer TOKEN
```

Sem um token válido, o acesso é bloqueado.

---

### Área administrativa

**GET `/admin`**

É uma rota privada destinada somente aos usuários com função `ADMIN`.

Além de possuir um token JWT válido, o usuário precisa ter a função administrativa.

Um usuário comum recebe:

```text
403 Forbidden
```

ao tentar acessar essa rota.

---

### Saúde da API

**GET `/health`**

Verifica se a API está funcionando corretamente.

Resposta esperada:

```json
{
  "status": "ok",
  "message": "API funcionando"
}
```

---

## 10. Testes realizados no Insomnia

As rotas da API foram testadas utilizando o Insomnia.

Foram realizados testes de:

- Cadastro de usuário
- Login com dados corretos
- Login com senha incorreta
- Acesso ao perfil com token válido
- Acesso ao perfil sem token
- Acesso ao perfil com token inválido
- Acesso à área administrativa com usuário comum
- Acesso à área administrativa com usuário administrador
- Cadastro utilizando email já existente
- Cadastro sem informar todos os campos
- Verificação do funcionamento da API

Os testes confirmam o funcionamento da autenticação, da validação do token JWT e do controle de acesso entre usuários comuns e administradores.

---

## 11. Fluxo de funcionamento

O funcionamento principal da API segue o seguinte fluxo:

```text
Cadastro
   ↓
Senha criptografada com bcrypt
   ↓
Usuário armazenado no banco
   ↓
Login
   ↓
Validação da senha
   ↓
Geração do token JWT
   ↓
Envio do token nas rotas privadas
   ↓
authMiddleware valida o token
   ↓
Verificação da permissão
   ↓
Acesso ao perfil ou à área administrativa
```

Usuários comuns possuem a função `USER` e podem acessar as rotas privadas permitidas.

Usuários administradores possuem a função `ADMIN` e podem acessar também as rotas administrativas.

---

## 12. Usuários de teste

O seed disponibiliza os seguintes usuários para testes:

### Usuário comum

```text
Email: aluno@email.com
Senha: 123456
Função: USER
```

### Administrador

```text
Email: admin@email.com
Senha: 123456
Função: ADMIN
```

Esses usuários são utilizados para testar as diferenças de acesso entre um usuário comum e um administrador.