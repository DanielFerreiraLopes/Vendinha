import { useEffect, useReducer, useState } from "react";
import { useNavigation, useRouter } from "simple-react-routing";
import { getById, postDivida } from "../services/dividaApi";

export default function FormDivida() {

    const { pathParams } = useRouter();

    const id = pathParams["id"];

    const { navigateTo } = useNavigation();

    const [errorMessage, setErrorMessage] = useState("");

    const [divida, setDivida] = useState();

    const salvarDivida = async (evento) => {
        evento.preventDefault();
        var dados = new FormData(evento.target);

        var divida = {
            id: id,
            clienteCodigo: Number(dados.get("clienteCodigo")),
            valor: Number(dados.get("valor")),
            situacao: dados.get("situacao"),
            dataPagamento: dados.get("dataPagamento"),
            descricao: dados.get("descricao")
        };

        var resultado = await postDivida(divida);
        if (resultado.status == 200) {
            navigateTo(null, "/dividas")
        }
        else{
            var erro = await resultado.json();
            setErrorMessage("Algo deu errado no registro da divida: \n" + JSON.stringify(erro, null, '\t'))
        }
    }
    useEffect(() => {
        if(id){
            getById(id)
            .then(d => d.json())
            .then(result => setDivida(result));
        }
        else{
            setDivida({})
        }
    }, []);

    return divida &&(<>
        <h1>{id ? "Editar" : "Registrar"} Divida</h1>
        <form onSubmit={salvarDivida}>

            <div className="input">
                <label>Codigo de Cliente</label>
                <input defaultValue={divida.clienteCodigo} type="number" name="clienteCodigo"/>
                <span className="error"></span>
            </div>

           <div className="input">
                <label>Valor</label>
                <input defaultValue={divida.valor} type="decimal" name="valor"/>
                <span className="error"></span>
            </div>

            <div className="input">
                <input
                    type="radio"
                    name="situacao"
                    value="Não Pago"
                    checked={pagado === "Não Pago"}
                    onChange={(e) => setPagado(e.target.value)}
                />
                Não Pago
            </div>

            <div className="input">
                <input
                    type="radio"
                    name="situacao"
                    value="Pago"
                    checked={pagado === "Pago"}
                    onChange={(e) => setPagado(e.target.value)}
                />
                Pago
            </div>

            <div className="input">
                <label>Data de Pagamento</label>
                <input defaultValue={divida.dataPagamento?.substring(0, 10)} type="date" name="dataPagamento"/>
                <span className="error"></span>
            </div>

            <div className="input">
                <label>Descrição</label>
                <input defaultValue={divida.descricao} type="text" name="descricao"/>
                <span className="error"></span>
            </div>

            <input type="hidden" name="index" value="-1" />

            <button type="submit">{id ? "Atualizar Divida" : "Registrar Divida"}</button>
            <p className="error">{errorMessage}</p>

        </form>
    </>)
}