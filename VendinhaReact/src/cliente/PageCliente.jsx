import { useEffect, useState } from "react";
import { useRouter } from "simple-react-routing";
import { dividasCliente, getByCodigo } from "../services/clienteApi";
import FormDivida from "../divida/FormDivida";
import { getById, listarDividas } from "../services/dividaApi";
import Datas from "../assets/Datas";
import { valorDividas } from "../assets/valorDivida";

export default function PageCliente() {
  const { pathParams } = useRouter();

  const codigo = pathParams["codigo"];

  const [cliente, setCliente] = useState();

  const [dados, setDados] = useState([]);

  const [dividas, setDividas] = useState([]);

  var [divida, setDivida] = useState();

  console.log(codigo);

  useEffect(() => {
    getByCodigo(codigo)
      .then((d) => d.json())
      .then((resultado) => setCliente(resultado));
  });

  useEffect(() => {
    dividasCliente(codigo)
      .then((d) => d.json())
      .then((resultado) => {
        setDividas(resultado);
        setDados(resultado);
      });
  }, []);

  const getDivida = async (id) => {
    var result = await getById(id);
    if (result.status == 200) {
      var dados = await result.json();
      setDivida(dados);
    }
  };

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
    cliente && (
      <>
        <div className="content">
          <h1>Dividas: {cliente.nome} </h1>

          <h3>Codigo: {cliente.codigo}</h3>
          <h3>
            CPF:{" "}
            {cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4")}
          </h3>
          <h3>Email: {cliente.email}</h3>
          <h3>
            Data de Nascimento: <Datas date={cliente.dataNascimento}></Datas> :{" "}
            {calcularIdade(cliente.dataNascimento)} Anos
          </h3>
          <div className="cont_dividas">
            <button className="todas" onClick={() => setDividas(dados)}>
              Dividas Registradas: {dados.length}
            </button>
            <button
              className="abertas"
              onClick={() =>
                setDividas(dados.filter((divida) => divida.situacao === false))
              }
            >
              Todas as Dividas Abertas:{" "}
              {dados.filter((divida) => divida.situacao === false).length}
            </button>
            <button
              className="fechadas"
              onClick={() =>
                setDividas(dados.filter((divida) => divida.situacao === true))
              }
            >
              Todas as Dividas Fechadas:{" "}
              {dados.filter((divida) => divida.situacao === true).length}
            </button>
            <div className="valor_total">
              Esta Devendo: R$
              {valorDividas(cliente.dividas)}
            </div>
          </div>
          <table id="table-divida">
            <thead>
              <tr>
                <th>Valor</th>
                <th>Situacao</th>
                <th>Data de Registro</th>
                <th>Data de Pagamento</th>
                <th className="descricao">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {dividas.map((divida) => {
                return (
                  <tr onClick={() => getDivida(divida.id)} key={divida.id}>
                    <td>R$ {divida.valor}</td>
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
