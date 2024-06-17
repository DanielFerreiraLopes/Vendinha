using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vendinha.Entidades;

namespace Vendinha.Services
{
    public class ClienteService
    {

        private static List<Cliente> Clientes = new List<Cliente>()
        {
           new Cliente { Nome = "Pablo Escobar", Codigo = 1, DataNascimento = new DateTime(2000,01,01), Email = "escobar@gmail.com", Cpf = "12312312388"},
           new Cliente { Nome = "Eleonardo da Rocha", Codigo = 2, DataNascimento = new DateTime(2001,02,02), Email = "the_rock@gmail.com", Cpf = "12312312399"},
           new Cliente { Nome = "Zezinho do Pneu", Codigo = 3, DataNascimento = new DateTime(2002,03,03), Email = "pneu_zero@gmail.com", Cpf = "12312312400"}
        };


        public static void CriarCliente(Cliente cliente)
        {
            var erros = new List<ValidationResult>();
            var valido = Validator.TryValidateObject(cliente,
                new ValidationContext(cliente),
                erros,
                true
                );

            if (valido)
            {
                Clientes.Add( cliente );
            }
            else
            {
                foreach (var erro in erros)
                {
                    Console.WriteLine("{0}: {1}", 
                        erro.MemberNames.First(),
                        erro.ErrorMessage
                        );
                }
            }
        }
        public static List<Cliente> Listar()
        {
            return Clientes;
        }
        public static List<Cliente> Listar(string buscaCliente)
        {
            return Clientes.Where(a => 
            a.Codigo.ToString() == buscaCliente ||
            a.Nome.Contains(buscaCliente, StringComparison.OrdinalIgnoreCase) ||
            a.Email.Contains(buscaCliente) ||
            a.Cpf.ToString() == buscaCliente
            )
            .OrderBy(x => x.DataNascimento)
            .ToList();
        }

        public static Cliente Remover(int codigo)
        {
            var cliente = Clientes
                .Where(x => x.Codigo == codigo)
                .First();
            Clientes.Remove( cliente );
            return cliente;
        }

            
    }
}
