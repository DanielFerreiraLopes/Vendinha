import { useEffect, useReducer, useState } from "react";
import { getByCodigo, postCliente } from "../services/clienteApi";
import { useNavigation, useRouter } from "simple-react-routing";

export default function FormCliente() {
  const { pathParams } = useRouter();

  const codigo = pathParams["codigo"];

  const { navigateTo } = useNavigation();

  const [errorMessage, setErrorMessage] = useState("");

  const [cliente, setCliente] = useState();

  const [email, setEmail] = useReducer((old, value) => {
    return value.toLowerCase().replaceAll(" ", "");
  }, "");

  const [cpf, setCpf] = useReducer((old, value) => {
    var digitos = value.replace(/[^0-9]+/g, "").substring(0, 11);

    if (digitos.length <= 3) return digitos;
    else if (digitos.length <= 6) {
      return digitos.replace(/(\d{3})(\d+)/, "$1.$2");
    } else if (digitos.length <= 9) {
      return digitos.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    } else {
      return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3.$4");
    }
  }, "");

  useEffect(() => {
    if (codigo) {
      getByCodigo(codigo)
        .then((d) => d.json())
        .then((result) => setCliente(result));
    } else {
      setCliente({ dividas: [] });
    }
  }, []);

  const salvarCliente = async (evento) => {
    evento.preventDefault();
    var dados = new FormData(evento.target);

    var clientedados = {
      codigo: codigo,
      nome: dados.get("nome"),
      cpf: dados.get("cpf").replaceAll(".", ""),
      email: dados.get("email"),
      dataNascimento: dados.get("dataNascimento"),
    };

    const DataAtual = new Date().getFullYear();
    const anoNascimento = new Date(clientedados.dataNascimento);
    const year = anoNascimento.getFullYear();

    if (year >= DataAtual) {
      setErrorMessage("Esta Data de Nascimento Não é Valida");
    } else {
      var resultado = await postCliente(clientedados);
      if (resultado.status == 200) {
        navigateTo(null, "/");
      } else {
        var erro = await resultado.json();
        setErrorMessage(
          "Algo deu errado no cadastro de cliente: \n" +
            JSON.stringify(erro, null, "\t")
        );
      }
    }
  };

  return (
    cliente && (
      <>
        <div className="content">
          <div className="titulo">
            <h1>{codigo ? "Editar" : "Cadastrar"} Cliente</h1>
          </div>
          <form onSubmit={salvarCliente} className="form_cliente">
            <div className="row">
              <div className="input">
                <label>Nome: </label>
                <input
                  defaultValue={cliente.nome}
                  placeholder="Nome do cliente"
                  type="text"
                  name="nome"
                  minLength="8"
                  required
                />
                <span className="error"></span>
              </div>
              <div className="input">
                <label>Data de Nascimento: </label>
                <input
                  defaultValue={cliente.dataNascimento?.substring(0, 10)}
                  type="date"
                  name="dataNascimento"
                  required
                />
                <span className="error"></span>
              </div>
            </div>

            <div className="input">
              <label>CPF: </label>
              <input
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="CPF do cliente"
                type="text"
                name="cpf"
                required
              />
              <span className="error"></span>
            </div>

            <div className="input">
              <label>Email: </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email do cliente"
                type="email"
                name="email"
                required
              />
              <span className="error"></span>
            </div>

            <input type="hidden" name="index" value="-1" />

            <button type="submit">
              {codigo ? "Atualizar Cliente" : "Cadastrar Cliente"}
            </button>
            <ul className="with-dots"></ul>
            <p className="error">{errorMessage}</p>
          </form>
        </div>
      </>
    )
  );
}
