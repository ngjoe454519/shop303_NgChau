import { apiLienhe } from "../api/urlAPI.js";

document.getElementById("btnGui").onclick = () => {
    document.getElementById("errHoten").innerHTML = ""
    document.getElementById("errEmail").innerHTML = ""
    document.getElementById("errTieude").innerHTML = ""
    document.getElementById("errNoidung").innerHTML = ""

    let hoTen = document.getElementById("thHoten").value;
    let email = document.getElementById("thEmail").value;
    let tieuDe = document.getElementById("thTieude").value;
    let noidung = CKEDITOR.instances.thNoidung.getData();
    // Kiểm tra dữ liệu: khác rỗng
    if (hoTen == "") {
        // Thông báo
        document.getElementById("errHoten").innerHTML = "(*)"
        document.getElementById("ho_ten").focus();
        return false;
    }
    if (email == "") {
        // Thông báo
        document.getElementById("errEmail").innerHTML = "(*)"
        document.getElementById("email").focus();
        return false;
    }

    let html = `<h4>Họ tên: ${hoTen}</h4>`;
    html += `Email: ${email}<br />`;
    html += `<p><b>Nội dung</b></p>`;
    html += `${noidung}`;
    let thongTin = {
        tieude: tieuDe,
        noidung: html
    }
    // Gọi API
    apiLienhe(thongTin).then(result => {
        console.log(result);
        if (result.noi_dung) {
            alert(`Cám ơn bạn. Chúng tôi sẽ trả lời sớm nhất cho bạn`);
        } else {
            alert(`Cám ơn bạn. Hiện tại việc gởi mail có sự cố, bạn có thể liên hệ với chúng tôi qua số hotline: 099999999`);
        }
        window.history.back();
    })



}
