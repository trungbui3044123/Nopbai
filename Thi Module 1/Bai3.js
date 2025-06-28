class SoTietKiem {
    constructor(maSo, loai, hoTen, cmnd, ngayMo, soTien) {
        this.maSo = maSo;
        this.loai = loai;
        this.hoTen = hoTen;
        this.cmnd = cmnd;
        this.ngayMo = ngayMo;
        this.soTien = soTien;
    }
}

let danhSachSo = [];

function validate(so) {
    if (so.maSo.length > 5 || so.loai.length > 10 || so.hoTen.length > 30) return false;
    if (!so.maSo || !so.loai || !so.hoTen || !so.cmnd || !so.ngayMo || !so.soTien) return false;
    if (isNaN(so.cmnd) || isNaN(so.soTien)) return false;
    return true;
}

function hienThi() {
    const tbody = document.getElementById("danhSach");
    tbody.innerHTML = "";
    danhSachSo.forEach(s => {
        tbody.innerHTML += `<tr>
            <td>${s.maSo}</td><td>${s.loai}</td><td>${s.hoTen}</td>
            <td>${s.cmnd}</td><td>${s.ngayMo}</td><td>${s.soTien}</td>
        </tr>`;
    });
}

function themSoTietKiem() {
    const maSo = document.getElementById("maSo").value.trim();
    const loai = document.getElementById("loaiTietKiem").value.trim();
    const hoTen = document.getElementById("hoTen").value.trim();
    const cmnd = parseInt(document.getElementById("cmnd").value);
    const ngayMo = document.getElementById("ngayMoSo").value;
    const soTien = parseFloat(document.getElementById("soTien").value);

    const msg = document.getElementById("message");
    if (danhSachSo.some(s => s.maSo === maSo)) {
        msg.textContent = "!! Mã sổ đã tồn tại!";
        msg.className = "error";
        return;
    }

    const soMoi = new SoTietKiem(maSo, loai, hoTen, cmnd, ngayMo, soTien);
    if (!validate(soMoi)) {
        msg.textContent = "△ Dữ liệu không hợp lệ!";
        msg.className = "error";
        return;
    }

    danhSachSo.push(soMoi);
    msg.textContent = "〇 Thêm thành công!";
    msg.className = "success";
    hienThi();
}

function xoaSoTietKiem() {
    const ma = prompt("Nhập mã sổ cần xoá:");
    const viTri = danhSachSo.findIndex(s => s.maSo === ma);
    if (viTri === -1) {
        alert("!!  Mã sổ không tồn tại!");
        return;
    }

    const xacNhan = confirm("Bạn có chắc muốn xoá sổ này không?");
    if (xacNhan) {
        danhSachSo.splice(viTri, 1);
        alert("〇  Đã xoá thành công!");
        hienThi();
    }
}
