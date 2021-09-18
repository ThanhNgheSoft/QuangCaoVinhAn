﻿using Newtonsoft.Json;
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
                var json = webClient.DownloadString("http://api.support.vnpage.vn/api/runquery/webportal/quangcaovinhan.com/select * from T_SAN_PHAM");
               Models.CMenu tb_menu = JsonConvert.DeserializeObject<QuangCaoVinhAn.Models.CMenu>(json);
                return View(tb_menu);
            }                    
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
