# COMPASSCAR

## API de gerenciamento de carros

#### Instalação

- Requer servidor mysql

Download e instalação

```sh
git clone https://github.com/pabloemanuelpbl/ANOUT24_D01_COMPASSCAR
```

```sh
cd ANOUT24_D01_COMPASSCAR
npm install
```

### Configurar as variáveis de ambiente e realizar migrations

No arquivo .env ponha as credenciais do banco de dados

> MYSQL_HOST=localhost

> MYSQL_USER=root

> MYSQL_PASSWORD=local_password

migrations

```sh
npx knex migrate:latest
```

### Iniciar

```sh
npm start
```

### Testar a aplicação

Recomenda-se usar banco de teste

```sh
npm test
```
