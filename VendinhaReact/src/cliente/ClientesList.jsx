import { useEffect, useReducer, useState } from "react";
import {
  listarCliente,
  getByCodigo,
  deletarCliente,
} from "../services/clienteApi";
import { Link, useRouter } from "simple-react-routing";
import Datas from "../assets/Datas";
import { valorDividas } from "../assets/valorDivida";
import DeleteCliente from "./DeleteCliente";
import { listarDividas } from "../services/dividaApi";

export default function ClientesList() {
  const [pesquisa, setPesquisa] = useState("");

  const [lista, setLista] = useState([]);

  const [page, setPage] = useState(1);

  const [dividas, setDividas] = useState([]);

  useEffect(() => {
    listarCliente(pesquisa, page, 10).then((resposta) => {
      if (resposta.status == 200) {
        resposta.json().then((clientes) => {
          setLista(clientes);
        });
      }
    });
  }, [pesquisa, page]);

  useEffect(() => {
    listarDividas().then((resposta) => {
      if (resposta.status == 200) {
        resposta.json().then((dividas) => {
          setDividas(dividas);
        });
      }
    });
  });

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
          <div id="addcliente" className="link">
            <Link to="/clientes/adicionar" className="button">
              Adicionar Cliente
            </Link>
          </div>
        </div>

        <div className="list" id="lista_clientes">
          {lista.map((cliente) => {
            return (
              <ClienteItem key={cliente.codigo} cliente={cliente}></ClienteItem>
            );
          })}
        </div>
        <div className="barra_inferior">
          <div className="paginacao">
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Pagina Anterior
            </button>
            <span> {page} </span>
            <button type="button" onClick={() => setPage(page + 1)}>
              Próximo Pagina
            </button>
          </div>
          <div className="contagem_dividas">
            <div className="somadividas">
              Dividas Abertas:{" "}
              {dividas.filter((d) => d.situacao == false).length}
            </div>
            <div className="somadividas">
              Valor Total das Dividas: R$
              {valorDividas(dividas)}
            </div>
          </div>
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

  const deleteCliente = async (codigo) => {
    var result = await deletarCliente(codigo);
    if (result.status == 200) {
      window.location.reload();
    }
  };

  return (
    <div className="card">
      <ul className="item">
        <div className="infos">
          <div className="title">
            <li>{cliente.nome}</li>
          </div>
          <li>Código: {cliente.codigo}</li>
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
            {valorDividas(cliente.dividas)}
          </li>
        </div>
      </ul>
      <div className="acoes">
        <ul>
          <li className="link">
            <div>
              <a href={"cliente/dividas/" + cliente.codigo}>
                Dividas do Cliente{" "}
              </a>
            </div>
          </li>
          <div className="botoes">
            <li className="link">
              <div className="">
                <Link to={"/clientes/editar/" + cliente.codigo}>Editar </Link>
              </div>
            </li>
            <li>
              <button
                className="excluir"
                onClick={() => deleteCliente(cliente.codigo)}
              >
                Excluir
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
