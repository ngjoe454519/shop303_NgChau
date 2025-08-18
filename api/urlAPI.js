const URL_SERVICES="https://hephucvu-1k69.onrender.com";
const URL_IMG="https://hephucvu-1k69.onrender.com";

const getALL=(endPoint)=> {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onload = () => {
            let objResult = JSON.parse(xhr.responseText)
            resolve(objResult)
        }
        let urlAPI= `${URL_SERVICES}/${endPoint}`;
        xhr.open("GET", urlAPI )
        xhr.send()
    })
}

const apiDathang=(dsDonDathang)=>{
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onload = () => {
            let objResult = JSON.parse(xhr.responseText)
            resolve(objResult)
        }
        let endPoint="DATHANG";
        let urlAPI= `${URL_SERVICES}/${endPoint}`;
        xhr.open("POST", urlAPI )
        xhr.send(JSON.stringify(dsDonDathang));
    })
}
const apiLienhe=(thongTin)=>{
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onload = () => {
            let objResult = JSON.parse(xhr.responseText)
            resolve(objResult)
        }
        let endPoint="LIENHE";
        let urlAPI= `${URL_SERVICES}/${endPoint}`;
        xhr.open("POST", urlAPI )
        xhr.send(JSON.stringify(thongTin));
    })
}

export {URL_IMG, URL_SERVICES, getALL,apiDathang, apiLienhe}
