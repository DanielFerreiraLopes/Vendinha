using NHibernate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vendinha.Entidades;
using Vendinha.Dtos;

namespace Vendinha.Services
{
    public class ClienteService
    {
        private readonly ISessionFactory session;

        public ClienteService(ISessionFactory session)
        {
            this.session = session;
        }

        public virtual List<Cliente> Listar()
        {
            using var sessao = session.OpenSession();
            var clientes = sessao.Query<Cliente>().OrderByDescending(c => c.Codigo).ToList();
            return clientes;

        }

        public virtual List<Cliente> Listar(string buscaCliente)
        {
            using var sessao = session.OpenSession();
            var clientes = sessao.Query<Cliente>()
                .Where(c => c.Codigo.ToString() == buscaCliente ||
                            c.Nome.Contains(buscaCliente) ||
                            c.Email.Contains(buscaCliente) ||
                            c.Cpf.ToString() == buscaCliente)
                    .OrderBy(c => c.Codigo)
                    .ToList();
            return clientes;

        }

        public virtual Cliente Retorna(int codigo)
        {
            using var sessao = session.OpenSession();
            var cliente = sessao.Get<Cliente>(codigo);
            return cliente;
        }

        public bool Criar(Cliente Cliente, out List<ValidationResult> erros)
        {

            if (Validacao(Cliente, out erros))
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();
                sessao.Save(Cliente);
                transaction.Commit();
                return true;
            }
            return false;
        }

        public bool Editar(Cliente cliente, out List<ValidationResult> erros)
        {
            var validacao = Validacao(cliente, out erros);
            if (validacao)
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();
                sessao.Merge(cliente);
                transaction.Commit();
                return true;
            }
            return false;
        }

        public bool Excluir(int Codigo, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            using var sessao = session.OpenSession();
            using var transaction = sessao.BeginTransaction();
            var cliente = sessao.Query<Cliente>()
                .Where(d => d.Codigo == Codigo)
                .FirstOrDefault();
            if (cliente == null)
            {
                erros.Add(new ValidationResult("Cliente Não Encontrada",
                    new[] { "Codigo" }));
                return false;
            }

            sessao.Delete(cliente);
            transaction.Commit();
            return true;
        }

        public List<Divida> ListarDividas()
        {
            using var sessao = session.OpenSession();
            var insc = sessao.Query<Divida>()
                .OrderBy(c => c.Id)
                .ToList();
            return insc;
        }

        // --------------------------------------------------------

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

        public static List<Cliente> Listar(string buscaCliente,
            int skip = 0,
            int pageSize = 0)
        {
            var pesquisa = Clientes.Where(a =>
            a.Codigo.ToString() == buscaCliente ||
            a.Nome.Contains(buscaCliente, StringComparison.OrdinalIgnoreCase) ||
            a.Email.Contains(buscaCliente) ||
            a.Cpf.ToString() == buscaCliente
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
