
$(document).ready(function () {   
    apiPro(numpage);   
});
/*Gọi API Post */
const apiPro = async (page) => {    
    try {
        numpage = page;    
        //http://api.support.vnpage.vn/api/runquery/webportal/quangcaovinhan.com/select * from T_SAN_PHAM
        var strSQL = "select * from T_SAN_PHAM";       
        let data = await fetchAPI(`${SERVICE_URL_RUNQUERY}/${strSQL}`);   
        ShowMenu(data, 'div_menu_sanpham');      
    }
    catch (err) {
        Baoloi(err);
    }
}

/*Xử lý dữ liệu Post*/
const ShowMenu = (data, idAPI) => {
    var strTemp1 = "";
    strTemp1 = `
                    <div class="col-lg-8 col-md-9 visible-md visible-lg">
                        <nav id="main-menu" class="main-menu clearfix">
                            <ul>
                                <li class="level0 hd-pd">
                                    <a href="#">Trang Chủ</a>
                                </li>
                                <li class="level0 hd-pd">
                                    <a href="#">Giới Thiệu</a>
                                </li>
                                <li class="level0 parent col1 hd-pd">
                                    <a href="category_grid.html" title="Business Cards">
                                        <span>Dịch Vụ</span>
                                        <i class="fa fa-chevron-down"></i>
                                    </a>
                                    <ul class="level0">
                `;
    var strTemp2 = "";
    strTemp2 = `
                        </ul>
                                </li>
                                <li class="level0 hd-pd">
                                    <a href="#" title="Marketing">Sản Phẩm Khác</a>
                                </li>
                                <li class="level0 hd-pd">
                                    <a href="#" title="Postcards">Báo giá</a>
                                </li>
                                <li class="level0 hd-pd">
                                    <a href="#">Tin Tức</a>
                                </li>
                                <li class="level0 hd-pd">
                                    <a href="#">Liên Hệ</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

    `;
    var info = "";    
    data.forEach((item) => {
        info += `  
            <li class="level1 nav-1-1 first item">
                <a href="category_grid.html" title="Premium Business Cards">Premium Business Cards</a>
            </li>                  
        `;
    }
    );
    jQuery("#" + idAPI).append(strTemp1 + info + strTemp2);
};

