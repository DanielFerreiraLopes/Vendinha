// See https://aka.ms/new-console-template for more information
// import 
using Vendinha;
using System.Threading.Channels;

using Vendinha.Entidades;
using Vendinha.Services;


foreach (var cliente in ClienteService.Listar())
{
    cliente.PrintDados();
}