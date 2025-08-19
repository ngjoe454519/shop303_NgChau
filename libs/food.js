import { getALL, URL_IMG } from "../api/urlAPI.js";
import { xuatQuangcao } from "./carousel.js";
let lstFood = [];
let lstTmp = [];
let lstChude = [
    { Ma_so: "ALL", Ten: "Tất cả" },
    { Ma_so: "MON_AN", Ten: "Món ăn" },
    { Ma_so: "CA_PHE", Ten: "Nước uống" },
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

const xuatDanhsachFood = (elementID) => {
    let html = ``;
    lstTmp.forEach((item) => {
        html += `<div class="col-6 col-md-3 col-xl-3 mb-3">
                <div class="card mobile-card pt-2">
                    <img class="card-img-top img-fluid" src="${URL_IMG}/${item.Ma_so}.png" alt="${item.Ten}">
                    <div class="card-body text-center">
                        <h6 class="card-title">${item.Ten}</h6>
                        <span class="badge-nhom">${item.Nhom.Ten}</span>
                        <p class="card-text">${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></p>
                    </div>
                    <div class="card-footer text-center">
                        <a href="javascript:void(0)" onclick="showModal(this)" class="btn btn-sm btn-success" title="Xem chi tiết">
                            <i class="fa fa-file-text" aria-hidden="true"></i>
                        </a>
                        <a href="javascript:void(0)" onclick="addToCart('${item.Ma_so}',3)" class="btn btn-sm btn-danger" title="Thêm vào giỏ">
                            <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>`;
    })
    document.getElementById("thTieude").innerHTML = `Danh sách Food (${lstTmp.length})`
    elementID.innerHTML = html;
}

const loadData = () => {
    // Open Modal
    document.getElementById("btnLoadData").click();
    getALL("LIST_FOOD").then((result) => {
        lstFood = result;
        lstTmp = result;
        lst.food = result;
        xuatDanhsachFood(thListFood);
        xuatChude();
        // Xử lý Lọc Sản phẩm theo Chủ đề
        let chuDes = document.querySelectorAll(".list-group-item");
        chuDes.forEach((item) => {
            item.onclick = () => {
                document.querySelectorAll(".activeChude")[0].classList.remove("activeChude");
                item.classList.add("activeChude");
                let maChude = item.getAttribute("maChude");
                lstTmp = lstFood
                if (maChude != "ALL") {
                    lstTmp = lstFood.filter((item) => item.Nhom.Ma_so == maChude);
                }

                xuatDanhsachFood(thListFood);
            }
        })
        // Xuất Quảng cáo
        xuatQuangcao(lstFood, thQuangCao);
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
    xuatDanhsachFood(thListFood);
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

    xuatDanhsachFood(thListFood);
}

document.getElementById("btnTim").onclick = () => {
    let gt = document.getElementById("thTim").value;
    lstTmp = lstFood.filter((item) => item.Ten.toLowerCase().includes(gt.toLowerCase()));
    xuatDanhsachFood(thListFood);
}






