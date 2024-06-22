const URL_API = "https://localhost:7233";

export function listarDividas(pesquisa) {

    var response = pesquisa ?
        fetch(URL_API + "/api/Divida?pesquisa=" + pesquisa) :
        fetch(URL_API + "/api/Divida");

    return response;
}

export function getById(codigo) {

    var response = fetch(URL_API + "/api/Divida/" + codigo);
    return response;
}

export function postDivida(divida) {

    var request = {
        method: divida.id ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(divida)
    }
    var response =
        fetch(URL_API + "/api/Divida",
            request)
    return response;
}

export function deletarDivida(id) {

    var request = {
        method: "DELETE"
    }
    var response = fetch(URL_API + "/api/Divida/" + id, request)
    return response;
}

