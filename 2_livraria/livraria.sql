CREATE DATABASE funcionarios;

USE funcionarios;
/*id, nome, cargo, data_contratacao, salario, email, created_at, updated_at */
CREATE TABLE funcionario(
	id varchar(255) not null,
    nome varchar(255) not null,
    data_contratacao date not null,
    salario varchar(255) not null,
    email varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

ALTER TABLE funcionario ADD COLUMN cargo varchar(255) not null;
