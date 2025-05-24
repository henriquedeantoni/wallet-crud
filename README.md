# Wallet-Crud

## Banco de Dados

Esta aplicação foi configurada para trabalhar com o banco de dados mySQL

### Banco de testes

Para execução dos testes, utilizar um banco de testes

Criaçao do banco:
```
CREATE DATABASE wallet_test_db;
```
Criação das tabelas:

```
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    tel VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upsadted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
