﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
using Vendinha.Entidades;
using Vendinha.Services;
using NHibernate;

namespace Vendinha.Api.Controllers
{
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteService clienteService;

        public ClienteController(ClienteService clienteService)
        {
            this.clienteService = clienteService;
        }

        [HttpGet]
        public IActionResult Listar(string pesquisa, int page = 0, int pageSize = 0) 
        { 
                var clientes = string.IsNullOrEmpty(pesquisa) ?
                    clienteService.Listar(page, pageSize) :
                    clienteService.Listar(pesquisa, page, pageSize);
            return Ok(clientes);
        }

        [HttpGet("{codigo}")]
        public IActionResult GetByCodigo(int codigo)
        {
            var cliente = clienteService.Retorna(codigo);
                return Ok(cliente);
        }


        [HttpPost]
        public IActionResult Criar([FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest(ModelState);
            }
            var sucesso = clienteService.Criar(cliente, out List<ValidationResult> erros);
            if (sucesso)
            {
                return Ok(cliente);
            }
            else
            {
                return UnprocessableEntity(erros);
            }
        }

        [HttpPut]
        public IActionResult Editar([FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest(ModelState);
            }

            var sucesso = clienteService.Editar(cliente, out List<ValidationResult> erros);
            if (sucesso)
            {
                return Ok(cliente);
            }
            else
            {
                return UnprocessableEntity(erros);
            }
        }

        [HttpDelete("{codigo}")]
        public IActionResult Remover(int codigo)
        {
            var cliente = clienteService.Excluir(codigo, out _);
            if (cliente == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(cliente);
            }
        }

        [HttpGet("dividas/{codigocliente}")]
        public IActionResult Dividas(int codigocliente, bool situacao)
        {
            var dividas = clienteService.ListarDividas(codigocliente);
            return Ok(dividas);
        }
    }
}
