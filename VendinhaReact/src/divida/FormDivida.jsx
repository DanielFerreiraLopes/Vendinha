import { useState } from "react";
import { postDivida } from "../services/dividaApi";

export default function FormDivida({ divida, onClose }) {
  const [errorMessage, setErrorMessage] = useState();

  const [checkboxSituacao, setCheckboxSituacao] = useState(
    divida.situacao || false
  );
  const salvarDivida = async (evento) => {
    evento.preventDefault();
    var dados = new FormData(evento.target);

    var dividaDados = {
      clienteCodigo: Number(dados.get("clienteCodigo")),
      valor: Number(dados.get("valor")),
      dataPagamento: dados.get("dataPagamento"),
      situacao: checkboxSituacao,
      descricao: dados.get("descricao"),
      id: divida.id,
    };

    var result = await postDivida(dividaDados);
    if (result.status == 200) {
      onClose();
    } else {
      var error = await result.json();
      setErrorMessage(
        "Houve erro ao registrar a divida: \n" +
          JSON.stringify(error, null, "\t")
      );
    }
  };

  return (
    <div className="modal">
      <form onSubmit={salvarDivida}>
        <div className="formulario">
          <div className="row">
            <div className="input">
              <label>Codigo do Cliente</label>
              <input
                defaultValue={divida.clienteCodigo}
                placeholder="Codigo do cliente"
                type="number"
                name="clienteCodigo"
              />
              <span className="error"></span>
            </div>
          </div>

          <div className="input">
            <label>Valor</label>
            <input
              defaultValue={divida.valor}
              type="number"
              name="valor"
              step={0.01}
            />
            <span className="error"></span>
          </div>

          <div className="input">
            <label>Situacao</label>
            <input
              onChange={() => setCheckboxSituacao(!checkboxSituacao)}
              checked={checkboxSituacao}
              type="checkbox"
              name="situacao"
            />
          </div>

          <div className="input">
            <label>Data de Pagamento</label>
            <input
              defaultValue={divida.dataPagamento?.substring(0, 10)}
              type="date"
              name="dataPagamento"
            />
            <span className="error"></span>
          </div>
          <div className="input">
            <label>Descrição</label>
            <textarea
              defaultValue={divida.descricao}
              placeholder="Descrição de divida"
              name="descricao"
            ></textarea>
            <span className="error"></span>
          </div>
          <p className="error">{errorMessage}</p>
        </div>
        <div className="acoes">
          <button type="reset" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit">Novo divida</button>
        </div>
      </form>
    </div>
  );
}
