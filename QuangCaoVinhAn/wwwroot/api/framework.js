/* Hằng Số*/
const KEY = "quangcaovinhan.com";
const SERVICE_URL = "https://api.adminweb.vnpage.vn/api/" + KEY;
/* --- */
const SERVICE_URL_RUNQUERY = "https://api.support.vnpage.vn/api/runquery/webportal/" + KEY;
/* --- */
const LINK_SEVER = "https://adminweb.vnpage.vn";
const LINK_WEB = "https://" + location.host + "/";
var GLOBAL_MENU;


//***   Gọi Dữ Liệu
const fetchAPI = async baseURL => {
    let response = await fetch(baseURL);    
    let data = await response.json();
    return data;
}

//***   Gọi thông báo lỗi
const Baoloi = (info) => {
    alert(`Đã xảy ra lỗi: "${info}"`);
}

//***   Gọi menu theo cap ===>
const getMenuLever = (data, lever = 1, parentMenu = 0) => {
    if (lever == 1) {
        if (parentMenu == 0) return data.filter(item => item.ID_MENU_CHA == null && item.HIEN_THI == true);
        else return data.filter(item => item.ID_MENU_CHA == parentMenu && item.HIEN_THI == true);
    }
    if (lever == 2) return data.filter(item => item.LOAI_MENU == "2" && item.ID_MENU_CHA == parentMenu && item.HIEN_THI == true);
}
const xuLyMenu = (data, idAPI) => {
    //let info = "";
    let info = `<li><a href="/">Trang chủ</a></li>`;    
    info += `<li><a href="/Gioi-thieu">Giới Thiệu</a></li>`; 
    info += xuLyMenuLever1(data);
    info += `<li><a href="../Lien-he">Liên Hệ</a></li>`;
    if (document.getElementById(idAPI)) document.getElementById(idAPI).innerHTML = info;    
}
const xuLyMenuLever1 = (data) => {
    const menuLever1 = getMenuLever(data);
    let info = "";
    menuLever1.forEach(menu => {
        if (menu.ROOT == false) info += `<li>${chentheA(menu, LINK_WEB, ``)}</li>`;
        else {
            info += `<li>${chentheA(menu, LINK_WEB,'')}`;
            const menuLever2 = getMenuLever(data, 1, menu.ID_MENU);
            if (menuLever2.length > 0) info += xuLyMenuLever2(menuLever2, menu.ID_MENU);
            info += `</li>`;

        }
    });
    return info;
}
const xuLyMenuLever2 = (data, id) => {
    let info = `<ul>`;
    data.forEach(menu => {
        info += `<li>${chentheA(menu, LINK_WEB,``)}</li>`;
    });
    info += "</ul>";
    return info;
}

const xuLyCatalog = (data, idAPI) => {
    //let info = "";
    let info = xuLyCatalogLever1(data);
    if (document.getElementById(idAPI)) document.getElementById(idAPI).innerHTML = info;
}
const xuLyCatalogLever1 = (data) => {    
    let info = "";
    data = data.filter(item => item.ID_MENU != "10070");
    data.forEach(menu => {
        if (menu.ROOT == false) info += `<li>${chentheA(menu, LINK_WEB, ``)}</li>`;
        else {
            info += `<li>${chentheA(menu, LINK_WEB, '')}`;
            const menuLever2 = getMenuLever(data, 1, menu.ID_MENU);
            info += xuLyCatalogLever2(menuLever2, menu.ID_MENU);
            info += `<i class="fa fa-angle-right"></i></li>`;
        }
    });
    return info;
}
const xuLyCatalogLever2 = (data, id) => {
    let info = `<ul class="megamenu">`;
    info += `<li><ul>`;
    data.forEach(menu => {
        info += `<li>${chentheA(menu, LINK_WEB, ``)}</li>`;
    });
    info += "</ul></li>";
    info += `<li><div class="banner-fixed menu-banner menu-banner2"><figure><img src="../images/img-menu.jpg" alt="Menu Banner" width="235" height="347" /></figure></div></li>`;
    info += "</ul>";
    return info;
}

//<===   Gọi menu theo cap  ****

//***   Gọi link san pham
const Link_sanpham = (item) => {
    return LINK_WEB + item.TEN_URL + "-land" + item.ID_SAN_PHAM;
}


//***   Gọi link tin tuc
const Link_tintuc = (item) => {
    return LINK_WEB + item.TEN_URL + "-post" + item.ID_TIN_TUC;
}

//***   Gọi link the a
const chentheA = (item, Linkweb, bclass) => {
    var info = "";
    info += `<a ${bclass} `;
    if (item.LIEN_KET != "" && item.LIEN_KET != null) {
        if (item.LIEN_KET.indexOf('http') == -1) {
            if (item.LIEN_KET.indexOf('null') > -1) {
                info += "href='#'>" + item.TEN_MENU;
            }
            else {
                if (item.LIEN_KET.indexOf('/') > -1) {
                    info += "href='" + Linkweb + item.LIEN_KET + item.TEN_URL + "'>" + item.TEN_MENU;
                }
                else {
                    info += "href='" + Linkweb + item.LIEN_KET + "'>" + item.TEN_MENU;
                }
            }
        }
        else {
            info += "href='" + item.LIEN_KET + "' target='_blank'>" + item.TEN_MENU;
        }
    }
    else {
        info += "href='" + Linkweb + item.TEN_URL + "'>" + item.TEN_MENU;
    }

    info += "</a>";

    return info;
}

/*Gọi API Thông Tin*/
const apiThongTin = async (url) => {
    const baseUrl = `${SERVICE_URL}/Thongtin/all`;
    try {
        let data = await fetchAPI(baseUrl);
        showThongTin(data);
    }
    catch (err) {
        Baoloi(err);
    }
}

//*** API THONG TIN WEB
const showThongTin = (data) => {
     // HEADER
    Show_noidungthongtin(data, "Diachi", "NOI_DUNG", "api_header_diachi", "name", "", "", `<i class="fa fa-map-marker"></i> `);
    Show_noidungthongtin(data, "Facebook", "LIEN_KET", "api_header_facebook", "link", "href", "", `Fanpage `);
    Show_noidungthongtin(data, "Hotline", "NOI_DUNG", "api_header_hotline", "all", "href", "tel:", ``);

    // FOOTER
    Show_noidungthongtin(data, "Tieudefooter", "NOI_DUNG", "api_footer_tieudengan", "name", "", "", "");
    Show_noidungthongtin(data, "Diachi", "NOI_DUNG", "api_footer_diachi", "name", "", "", `<i class="fa fa-map-marker"></i> `);
    Show_noidungthongtin(data, "Hotline", "NOI_DUNG", "api_footer_hotline", "name", "", "", `<i class="fa fa-phone"></i> `);    
    Show_noidungthongtin(data, "Email", "NOI_DUNG", "api_footer_email", "name", "", "", `<i class="fa fa-envelope"></i> `);
    Show_noidungthongtin(data, "Facebook", "LIEN_KET", "api_footer_facebook", "link", "href", "", ``);
    Show_noidungthongtin(data, "Facebook", "LIEN_KET", "api_footer_twitter", "link", "href", "", ``);
    Show_noidungthongtin(data, "Facebook", "LIEN_KET", "api_footer_instagram", "link", "href", "", ``);
    Show_noidungthongtin(data, "Facebook", "LIEN_KET", "api_footer_youtube", "link", "href", "", ``);
    Show_noidungthongtin(data, "Googlemap", "NOI_DUNG", "api_footer_map", "name", "", "", ``);

    //PAGE CONTACT
    Show_noidungthongtin(data, "Diachi", "NOI_DUNG", "api_contact_diachi", "name", "", "", `<i class="fa fa-map-marker"></i> `);
    Show_noidungthongtin(data, "Hotline", "NOI_DUNG", "api_contact_hotline", "name", "", "", `<i class="fa fa-phone"></i> `);
    Show_noidungthongtin(data, "Email", "NOI_DUNG", "api_contact_email", "name", "", "", `<i class="fa fa-envelope"></i> `);
    Show_noidungthongtin(data, "Dienthoai1", "NOI_DUNG", "api_contact_dienthoai_1", "all", "href", "tel:", `CSKH: `);
    Show_noidungthongtin(data, "Googlemap", "NOI_DUNG", "api_contact_map", "name", "", "", "");

    //PAGE SHOP INFO    
    Show_noidungthongtin(data, "Hotline", "NOI_DUNG", "api_callpro", "link", "href", "tel:", ``);
}

//***   Gọi trả về  noi dung api cần hiển thị
const Show_noidungthongtin = (data, key, getinfo, id, tab, type, val, name) => {
    if (document.getElementById(id) != null) {
        var info = Tim_Thongtin(data, key, getinfo).replace("<p>", "").replace("</p>", "");
        if (info != "" && info != "null") {            
            if (tab == "link" || tab == "all") {
                if (type == "href") {
                    if (val != null && val != "") {
                        document.getElementById(id).href = val + info;
                    } else {
                        document.getElementById(id).href = info;
                    }
                }
                if (type == "src") {
                    document.getElementById(id).src = info;
                }
            }
            if (tab == "name" || tab == "all") {
                document.getElementById(id).innerHTML = name + info;
            }
        }
        else {
            $("#" + id).hide();
        }
    }
    
}

//***   Gọi trả về  noi dung api thong tin
const Tim_Thongtin = (data, id, noidung) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i].ID_THIET_LAP == id) {
            if (data[i][noidung] != null) {
                return data[i][
                    noidung
                ];
            }
        }
    }
    return "";
}

//***   Gọi tra ve noi dung của menu (trả về data[])
const getDataMenu = (data, idmenu) => {    
    for (var i = 0; i < data.length; i++) {
        if (data[i].ID_MENU == idmenu) {
            return data[i];
            break;
        }
    }
    return "";
}

//***   Gọi tra ve root lon nhat
const RootMenu = (data, idmenu) => {
    var info = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i].ID_MENU == idmenu) {
            if (data[i].ID_MENU_CHA == null) {
                info = data[i].ID_MENU;
            }
            else {
                info = RootMenu(data, data[i].ID_MENU_CHA)
            }
            break;
        }
    }
    return info;
}

//***   Gọi tra ve root theo lever
const RootMenuLever = (data, idmenu, lever, max) => {
    var info = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i].ID_MENU == idmenu) {
            if (data[i].ID_MENU_CHA == null || lever == max) {
                info = data[i].ID_MENU;
            }
            else {
                info = RootMenuLever(data, data[i].ID_MENU_CHA, lever + 1, max);
            }
            break;
        }
    }
    return info;
}

//***   Gọi định dạnh phân cách hàng ngàn cho số
function format_number(number, prefix, thousand_separator, decimal_separator) {
    var thousand_separator = thousand_separator || '.',
        decimal_separator = decimal_separator || ',',
        regex = new RegExp('[^' + decimal_separator + '\\d]', 'g'),
        number_string = number.replace(regex, '').toString(),
        split = number_string.split(decimal_separator),
        rest = split[0].length % 3,
        result = split[0].substr(0, rest),
        thousands = split[0].substr(rest).match(/\d{3}/g);

    if (thousands) {
        separator = rest ? thousand_separator : '';
        result += separator + thousands.join(thousand_separator);
    }
    result = split[1] != undefined ? result + decimal_separator + split[1] : result;
    return prefix == undefined ? result : (result ? prefix + result : '');
};

//***   Lấy Hình Ảnh Gốc
const getFullSizeImg = (src) => {
    let newSrc = LINK_WEB + "/images/noImg.jpg";
    if (src != null && src.length > 0 && src != "NULL") newSrc = LINK_SEVER + src.replace("..", "");
    return newSrc;
}
//***   Lấy Hình Ảnh Thumbnail Sản Phẩm
const getThumbSizeImgProduct = (src, idProduct) => {
    let newSrc = LINK_WEB + "/images/noImg.jpg";
    if (src != null && src.length > 0 && src != "NULL") {
        if (src.indexOf("NoImg.png") == -1) {
            newSrc = LINK_SEVER + src.replace("..", "").replace("/sanpham/" + idProduct + "/", "/sanpham/" + idProduct + "/thumb/");
        }
        else {
            newSrc = LINK_WEB + "/images/noImg.jpg";
        }
    }
        return newSrc;
}
//***   Lấy Hình Ảnh Thumbnail Bài Viết
const getThumbSizeImgPost = (src, idPost) => {
    let newSrc = LINK_WEB + "/images/noImg.jpg";
    if (src != null && src.length > 0 && src != "NULL") {
        if (src.indexOf("NoImg.png") == -1) {
            newSrc = LINK_SEVER + src.replace("..", "").replace("/baiviet/" + idPost + "/", "/baiviet/" + idPost + "/thumb/");
        }
        else {
            newSrc = LINK_WEB + "/images/noImg.jpg";
        }
    }
       
    return newSrc;
}

const PriceToText = (price, tab) => {
    let info = "";
    let info_1 = "";
    let info_2 = "";
    try {
        if (price / 1000000000 >= 1) {
            let tam = price / 1000000000;
            info_1 = Math.round(tam) + " tỷ";
            info_2 = Math.round(tam) + "<sup>tỷ</sup>";
        }
        else if (price / 1000000 >= 1) {
            info_1 = (price / 1000000) + " triệu";
            info_2 = (price / 1000000) + "<sup>triệu</sup>";
        }
        else if (price == 0) {
            info_1 = `<span styte="font-size:12px">Giá thỏa thuận</span>`;
            info_2 = `<span styte="font-size:12px">Giá thỏa thuận</span>`;
        }
        else {
            info_1 = format_number(price);
            info_2 = String.Format(price);
        }
        if (tab == false) {
            info = info_1;
        }
        else {
            info = info_2;
        }
        return info;
    }
    catch {
        return "0";
    }
   
}

const DateToText = (ngay) => {       
    try {
        const Bngay = new Date(ngay);
        const homnay = Date.now();
        const diffTime = Math.abs(homnay - Bngay);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));        
        if (diffDays == 1) {
            return "Hôm nay";
        }
        else if (diffDays == 2) {
            return "Hôm qua";
        }
        else if (diffDays < 31) {
            return diffDays + " ngày trước";
        }
        else {
            return Bngay.toLocaleDateString();
        }
    }
    catch {
        return "--";
    }
}

//*** Hỗ Trợ Chuyển Đổi Ngày
function convertDay(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [day, month, year].join('-');
}

//***   Breadcrumbs
const ShowBreadcrumbs = (data, IDMENU, NAME) => {
    var info = "";    
    //const name = data.filter(item => item.ID_MENU == IDMENU);
    info += `<li class="breadcrumb-item"><a href='/' ><i class="fas fa-home mr-2"></i>Trang chủ</a></li>` + breadcrumbs(data, IDMENU,"", NAME);
    document.getElementById("api-breadcrumb").innerHTML = info;
}

const breadcrumbs = (data, idmenu, info, ten) => {
    var tam = "";
    if (idmenu != null && data.length > 0) {
        data.forEach(item => {
            if (item.ID_MENU == idmenu) {
                if (info == "") {
                    if (ten != null && ten != "") {
                        //info = `<li>${ten}</li>`;
                        tam = `<li class="breadcrumb-item">${chentheA(item, LINK_WEB, "")}</li>`;
                        info = tam + info;
                    } else {
                        info = `<li class="breadcrumb-item">${item.TEN_MENU}</li>`;                        
                    }
                } else {
                    tam = `<li class="breadcrumb-item">${chentheA(item, LINK_WEB, "")}</li>`;
                    info = tam + info;
                }
                info = breadcrumbs(data, item.ID_MENU_CHA, info, ten);                
            }
        });
    }
    return info;
}

const ShowHTML = (info) => {
    if (info == null) {
        return "";
    }
    else {
        return info;
    }
    
}


//***   Menu mobile
$("#menu_mobile").on("click", function () {   
    sideNavOpen();
})
$("#navMenuMobile .sideNav-bg").on("click", function () {
    sideNavClose();
})

$("#navMenuMobile .closebtn").on("click", function () {    
    sideNavClose();
})
function sideNavOpen() {
    $("#navMenuMobile .sideNav-bg").addClass("sideNav_open").removeClass("sideNav_close");
    $("#navMenuMobile .navContainer").addClass("navContainer_open").removeClass("navContainer_close");
};

function sideNavClose() {
    $("#navMenuMobile .sideNav-bg").addClass("sideNav_close").removeClass("sideNav_open");
    $("#navMenuMobile .navContainer").removeClass("navContainer_open").addClass("navContainer_close");
}

const Api_menu_mobile = (data, keyapi) => {   
    if (document.getElementById(keyapi) != null) {
        document.getElementById(keyapi).innerHTML = Show_menu_mobile(data);
        //EventMenuMobile();
    }
}

const Show_menu_mobile = (data) => {
    var info = "";
    info += "<ul>";
    info += "<li><a href='../'>Trang Chủ</a></li>";
    info += Dequi_menu_mobile(data, null, 0);
    info += "<li><a href='../lien-he'>Liên Hệ</a></li>";
    info += "</ul>";   
    return info;
}

const Dequi_menu_mobile = (data, idroot, lever) => {
    var info = "";
    data.forEach(item => {
        if (item.ID_MENU_CHA == idroot && lever < 3 && item.HIEN_THI == true) {
            if (item.ROOT == true && lever < 3) {
                info += "<li class='menu-item-has-children lv" + lever + "'>";
                info += chentheA(item, LINK_WEB, "");
                info += "<ul class='lv" + lever + "'>";
                info += Dequi_menu_mobile(data, item.ID_MENU, lever + 1);
                info += "</ul>";
                info += "</li>";
            }
            else {
                info += "<li>";
                info += chentheA(item, LINK_WEB, "");
                info += "</li>"
            }
        }
    });
    return info;
}

function EventMenuMobile() {
    $('#api_show_menu_mobile .menu-item-has-children').prepend('<i class="fa fa-chevron-right"></i>');
    //$('#api_show_menu_mobile ul > li > ul > li > a').prepend('- ');
    $('#api_show_menu_mobile ul > li.lv0 > ul').slideUp();
    $('#api_show_menu_mobile ul > li.lv1 > ul').slideUp(0);
    $('#api_show_menu_mobile > ul > li.lv0').click(function (e) {
        e.stopPropagation();
        var $el = $('ul.lv0', this);
        var $i = $(">i", this);
        if ($i.hasClass('fa-chevron-right')) {
            $(this).css("padding-bottom", "0px");
            $(this).find(">i.fa-chevron-right").removeClass('fa-chevron-right').addClass('fa-chevron-down');
        } else {
            $(this).css("padding-bottom", "10px");
            $(this).find(">i.fa-chevron-down").removeClass('fa-chevron-down').addClass('fa-chevron-right');
        }

        $el.stop(true, true).slideToggle(400);
    });

    $('#api_show_menu_mobile ul > li.lv1').click(function (e) {
        e.stopPropagation();
        var $el = $('ul', this);
        $('#api_show_menu_mobile ul > li.lv1 > ul').not($el).slideUp();
        var $i = $(">i", this);
        if ($i.hasClass('fa-chevron-right')) {
            $(this).css("padding-bottom", "0px");
            $(this).find(">i.fa-chevron-right").removeClass('fa-chevron-right').addClass('fa-chevron-down');
        } else {
            $(this).css("padding-bottom", "10px");
            $(this).find(">i.fa-chevron-down").removeClass('fa-chevron-down').addClass('fa-chevron-right');
        }
        $el.stop(true, true).slideToggle(400);
    });

    $('#api_show_menu_mobile > ul > li > ul > li').click(function (e) {
        e.stopPropagation();  // stop events from bubbling from sub menu clicks
    });
    $('#api_show_menu_mobile ul > li > ul > li > ul > li').click(function (e) {
        e.stopPropagation();  // stop events from bubbling from sub menu clicks
    });

}


//***    Tool menu bottom
function ToolMenuBottom() {
    $(".toolMenuBottom a").removeClass("active");       
    for (var i = 1; i < 6; i++) {
        var menu = document.getElementById("menu_"+i);
        if (menu.href == location.href) {
            menu.className = "active";
        }
    }
    
}

//***    Send mail contact
const SendMail = () => {    
    let name = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;
    
    if (name != null && name != "" && phone != null && phone != "" && subject != null && subject != "" && email != null && email != "") {
        jQuery.ajax({
            type: "post",
            url: SERVICE_URL + "/lienhe/" + name + "/" + phone + "/" + email + "/" + subject + "/" + message,
            dataType: "text",
        }).done(function (data) {
            name.value = "";
            email.value = "";
            phone.value = "";
            subject.value = "";
            message.value = "";
            alert('Yêu cầu của bạn đã gửi thành công , chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất')
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert('tin nhắn của bạn chưa được gửi, vui lòng thử lại');
        });
    }
    else {
        alert('Bạn chưa điền đầy đủ thông tin, vui lòng điền đầy đủ thông tin');
    }
}