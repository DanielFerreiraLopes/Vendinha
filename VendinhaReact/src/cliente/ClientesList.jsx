import { useEffect, useState } from "react";
import { listarCliente } from "../services/clienteApi";
import { Link } from "simple-react-routing";
import Datas from "../layout/Datas";

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

  return (
    <div className="card">
      <ul className="item">
        <div className="title">
          <li>{cliente.nome}</li>
        </div>
        <li>
          {cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4")}
        </li>
        <li>{cliente.email}</li>
        <li>
          <Datas date={cliente.dataNascimento}></Datas>
        </li>
        <li>Total de Dividas: {cliente.dividas.length}</li>
        <div className="acoes">
          <li>
            <Link to={"/clientes/editar/" + cliente.codigo} className="button">
              Editar{" "}
            </Link>
          </li>
          <li>
            <Link to={"/cliente/dividas/" + cliente.codigo} className="button">
              Dividas{" "}
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
