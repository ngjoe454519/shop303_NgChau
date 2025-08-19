import { getALL } from "../api/urlAPI.js";
let cuaHang={};

const xuatCuaHang =(elementID)=>{
    let html=``;
    html+= `
      
    `
    elementID.innerHTML= html;
}

getALL("LIST_STORE").then((result)=>{
    cuaHang= result[0];
    console.log(cuaHang);
    xuatCuaHang(thCuaHang);
    // Hiển thị tên cửa hàng (có icon)
    document.getElementById("tencuahang").innerHTML = `${cuaHang.Ten ? cuaHang.Ten : "Shop 303"}`;
    // Hiển thị thông tin cửa hàng
    document.getElementById("diachi").innerText = cuaHang.Dia_chi || "Địa chỉ"; 
    document.getElementById("dienthoai").innerText = cuaHang.Dien_thoai || "Số điện thoại";  
    document.getElementById("email").innerText = cuaHang.Email || "Email"; 
}).catch((err)=>{
    console.log(err);
      
})

