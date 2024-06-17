using Microsoft.AspNetCore.Mvc;
using Vendinha.Entidades;
using Vendinha.Services;

namespace Vendinha.Api.Controllers
{
    public class DividaController : Controller
    {
        private readonly DividaService dividaService;


        public IActionResult Index()
        {
            return View();
        }
    }
}
