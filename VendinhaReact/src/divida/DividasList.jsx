import { useEffect, useState } from "react";
import { listarDivida } from "../services/dividaApi";
import { Link } from "simple-react-routing";

export default function DividasList(){

    const[lista, setLista] = useState([]);
    const[pesquisa, setPesquisa] = useState([]);


    useEffect(() => {
        listarDivida(pesquisa)
        .then(resposta => {
            if(resposta.status == 200){
                resposta.json()
                .then(divida => {
                    setLista(divida)
                })
            }
        })
    }, [pesquisa])

    return (<>
        <h1>Lista de Dividas</h1>
        <div className="barra_superior">
            <input type="search" value={pesquisa} onChange={(event) => {
                setPesquisa(event.target.value);
            }} />

            <Link to="/dividas/adicionar">Adicionar Divida</Link>
        </div>

        <div className="list" id="lista_dividas">
            {lista.map(
                divida => {
                    return <DividaItem key={divida.id} divida={divida}></DividaItem>
                }
            )}
        </div>
    </>)
}

function DividaItem(d){ 
    const divida = d.divida;

    var data = new Date(divida.data);
    var diaData = data.getDate().toString().padStart(2, '0');
    var mesData = (data.getMonth() + 1).toString().padStart(2, '0');
    var anoData = data.getFullYear();

    var dataPagamento = new Date(divida.dataPagamento)
    var diaPagamento = dataPagamento.getDate().toString().padStart(2, '0');
    var mesPagamento = (dataPagamento.getMonth() + 1).toString().padStart(2, '0');
    var anoPagamento = dataPagamento.getFullYear();

    return(<ul className="item">
        
            <li>{divida.id}</li>
            <li>{divida.clienteCodigo}</li>
            <li>{divida.valor}</li>
            <li>{divida.situacao}</li>
            <li>{diaData}/{mesData}/{anoData}</li>
            <li>{diaPagamento}/{mesPagamento}/{anoPagamento}</li>
            <li><Link to={"/dividas/editar/" + divida.id}>Editar </Link></li>
            <li><button type="button">Excluir</button></li>
    </ul>)
}