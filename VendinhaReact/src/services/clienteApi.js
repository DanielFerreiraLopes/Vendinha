const URL_API = "https://localhost:7233";

export function listarCliente(pesquisa) {

    var response = pesquisa ?
        fetch(URL_API + "/api/Cliente?pesquisa=" + pesquisa) :
        fetch(URL_API + "/api/Cliente");

    return response;
}

export function getByCodigo(codigo) {

    var response = fetch(URL_API + "/api/Cliente/" + codigo);
    return response;
}

export function dividasCliente(codigoCliente){
    var response = fetch(URL_API + "/api/Cliente/dividas/" + codigoCliente);
    return response;
}

export function postCliente(cliente) {

    var request = {
        method: cliente.codigo ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    }
    var response =
        fetch(URL_API + "/api/Cliente",
            request)
    return response;
}

export function deletarCliente(codigo) {

    var request = {
        method: "DELETE"
    }
    var response = fetch(URL_API + "/api/Cliente/" + codigo, request)
    return response;
}

