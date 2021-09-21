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
        public partial class T_THIET_LAP
        {
            public string ID_DOANH_NGHIEP { get; set; }
            public string ID_THIET_LAP { get; set; }
            public string NOI_DUNG { get; set; }
            public string LIEN_KET { get; set; }
            public string GHI_CHU { get; set; }
            public string TIEU_DE { get; set; }
            public Nullable<int> SO_THU_TU { get; set; }

        }
        public void KhoiTao()
        {
            using (var webClient = new System.Net.WebClient())
            {
                webClient.Encoding = Encoding.UTF8;
                var json2 = webClient.DownloadString("http://api.land.zgroups.vn/api/nhadatnguyencuong.com/Thongtin/all");
                var tb_thiet_lap = JsonConvert.DeserializeObject<List<T_THIET_LAP>>(json2);

                foreach (var item in tb_thiet_lap)
                {
                    if (item.ID_THIET_LAP == "Tieudeweb")
                    {
                        if (item.NOI_DUNG != null)
                        {
                            ViewBag.TIEUDEWEB = item.NOI_DUNG.Replace("<p>", "").Replace("</p>", "");
                        }
                    }
                    if (item.ID_THIET_LAP == "Description")
                    {
                        if (item.NOI_DUNG != null)
                        {
                            ViewBag.description = item.NOI_DUNG.Replace("<p>", "").Replace("</p>", "");
                        }
                    }
                    if (item.ID_THIET_LAP == "Keywords")
                    {
                        if (item.NOI_DUNG != null)
                        {
                            ViewBag.keywords = item.NOI_DUNG.Replace("<p>", "").Replace("</p>", "");
                        }
                    }
                }
                ViewBag.image = "/images/avatar-logo.jpg";
            }
            //Menu
            using (var webClient = new System.Net.WebClient())
            {
                webClient.Encoding = Encoding.UTF8;
                var json = webClient.DownloadString("http://api.support.vnpage.vn/api/runquery/webportal/quangcaovinhan.com/select ID_SAN_PHAM, TEN_SAN_PHAM from T_SAN_PHAM");
                //QuangCaoVinhAn.Models.CMenu tb_menu = JsonConvert.DeserializeObject<QuangCaoVinhAn.Models.CMenu>(json);
                //var report = JsonConvert.DeserializeObject<List<QuangCaoVinhAn.Models.CMenu>>(json);
                var table = JsonConvert.DeserializeObject<List<QuangCaoVinhAn.Models.CMenu>>(json);
                ViewBag.Menu = table;              
            }
        }
        public IActionResult Index()
        {
            KhoiTao();            
            {             
                return View();
            }
        }

        [Route("Sanpham/{id}")]
        public IActionResult Sanpham(string id)
        {
            KhoiTao();
            using (var webClient = new System.Net.WebClient())
            {
                webClient.Encoding = Encoding.UTF8;
                var json = webClient.DownloadString("http://api.support.vnpage.vn/api/runquery/webportal/quangcaovinhan.com/select ID_SAN_PHAM, TEN_SAN_PHAM from T_SAN_PHAM");
                //QuangCaoVinhAn.Models.CMenu tb_menu = JsonConvert.DeserializeObject<QuangCaoVinhAn.Models.CMenu>(json);

                //var report = JsonConvert.DeserializeObject<List<QuangCaoVinhAn.Models.CMenu>>(json);
                var table = JsonConvert.DeserializeObject<List<QuangCaoVinhAn.Models.CMenu>>(json);
                ViewBag.test = table;
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
