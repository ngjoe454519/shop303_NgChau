let URL_IMG="https://hephucvu-1k69.onrender.com";
let carts = [];
let lst = {};
/*
    Collection:
        Tivi: 1
        Mobile: 2
        Food: 3
*/

const addToCart = (maSo, Nhom) => {
    let result = (Nhom == 1) ? lst.tivi : (Nhom == 2) ? lst.mobile : lst.food;
    // console.log(`${maSo} - ${Nhom}`);
    let key = maSo;
    let value = 1;
    let vt = -1;

    // Lưu vào sessionStorage
    if (sessionStorage.getItem("carts") != undefined) {
        carts = JSON.parse(sessionStorage.getItem("carts"))
        vt = carts.findIndex(item => item.maso == key);
    }

    if (vt == -1) {
        let tmp = result.find(x => x.Ma_so == key);
        let cart = {
            maso: key,
            soluong: value,
            ten: tmp.Ten,
            dongiaban: Number(tmp.Don_gia_Ban),
            nhom: Nhom
        }

        carts.push(cart) // Thêm
    } else {
        carts[vt].soluong += value // Cập nhật lại số lượng
    }
    //console.log(carts);

    if (carts.length > 0) {
        sessionStorage.setItem("carts", JSON.stringify(carts));
    } else {
        sessionStorage.removeItem("carts");
    }

    Th_Gio_hang.innerHTML = carts.length;
}

const openCart = () => {
    if (sessionStorage.getItem("carts") != undefined) {
        window.location = `../cart/`
    }
}

const capNhatSoluong = (key, tagSoluong) => {
    //console.log(`${key} - ${tagSoluong.value}`);
    let soLuongMoi = tagSoluong.value;
    carts = JSON.parse(sessionStorage.getItem("carts"));
    let vt = carts.findIndex(item => item.maso == key);
    carts[vt].soluong = soLuongMoi
    let thanhTien = soLuongMoi * carts[vt].dongiaban;
    // // Cập nhật lại cart sessionStorage
    sessionStorage.setItem("carts", JSON.stringify(carts));
    document.getElementById(`tt${key}`).innerHTML = `${thanhTien.toLocaleString()}<sup>đ</sup>`
    tongThanhtien();
}
const xoaGiohang = () => {
    sessionStorage.removeItem("carts");
    window.history.back();
}

const tongThanhtien = () => {
    let tong = 0
    carts = JSON.parse(sessionStorage.getItem("carts"));
    carts.forEach(item => {
        tong += Number(item.soluong) * Number(item.dongiaban);
    })
    Th_Tong.innerHTML = `Tổng thành tiền:${tong.toLocaleString()}<sup>đ</sup>`
}
const xoaSanpham = (key) => {
    //console.log(key);
    carts = JSON.parse(sessionStorage.getItem("carts"));
    let vt = carts.findIndex(item => item.maso == key);
    // Xóa Key cart
    carts.splice(vt, 1);
    // Cập nhật lại cart sessionStorage
    sessionStorage.setItem("carts", JSON.stringify(carts));
    // Xuất Cart
    if (carts.length != 0) {
        xuatSanphamMua(carts);
    } else {
        xoaGiohang();
    }
}
const xuatSanphamMua = (carts = []) => {
    let html = ``;
    carts.forEach((item) => {
        let thanhTien = item.soluong * item.dongiaban
        html += `
        <tr class="text-nowrap">
              <td scope="row" class="text-center" style="width:10%">
                <img class="img-fluid" src="${URL_IMG}/${item.maso}.png" alt="">
              </td>
              <td>${item.ten}</td>
              <td class="text-right">
                <input type="number" min="1" max="10" value="${item.soluong}" onchange="capNhatSoluong('${item.maso}',this)">
              </td>
              <td class="text-right">
              ${item.dongiaban.toLocaleString()}<sup>đ</sup>
              </td>
              <td class="text-right" id="tt${item.maso}">
              ${thanhTien.toLocaleString()}<sup>đ</sup>
              </td>
              <td class="text-center">
                <button class="btn btn-danger btn-sm" onclick="xoaSanpham('${item.maso}')">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
        `
    })
    html += `
    <tr class="text-nowrap">
        <td colspan="6" class="text-right text-danger">
            <span id="Th_Tong" style="font-weight: bold;">Tổng Thành tiền:19.000.000<sup>đ</sup></span>
        </td>
    </tr>
    `
    thGiohangMua.innerHTML = html;
    tongThanhtien();
}

const datHang = () => {
    
    let dsDonHang = []
    carts = JSON.parse(sessionStorage.getItem("carts"));
    let Khach_hang = {
        "Ho_ten": document.querySelector("#hoTen").value,
        "Dien_thoai": document.querySelector("#dienThoai").value,
        "Email": document.querySelector("#email").value,
        "Dia_chi": document.querySelector("#thDiaChi").value
    }
    carts.forEach(item => {
        let donDathang = {
            "Ngay_Dat_hang": new Date().toLocaleDateString(),
            "Ngay_Giao_hang": document.querySelector("#ngayGiaoHang").value,
            "So_luong": Number(item.soluong),
            "Don_gia_Ban": Number(item.dongiaban),
            "Tien": Number(item.soluong) * Number(item.dongiaban),
            "Trang_thai": "CHUA_GIAO_HANG",
            "Khach_hang": Khach_hang
        };
        let maso = item.maso;
        let donhang = {
            nhom:item.nhom,
            key: maso,
            dathang: donDathang
        }
        dsDonHang.push(donhang)
        console.log(dsDonHang);
    })
    return dsDonHang;
    
}