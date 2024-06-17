using Microsoft.AspNetCore.Mvc;
using Vendinha.Entidades;
using Vendinha.Services;

namespace Vendinha.Api.Controllers
{
    public class ClienteController : Controller
    {
        private readonly ClienteService clienteService;

        public IActionResult Index()
        {
            return View();
        }
    }
}
