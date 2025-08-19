const load =()=>{
    let html = '';
    html += `<div class="custom-loading-overlay">
                <div class="spinner-border text-danger custom-loading-spinner" role="status"></div>
                <div class="custom-loading-text">Đang tải dữ liệu...</div>
            </div>`;
    document.getElementById("thLoad").innerHTML = html;
}

export {load}