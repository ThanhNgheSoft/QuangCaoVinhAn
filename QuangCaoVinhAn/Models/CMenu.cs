using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuangCaoVinhAn.Models
{
    public partial class CMenu
    {
            public string ID_SAN_PHAM { get; set; }
            public string TEN_SAN_PHAM { get; set; }        
    }

    public partial class CT_ANH_SAN_PHAM
    {
        public string ID_ANH { get; set; }
        public string ID_SAN_PHAM { get; set; }
        public string LINK_ANH { get; set; }
    }
    public partial class CT_SAN_PHAM
    {
        public string ID_SAN_PHAM { get; set; }
        public string TEN_SAN_PHAM { get; set; }
        public string ID_LOAI_SAN_PHAM { get; set; }
        public string MA_SAN_PHAM { get; set; }
        public string TEN_URL { get; set; }
        public string TOM_TAT { get; set; }
        public string NOI_DUNG { get; set; }
        public string DON_GIA { get; set; }
        public string DON_GIA_KHUYEN_MAI { get; set; }
        public string LUOT_XEM { get; set; }
        public string NGAY_DANG { get; set; }
        public string NGAY_CAP_NHAT { get; set; }
        public string TAG { get; set; }
        public string SO_THU_TU { get; set; }
        public string DON_VI_TINH { get; set; }
        public string NOI_DUNG_2 { get; set; }
        public string NOI_DUNG_3 { get; set; }
        public string TIEU_DE_ICON { get; set; }
        public string QUA { get; set; }
    }


}
