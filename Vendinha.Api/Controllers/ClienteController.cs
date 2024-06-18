using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
using Vendinha.Entidades;
using Vendinha.Services;

namespace Vendinha.Api.Controllers
{
    [Route("api/[controller]")]
    public class ClienteController : Controller
    {
        private readonly ClienteService clienteService;

        [HttpGet]
        public IActionResult Listar(string pesquisa,
            int skip = 0, 
            int pageSize = 0) 
        { 
                var clientes = string.IsNullOrEmpty(pesquisa) ?
                    ClienteService.Listar() : 
                    ClienteService.Listar(pesquisa, skip, pageSize);
            return Ok(clientes);
        }

        [HttpPost]
        public IActionResult Criar([FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest(ModelState);
            }
            var sucesso = ClienteService.CriarCliente(cliente, out List<ValidationResult> erros);
            if (sucesso == null)
            {
                return Ok(cliente);
            }
            else if (erros.Count == 0)
            {
                return NotFound();
            }
            else
            {
                return UnprocessableEntity();
            }
        }

        [HttpPost]
        public IActionResult Editar([FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest(ModelState);
            }
            var sucesso = ClienteService.EditarCliente(cliente, out List<ValidationResult> erros);
            if (sucesso)
            {
                return Ok(cliente);
            }
            else
            {
                return UnprocessableEntity();
            }
        }

        [HttpDelete("{codigo}")]
        public IActionResult Remover(int codigo)
        {
            var cliente = ClienteService.Remover(codigo);
            if (cliente == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(cliente);
            }
        }
    }
}
