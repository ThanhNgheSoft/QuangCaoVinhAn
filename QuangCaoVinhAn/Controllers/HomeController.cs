using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuangCaoVinhAn.Models;
using System;
using System.Net;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

using System.Threading.Tasks;

namespace QuangCaoVinhAn.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {           
            using (var webClient = new System.Net.WebClient())
            {
                webClient.Encoding = Encoding.UTF8;
                var json = webClient.DownloadString("http://api.support.vnpage.vn/api/runquery/webportal/quangcaovinhan.com/select ID_SAN_PHAM, TEN_SAN_PHAM from T_SAN_PHAM");
                //QuangCaoVinhAn.Models.CMenu tb_menu = JsonConvert.DeserializeObject<QuangCaoVinhAn.Models.CMenu>(json);

                //var report = JsonConvert.DeserializeObject<List<QuangCaoVinhAn.Models.CMenu>>(json);
                var table = JsonConvert.DeserializeObject<List<QuangCaoVinhAn.Models.CMenu>>(json);
                return View(table);
            }                    
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
