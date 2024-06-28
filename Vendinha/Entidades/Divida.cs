using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Vendinha.Entidades
{
    public class Divida
    {
        public int Id { get; set; }

        public int ClienteCodigo { get; set; }

        public decimal Valor { get; set; }
        
        public bool Situacao { get; set; }

        public DateTime Data { get; set; } = DateTime.Now;

        public DateTime? DataPagamento { get; set; }

        public string Descricao { get; set; }
  
    }
}
