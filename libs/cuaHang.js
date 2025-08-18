import { getALL } from "../api/urlAPI.js";
let cuaHang={};

const xuatCuaHang =(elementID)=>{
    let html=``;
    html+= `
        <div class="container">
            <h1 class="display-3 text-danger">${cuaHang.Ten}</h1>
            <p class="lead">${cuaHang.Dia_chi} - ${cuaHang.Dien_thoai}</p>
            <hr class="my-2">
            <p>Email: ${cuaHang.Email}</p>
            <p class="lead">
                <a class="btn btn-primary" href="../about" role="button">Xem thêm</a>
            </p>
        </div>
    `
    elementID.innerHTML= html;
}

getALL("LIST_STORE").then((result)=>{
    cuaHang= result[0];
    console.log(cuaHang);
    xuatCuaHang(thCuaHang)
}).catch((err)=>{
    console.log(err)
})

