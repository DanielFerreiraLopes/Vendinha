import { useEffect, useState } from "react";
import { useRouter } from "simple-react-routing";
import { getByCodigo } from "../services/clienteApi";
import FormDivida from "../divida/FormDivida";
import { getById } from "../services/dividaApi";
import Datas from "../layout/Datas";

export default function PageCliente() {
  const { pathParams } = useRouter();

  const codigo = pathParams["codigo"];

  const [cliente, setCliente] = useState();

  const [busca, setBusca] = useState("");

  const [divida, setDivida] = useState();

  useEffect(() => {
    if (codigo) {
      getByCodigo(codigo)
        .then((d) => d.json())
        .then((resultado) => setCliente(resultado));
    } else {
      setCliente({ dividas: [] });
    }
  }, []);

  const getDivida = async (id) => {
    var result = await getById(id);
    if (result.status == 200) {
      var dados = await result.json();
      setDivida(dados);
    }
  };

  return (
    cliente && (
      <>
        <div className="content">
          <h1>Dividas: {cliente.nome} </h1>
          <h3>
            CPF:{" "}
            {cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4")}
          </h3>
          <h3>Email: {cliente.email}</h3>
          <h3>
            Data de Nascimento: <Datas date={cliente.dataNascimento}></Datas>
          </h3>

          <table id="table-divida">
            <thead>
              <tr>
                <th>Valor</th>
                <th>Situacao</th>
                <th>Data de Registro</th>
                <th>Data de Pagamento</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {cliente.dividas.map((divida) => {
                return (
                  <tr onClick={() => getDivida(divida.id)} key={divida.id}>
                    <td>R$ {divida.valor}</td>
                    <td>{divida.situacao ? "Pagado" : "Não Pago"}</td>
                    <td>
                      <Datas date={divida.data}></Datas>
                    </td>
                    <td>
                      <Datas date={divida.dataPagamento}></Datas>
                    </td>
                    <td>{divida.descricao}</td>
                  </tr>
                );
              })}
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
    )
  );
}
