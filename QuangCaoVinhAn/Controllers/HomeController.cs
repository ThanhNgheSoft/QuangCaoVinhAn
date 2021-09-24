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
        public IActionResult sanpham(string id)
        {
            KhoiTao();
            using (var webClient = new System.Net.WebClient())
            {               
                webClient.Encoding = Encoding.UTF8;
                //id = "30176";
                //30176
                var strSQL = "http://api.support.vnpage.vn/api/runquery/webportal/quangcaovinhan.com/select * from T_SAN_PHAM where ID_SAN_PHAM = '" + id + "'";
                var json = webClient.DownloadString(strSQL);

                var strSQL_HinhAnh = "http://api.support.vnpage.vn/api/runquery/webportal/quangcaovinhan.com/select * from T_SAN_PHAM SP, T_ANH_SAN_PHAM ASP where SP.ID_SAN_PHAM =  ASP.ID_SAN_PHAM and SP.ID_SAN_PHAM = '" + id + "'";
                var json_HinhAnh = webClient.DownloadString(strSQL_HinhAnh);
                //QuangCaoVinhAn.Models.CMenu tb_menu = JsonConvert.DeserializeObject<QuangCaoVinhAn.Models.CMenu>(json);

             
                var table = JsonConvert.DeserializeObject<List<QuangCaoVinhAn.Models.CT_SAN_PHAM>>(json);
                var table_HinhAnh = JsonConvert.DeserializeObject<List<QuangCaoVinhAn.Models.CT_ANH_SAN_PHAM>>(json_HinhAnh);
                //ViewBag.Info = table;

                ViewBag.TEN_SAN_PHAM = "";
                ViewBag.TOM_TAT = "";
                ViewBag.LINK_ANH = "";
                ViewBag.NOI_DUNG = "";

                if (table.Count > 0) {
                    ViewBag.TEN_SAN_PHAM = table[0].TEN_SAN_PHAM;
                    ViewBag.TOM_TAT = table[0].TOM_TAT;
                    ViewBag.NOI_DUNG = table[0].NOI_DUNG;
                }                                
                if (table_HinhAnh.Count > 0) {
                    ViewBag.LINK_ANH = "https://adminweb.vnpage.vn" + table_HinhAnh[0].LINK_ANH.ToString().Replace("..","");
                }                
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
