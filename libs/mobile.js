import { getALL, URL_IMG } from "../api/urlAPI.js";
import { xuatQuangcao } from "./carousel.js";
let lstMobile = [];
let lstTmp = [];
let lstChude = [
    { Ma_so: "ALL", Ten: "Tất cả" },
    { Ma_so: "ANDROID", Ten: "Hệ điều hành ANDROID" },
    { Ma_so: "IPHONE", Ten: "Hệ điều hành IOS" },
]

const xuatChude = () => {
    let html = ``;
    lstChude.forEach((item) => {
        html += `
           <a href="javascript:void(0)" maChude="${item.Ma_so}"  class="${item.Ma_so == 'ALL' ? 'activeChude' : ''} list-group-item">${item.Ten}</a> 
        `
    })
    document.getElementById("thChude").innerHTML = html
}

const xuatDanhsachMobile = (elementID) => {
    let html = ``;
    lstTmp.forEach((item) => {
        html += `<div class="col-6 col-md-3 col-xl-3">
                <div class="card pt-2 mb-2">
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
                        <a href="javascript:void(0)" onclick="addToCart('${item.Ma_so}',2)" class="btn btn-sm btn-danger" title="Add to Cart">
                            <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>`;
    })
    document.getElementById("thTieude").innerHTML = `Danh sách Mobile (${lstTmp.length})`
    elementID.innerHTML = html;
}

const loadData = () => {
    // Open Modal
    document.getElementById("btnLoadData").click();
    getALL("LIST_MOBILE").then((result) => {
        lstMobile = result;
        lstTmp = result;
        lst.mobile = result;
        xuatDanhsachMobile(thListMobile);
        xuatChude();
        // Xử lý Lọc Sản phẩm theo Chủ đề
        let chuDes = document.querySelectorAll(".list-group-item");
        chuDes.forEach((item) => {
            item.onclick = () => {
                document.querySelectorAll(".activeChude")[0].classList.remove("activeChude");
                item.classList.add("activeChude");
                let maChude = item.getAttribute("maChude");
                lstTmp = lstMobile
                if (maChude != "ALL") {
                    lstTmp = lstMobile.filter((item) => item.Nhom.Ma_so == maChude);
                }

                xuatDanhsachMobile(thListMobile);
            }
        })
        // Xuất Quảng cáo
        xuatQuangcao(lstMobile, thQuangCao);
        // Close Modal
        document.getElementById("btnCloseLoadData").click();
    })
}

loadData();

document.getElementById("btnGia").onclick = () => {
    let keySort = document.getElementById("btnGia").getAttribute("sort");
    // keySort==1 Tăng keySort==0 Giảm
    if (Number(keySort == 1)) {
        document.getElementById("btnGia").setAttribute("sort", 0);
        document.getElementById("btnGia").innerHTML = "Giá &UpArrow;"
        // Number
        lstTmp.sort((a, b) => {
            return Number(a.Don_gia_Ban) - Number(b.Don_gia_Ban)
        })
    } else {
        document.getElementById("btnGia").setAttribute("sort", 1);
        document.getElementById("btnGia").innerHTML = "Giá &DownArrow;"
        // Number
        lstTmp.sort((a, b) => {
            return Number(b.Don_gia_Ban) - Number(a.Don_gia_Ban)
        })
    }
    xuatDanhsachMobile(thListMobile);
}

document.getElementById("btnTen").onclick = () => {
    let keySort = document.getElementById("btnTen").getAttribute("sort");
    // keySort==1 Tăng keySort==0 Giảm
    if (Number(keySort == 1)) {
        document.getElementById("btnTen").setAttribute("sort", 0);
        document.getElementById("btnTen").innerHTML = "Tên &UpArrow;"
        // String
        lstTmp.sort((a, b) => {
            return a.Ten.toLowerCase().localeCompare(b.Ten.toLowerCase())
        })

    } else {
        document.getElementById("btnTen").setAttribute("sort", 1);
        document.getElementById("btnTen").innerHTML = "Tên &DownArrow;"
        // String
        lstTmp.sort((a, b) => {
            return b.Ten.toLowerCase().localeCompare(a.Ten.toLowerCase())
        })
    }

    xuatDanhsachMobile(thListMobile);
}

document.getElementById("btnTim").onclick = () => {
    let gt = document.getElementById("thTim").value;
    lstTmp = lstMobile.filter((item) => item.Ten.toLowerCase().includes(gt.toLowerCase()));
    xuatDanhsachMobile(thListMobile);
}






