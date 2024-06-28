
export function valorDividas(dividas) {
   var valordividas = dividas.filter((divida) => divida.situacao === false)
                        .reduce((acc, divida) => acc + divida.valor, 0)
                        .toFixed(2)

 return valordividas;
}