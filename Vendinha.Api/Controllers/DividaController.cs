﻿using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Vendinha.Entidades;
using Vendinha.Services;

namespace Vendinha.Api.Controllers
{
    [Route("api/[controller]")]
    public class DividaController : Controller
    {
        private readonly DividaService dividaService;

        public DividaController(DividaService dividaService)
        {
            this.dividaService = dividaService;
        }

        [HttpGet]
        public IActionResult Get(string pesquisa = null)
        {
            var gets = pesquisa == null ?
                dividaService.Listar() :
                dividaService.Lista(pesquisa);
            return Ok(gets);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Divida divida)
        {
            var valido = dividaService.Criar(divida, out List<ValidationResult> erros);
            return valido? Ok(erros) : UnprocessableEntity(erros);
        }

        [HttpPut]
        public IActionResult Put([FromBody] Divida divida)
        {
            var valido = dividaService.Editar(divida, out List<ValidationResult> erros);
            return valido ? Ok(erros) : UnprocessableEntity(erros);
        }

        [HttpDelete("{dividaId}")]
        public  IActionResult Delete(int dividaId)
        {
            var valido = dividaService.Excluir(dividaId, out List<ValidationResult> erros);
            return valido ? Ok(erros) : UnprocessableEntity(erros);
        }

    }
}
