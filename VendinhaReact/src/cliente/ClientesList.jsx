import { useEffect, useState } from "react";
import { listarCliente } from "../services/clienteApi";
import { Link } from "simple-react-routing";

export default function ClientesList(properties) {
  const [lista, setLista] = useState([]);
  const [pesquisa, setPesquisa] = useState([]);

  useEffect(() => {
    listarCliente(pesquisa).then((resposta) => {
      if (resposta.status == 200) {
        resposta.json().then((cliente) => {
          setLista(cliente);
        });
      }
    });
  }, [pesquisa]);

  return (
    <>
      <div className="content">
        <h1>Lista de Clientes</h1>
        <div className="row">
          <input
            type="search"
            value={pesquisa}
            onChange={(event) => {
              setPesquisa(event.target.value);
            }}
            placeholder="Pesquisar..."
          />

          <Link to="/clientes/adicionar" className="button">
            Adicionar Cliente
          </Link>
        </div>

        <div className="list" id="lista_clientes">
          {lista.map((cliente) => {
            return (
              <ClienteItem key={cliente.codigo} cliente={cliente}></ClienteItem>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ClienteItem(c) {
  const cliente = c.cliente;
  var data = new Date(cliente.dataNascimento);
  var dia = data.getDate().toString().padStart(2, "0");
  var mes = (data.getMonth() + 1).toString().padStart(2, "0");
  var ano = data.getFullYear();

  return (
    <div className="card">
      <ul className="item">
        <div className="title">
          <li>
            {cliente.nome} <div className="codigo">( {cliente.codigo} )</div>
          </li>
        </div>
        <li>{cliente.cpf}</li>
        <li>{cliente.email}</li>
        <li>
          {dia}/{mes}/{ano}
        </li>
        <div className="acoes">
          <li>
            <Link to={"/clientes/editar/" + cliente.codigo} className="button">
              Editar{" "}
            </Link>
          </li>
          <li>
            <button type="button">Excluir</button>
          </li>
        </div>
      </ul>
    </div>
  );
}
