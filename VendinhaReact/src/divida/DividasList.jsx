import { useEffect, useState } from "react";
import { getById, listarDividas } from "../services/dividaApi";
import FormDivida from "./FormDivida";
import Datas from "../layout/Datas";

export default function DividasList() {
  var [dividas, setDividas] = useState([]);

  var [divida, setDivida] = useState();

  const [busca, setBusca] = useState("");

  useEffect(() => {
    listarDividas(busca).then((resposta) => {
      if (resposta.status == 200) {
        resposta.json().then((dividas) => {
          setDividas(dividas);
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
            type="button"
            onClick={() => setDivida({})}
            className="adicionar"
          >
            Adicionar Divida
          </button>
        </div>

        <table id="table-divida">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{divida.id}</td>
                <td>{divida.clienteCodigo}</td>
                <td>R${divida.valor}</td>
                <td>{divida.situacao ? "Pago" : "Não Pago"}</td>
                <td>
                  <Datas date={divida.data}></Datas>
                </td>
                <td>
                  <Datas date={divida.dataPagamento}></Datas>
                </td>
                <td>{divida.descricao}</td>
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
