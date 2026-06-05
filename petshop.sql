use petshop;

create table tutores(
	ID_tutor int auto_increment primary key,
	nome varchar (150) not null,
	cpf varchar (150)
);

create table pets(
	ID_pets int auto_increment primary key,
    nome varchar(150) not null,
    especie varchar(150),
    idade int,
    sexo ENUM('Macho', 'Femea', 'Indefinido'),
    ID_tutor int, foreign key (ID_tutor) references tutores(ID_tutor)
);

create table agendamento(
	ID_agendamento int auto_increment primary key,
    data date,
    horario time,
    ID_pets int, foreign key (ID_pets) references pets(ID_pets),
    ID_admin int, foreign key (ID_admin) references administrador(ID_admin)
);

create table administrador(
	ID_admin int auto_increment primary key,
    email varchar(200),
    nome varchar(150),
    senha varchar(150)
);







