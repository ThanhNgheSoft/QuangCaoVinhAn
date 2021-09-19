using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuangCaoVinhAn.Models
{
    public class CMenu
    {
            public string ID_SAN_PHAM { get; set; }
            public string TEN_SAN_PHAM { get; set; }        
    }

    public class Login
    {
        public string username { get; set; }
        public string password { get; set; }
        public string store_authority { get; set; }
        public string fyear { get; set; }
    }
    public class RootObject
    {
        public string success { get; set; }
        public List<Login> login { get; set; }
    }
}
