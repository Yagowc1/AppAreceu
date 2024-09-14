CREATE DATABASE appareceu;

use appareceu;

CREATE TABLE administrador (
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(250) UNIQUE,
    senha VARCHAR(250),
    adm BOOLEAN DEFAULT (TRUE)
);

CREATE TABLE aluno (
	matricula VARCHAR(14) PRIMARY KEY,
    nome VARCHAR(250),
    email VARCHAR(250) UNIQUE,
    senha VARCHAR(250),
    adm BOOLEAN DEFAULT (FALSE)
);

CREATE TABLE item (
	id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(14),
    nome VARCHAR(250),
    descricao VARCHAR(250),
    categoria VARCHAR(250),
    status_obj VARCHAR(100),
    imagem VARCHAR(500),
    
    FOREIGN KEY (matricula) REFERENCES aluno(matricula)
);