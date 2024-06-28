import { useEffect, useState } from "react";
import { getById, listarDividas } from "../services/dividaApi";
import FormDivida from "./FormDivida";
import Datas from "../assets/Datas";
import { valorDividas } from "../assets/valorDivida";

export default function DividasList() {
  var [dividas, setDividas] = useState([]);

  var [dividaDados, setDividaDados] = useState([]);

  var [divida, setDivida] = useState();

  const [busca, setBusca] = useState("");

  useEffect(() => {
    listarDividas(busca).then((resposta) => {
      if (resposta.status == 200) {
        resposta.json().then((dividas) => {
          setDividas(dividas);
          setDividaDados(dividas);
        });
      }
    });
  }, [busca]);

  const getDivida = async (id) => {
    var result = await getById(id);
    if (result.status == 200) {
      var dados = await result.json();
      setDivida(dados);
    }
  };
  return (
    <>
      <div className="content">
        <h1>Lista de Dividas</h1>
        <div className="row">
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar..."
          />
          <button
            className="add_divida"
            type="button"
            onClick={() => setDivida({})}
          >
            Adicionar Divida
          </button>
        </div>
        <div className="barra_superior">
          <div className="cont_dividas">
            <button className="todas" onClick={() => setDividas(dividaDados)}>
              Dividas Registradas: {dividaDados.length}
            </button>
            <button
              className="abertas"
              onClick={() =>
                setDividas(
                  dividaDados.filter((divida) => divida.situacao === false)
                )
              }
            >
              Todas as Dividas Abertas:{" "}
              {dividaDados.filter((divida) => divida.situacao === false).length}
            </button>
            <button
              className="fechadas"
              onClick={() =>
                setDividas(
                  dividaDados.filter((divida) => divida.situacao === true)
                )
              }
            >
              Todas as Dividas Fechadas:{" "}
              {dividaDados.filter((divida) => divida.situacao === true).length}
            </button>
            <div className="valor_total">
              Valor Total das Dividas Abertas: R$
              {valorDividas(dividaDados)}
            </div>
          </div>
        </div>

        <table id="table-divida">
          <thead>
            <tr>
              <th>Codigo_Cliente</th>
              <th>Valor</th>
              <th>Situacao</th>
              <th>Data de Registro</th>
              <th>Data de Pagamento</th>
              <th className="descricao">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {dividas.map((divida) => (
              <tr onClick={() => getDivida(divida.id)} key={divida.id}>
                <td>
                  {!divida.clienteCodigo ? "Deletado" : divida.clienteCodigo}
                </td>
                <td>R${divida.valor}</td>
                <td
                  id="situacao"
                  className={divida.situacao ? "pago" : "nao_pago"}
                >
                  {divida.situacao ? "Pago" : "Não Pago"}
                </td>
                <td>
                  <Datas date={divida.data}></Datas>
                </td>
                <td>
                  <Datas date={divida.dataPagamento}></Datas>
                </td>
                <td className="descricao">{divida.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {divida && (
        <FormDivida
          divida={divida}
          onClose={() => setDivida(undefined)}
        ></FormDivida>
      )}
    </>
  );
}
