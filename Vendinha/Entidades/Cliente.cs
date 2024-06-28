using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vendinha.Entidades
{
    public class Cliente
    {
        public int Codigo { get; set; }

        public string Nome { get; set; }
        [Required, StringLength(50, MinimumLength = 11)]

        public string Cpf { get; set; }

        public DateTime? DataNascimento { get; set; }

        private string email;
        [Required]

        public string Email 
        {
            get => email;
            set => email = value?.ToLower(); 
        }

        public IList<Divida> Dividas { get; set; }


        public virtual void PrintDados()
        {
            Console.WriteLine(
                "Codigo: {0} \n" +
                "Nome: {1} \n" +
                "CPF: {2} \n" +
                "Email: {3} \n" +
                "Data de Nascimento: {4} \n ",
                Codigo, Nome, Cpf, Email, DataNascimento
                );
        }
    }
}
