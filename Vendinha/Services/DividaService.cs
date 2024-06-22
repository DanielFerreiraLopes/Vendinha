using NHibernate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vendinha.Entidades;

namespace Vendinha.Services
{
    public class DividaService
    {

        private readonly ISessionFactory session;

        public DividaService(ISessionFactory session)
        {
            this.session = session;
        }
        public static bool Validacao(Divida divida, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();
            var valido = Validator.TryValidateObject(divida,
                new ValidationContext(divida),
                erros,
                true    
                );

            return valido;
        }

        public virtual List<Divida> Listar()
        {
            using var sessao = session.OpenSession();
            var dividas = sessao.Query<Divida>().OrderByDescending(d => d.Id).ToList();
            return dividas;

        }

        public virtual List<Divida> Listar(string pesquisa)
        {
            using var sessao = session.OpenSession();
            var dividas = sessao.Query<Divida>()
                .Where(d => d.ClienteCodigo.ToString() == pesquisa ||
                            d.Valor.ToString() == pesquisa ||
                            d.Descricao.Contains(pesquisa)).ToList();
            return dividas;

        }

        public bool Criar(Divida divida, out List<ValidationResult> erros)
        {
            var validacao = Validacao(divida, out erros);
            if (validacao)
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();
                sessao.Save(divida);
                transaction.Commit();
                return true;
            }
            return false;
        }

        public bool Editar(Divida divida, out List<ValidationResult> erros)
        {
            var validacao = Validacao(divida, out erros);
            if (validacao)
            {
                using var sessao = session.OpenSession();
                using var transaction = sessao.BeginTransaction();
                sessao.Merge(divida);
                transaction.Commit();
                return true;
            }
            return false;
        }

        public bool Excluir (int id, out List<ValidationResult> erros)
        {
            erros = new List<ValidationResult>();  
            using var sessao = session.OpenSession();
            using var transaction = sessao.BeginTransaction();
            var divida = sessao.Query<Divida>()
                .Where(d => d.Id == id)
                .FirstOrDefault();
            if (divida == null)
            {
                erros.Add(new ValidationResult("Divida Não Encontrada",
                    new[] {"id"}));
                return false;
            }

            sessao.Delete(divida);
            transaction.Commit();
            return true;
        }


    }
}
