import { useEffect, useState } from "react";
import { listarCliente } from "../services/clienteApi";
import { Link } from "simple-react-routing";

export default function ClientesList(properties){

    const[lista, setLista] = useState([]);
    const[pesquisa, setPesquisa] = useState([]);

    useEffect(() => {
        listarCliente(pesquisa)
        .then(resposta => {
            if(resposta.status == 200){
                resposta.json()
                .then(cliente => {
                    setLista(cliente)
                })
            }
        })
    }, [pesquisa])

    return (<>
        <h1>Lista de Clientes</h1>
        <div className="barra_superior">
            <input type="search" value={pesquisa} onChange={(event) => {
                setPesquisa(event.target.value);
            }} />

            <Link to="/clientes/adicionar">Adicionar Cliente</Link>
        </div>

        <div className="list" id="lista_clientes">
            {lista.map(
                cliente => {
                    return <ClienteItem key={cliente.codigo} cliente={cliente}></ClienteItem>
                }
            )}
        </div>
    </>)
}

function ClienteItem(c){
    const cliente = c.cliente;
    var data = new Date(cliente.dataNascimento);
    var dia = data.getDate().toString().padStart(2, '0');
    var mes = (data.getMonth() + 1).toString().padStart(2, '0');
    var ano = data.getFullYear();

    return(<ul className="item">

            <li>{cliente.codigo}</li>
            <li>{cliente.nome}</li>
            <li>{cliente.cpf}</li>
            <li>{cliente.email}</li>
            <li>{dia}/{mes}/{ano}</li>
            <li><Link to={"/clientes/editar/" + cliente.codigo}>Editar </Link></li>
            <li><button type="button">Excluir</button></li>
    </ul>)
}