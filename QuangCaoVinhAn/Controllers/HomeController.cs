using Newtonsoft.Json;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuangCaoVinhAn.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuangCaoVinhAn.Controllers
{
    public class HomeController : Controller
    {
        public partial class T_THIET_LAP
        {
            public string ID_SAN_PHAM { get; set; }
            public string TEN_SAN_PHAM { get; set; }
           
            public Nullable<int> SO_THU_TU { get; set; }

        }
        public void meta()
        {
            using (var webClient = new System.Net.WebClient())
            {
                webClient.Encoding = Encoding.UTF8;                
                var json2 = webClient.DownloadString("http://api.support.vnpage.vn/api/runquery/webportal/quangcaovinhan.com/select * from T_SAN_PHAM");
                var tb_thiet_lap = JsonConvert.DeserializeObject<List<T_THIET_LAP>>(json2);

                
                ViewBag.image = tb_thiet_lap[0].TEN_SAN_PHAM;
            }
        }

        public IActionResult Index()
        {
            //meta();
            using (var webClient = new System.Net.WebClient())
            {
                webClient.Encoding = Encoding.UTF8;
                var json2 = webClient.DownloadString("http://api.support.vnpage.vn/api/runquery/webportal/quangcaovinhan.com/select * from T_SAN_PHAM");
                var tb_thiet_lap = JsonConvert.DeserializeObject<List<T_THIET_LAP>>(json2);

            }
            return View(tb_thiet_lap);
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
