import { getALL, URL_IMG } from "../note/urlAPI.js";
let lstHome = [];
const xuatSanPhamBanChay = (elementID,nhom=1) => {
    let html = ``;
    lstHome.slice(0, 4).forEach((item) => {
        html += `<div class="col-6 col-md-3 col-xl-3">
                <div class="card pt-2">
                    <img class="card-img-top img-fluid" src="${URL_IMG}/${item.Ma_so}.png" alt="">
                    <div class="card-body">
                        <h6 class="card-title text-gray">${item.Ten}</h6>
                        <p class="card-text text-danger">Giá: ${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup> </p>
                        <h6 class="text-gray">${item.Nhom.Ten}</h6>
                    </div>
                    <div class="card-footer text-right">
                        <a href="javascript:void(0)" onclick="showModal(this)" class="btn btn-sm btn-success" title="Read More ...">
                            <i class="fa fa-file-text" aria-hidden="true"></i>
                        </a>
                        <a href="javascript:void(0)" onclick="addToCart('${item.Ma_so}',${nhom})" class="btn btn-sm btn-danger" title="Add to Cart">
                            <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>`;
    })
    html += `<div class="col-12 text-right mt-2">
                <a href="#" class="btn btn-sm btn-outline-success">Read More</a>
            </div>`
    elementID.innerHTML = html;
}

const loadData=()=>{
    // Open Modal
    document.getElementById("btnLoadData").click();
    getALL("LIST_TIVI").then((result) => {
    lstHome = result;
    lst.tivi= result;
    xuatSanPhamBanChay(thListTivi,1);
    getALL("LIST_MOBILE").then((result) => {
        lstHome = result;
        lst.mobile= result;
        xuatSanPhamBanChay(thListMobile,2);
        getALL("LIST_FOOD").then((result) => {
            lstHome = result;
            lst.food= result;
            xuatSanPhamBanChay(thListFood,3);
            // Close Modal
            document.getElementById("btnCloseLoadData").click();
        })
    })
})
}

loadData();
