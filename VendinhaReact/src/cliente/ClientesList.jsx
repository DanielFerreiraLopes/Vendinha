import { useEffect, useReducer, useState } from "react";
import { listarCliente } from "../services/clienteApi";
import { Link, useRouter } from "simple-react-routing";
import Datas from "../layout/Datas";

export default function ClientesList() {
  const pageId = Number(window.location.search.split("=")[1]);
  console.log(pageId);
  const [lista, setLista] = useState([]);
  const [pesquisa, setPesquisa] = useState([]);
  const page = pageId ? pageId : 1;

  useEffect(() => {
    listarCliente(pesquisa, page, 10).then((resposta) => {
      if (resposta.status == 200) {
        resposta.json().then((clientes) => {
          setLista(clientes);
        });
      }
    });
  }, [pesquisa, page]);

  const AlterPage = (page) => {
    window.location.href = window.location.pathname + "?page=" + page;
  };

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
        <div>
          <button
            type="button"
            onClick={() => AlterPage(page - 1)}
            disabled={page <= 1}
          >
            Anterior
          </button>
          <span> {page} </span>
          <button type="button" onClick={() => AlterPage(page + 1)}>
            Próximo
          </button>
        </div>
      </div>
    </>
  );
}

function ClienteItem(c) {
  const cliente = c.cliente;

  const calcularIdade = (dataNascimento) => {
    const dataAtual = new Date();
    const data = new Date(dataNascimento);
    let age = dataAtual.getFullYear() - data.getFullYear();
    const monthDifference = dataAtual.getMonth() - data.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && dataAtual.getDate() < data.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="card">
      <ul className="item">
        <div className="infos">
          <div className="title">
            <li>{cliente.nome}</li>
          </div>
          <li>
            {cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4")}
          </li>
          <li>{cliente.email}</li>
          <li>
            <Datas date={cliente.dataNascimento}></Datas> (
            {calcularIdade(cliente.dataNascimento)} Anos)
          </li>
          <li>
            Dividas Abertas:{" "}
            {
              cliente.dividas.filter((divida) => divida.situacao === false)
                .length
            }
          </li>
          <li>
            Esta Devendo: {"R$"}
            {cliente.dividas
              .filter((divida) => divida.situacao === false)
              .reduce((acc, divida) => acc + divida.valor, 0)}
          </li>
        </div>
      </ul>
      <div className="acoes">
        <ul>
          <li>
            <div className="link">
              <Link to={"/cliente/dividas/" + cliente.codigo}>Dividas </Link>
            </div>
          </li>
          <li>
            <div className="link">
              <Link to={"/clientes/editar/" + cliente.codigo}>Editar </Link>
            </div>
          </li>
          <li>
            <button type="button">Excluir</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
