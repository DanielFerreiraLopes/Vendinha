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

        public static bool Validacao(Cliente cliente, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            var valido = Validator.TryValidateObject(cliente,
                new ValidationContext(cliente),
                erros,
                true
                );

            return valido;
        }

        public static List<Cliente> Listar()
        {
            return Clientes;
        }

        public static List<Cliente> Listar(string buscaCliente,
            int skip = 0,
            int pageSize = 0)
        {
            var pesquisa = Clientes.Where(a =>
            a.Codigo.ToString() == buscaCliente ||
            a.Nome.Contains(buscaCliente, StringComparison.OrdinalIgnoreCase) ||
            a.Email.Contains(buscaCliente) ||
            a.Cpf.Contains(buscaCliente) 
            )
            .OrderBy(x => x.DataNascimento)
            .AsEnumerable();

            if (skip > 0)
            {
                pesquisa = pesquisa.Skip(skip);
            }
            if (pageSize > 0)
            {
                pesquisa = pesquisa.Take(pageSize);
            }

            return pesquisa.ToList();
        }

        public static bool CriarCliente(Cliente cliente, out List<ValidationResult> erros)
        {
            var valido = Validacao(cliente, out erros);

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
            return false;
        }
      
        public static bool EditarCliente(Cliente atualizarCliente, out List<ValidationResult> erros)
        {
            var clienteAtual = Clientes.FirstOrDefault(x => x.Codigo == atualizarCliente.Codigo);

            erros = new List<ValidationResult>();

            if (clienteAtual == null)
            {
                return false;
            }
            else
            {
                var valido = Validacao(atualizarCliente, out erros);
                if (valido)
                {
                    clienteAtual.Nome = atualizarCliente.Nome;
                    clienteAtual.Email = atualizarCliente.Email;
                    clienteAtual.Cpf = atualizarCliente.Cpf;
                    clienteAtual.DataNascimento = atualizarCliente.DataNascimento;
                }

                return valido;
            }
        }

        public static Cliente Remover(int codigo)
        {
            var cliente = Clientes
                .Where(x => x.Codigo == codigo)
                .FirstOrDefault();
            Clientes.Remove(cliente);
            return cliente;
        }

            
    }
}
