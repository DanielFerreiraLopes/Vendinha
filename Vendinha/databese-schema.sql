create sequence clientes_seq;
create sequence dividas_seq;

create table clientes(
	codigo integer not null default nextval('clientes_seq'),
	nome varchar(100),
	cpf varchar(11),
	datanascimento date,
	email varchar(200),
	primary key (codigo)
);

create table dividas(
	id integer not null default nextval('dividas_seq'),
	clientecodigo integer,
	valor decimal(8,2),
	situacao bool,
	data timestamp default now(),
	datapagamento date not null,
	descricao text,
	primary key (id)
);

alter table dividas
add constraint fk_dividas_cliente foreign key (clientecodigo)
references clientes(codigo);

select * from clientes;
select * from dividas;

	