CREATE DATABASE livraria;

USE livraria;

CREATE TABLE livros(
	id varchar(60) PRIMARY KEY,
    titulo varchar(255) not null,
    autor varchar(255) not null,
    ano_publicacao year(4) not null,
    genero varchar(255) not null,
    preco decimal(10, 2) not null,
    disponibilidade boolean,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);
