/*
    localstorage : dùng để lưu dữ liệu ở máy tính người dùng 
    .setItem('key',value) : lưu dữ liệu value với key tương ứng     
    .getItem('key'): lấy dữ liệu tương ứng keyName
    .removeItem('key') : xóa dữ liệu với key name tương ứng 
    localstorage chỉ lưu dữ liệu primitive value (number,string,null,bool,..) không lưu được object hay array
*/
//3. Tạo đối tượng nhân viên với thông tin lấy từ form người dùng nhập vào
import { List } from "./List.js";
import { NhanVien } from "./NhanVien.js";
let listNV = new List();
document.querySelector('#btnThemNV').onclick = function () {
    
    let nhanVien = new NhanVien();
    let arrInputTag = document.querySelectorAll('#frmNhap input,#frmNhap select');
    let validation = true;
    for (let tag of arrInputTag) {
        if (tag.id == 'tknv') {
            let vdt = true;
            let str = tag.value;
            if (str == '' || str == 'Không được để trống') { vdt = false; tag.value = "Không được để trống"; tag.classList.add("text-danger"); }
            else {
                if (str.length > 6 || str.length < 4) vdt = false;
                for (let char of str)
                    if (char < '0' || char > '9') vdt = false;
                if (vdt == false) {
                    validation = false;
                    tag.value = "Tối đa 4 - 6 ký tự số";
                    tag.classList.add("text-danger");
                }
                else tag.classList.remove("text-danger");
            }
        } else if (tag.id == 'name') {
            let vdt = true;
            let str = tag.value;
            if (str == '' || str == 'Không được để trống') { vdt = false; tag.value = "Không được để trống"; tag.classList.add("text-danger"); }
            else {
                for (let char of str) {
                    if (char > '0' && char < '9') vdt = false;
                    if (vdt == false) {
                        validation = false;
                        tag.value = "Tên nhân viên phải là chữ";
                        tag.classList.add("text-danger");
                    } else tag.classList.remove("text-danger");
                }
            }
        } else if (tag.id == 'email') {
            let str = tag.value;
            let vdt = true;
            if (str == '' || str == 'Không được để trống') { vdt = false; tag.value = "Không được để trống"; tag.classList.add("text-danger"); }
            else {
                let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                vdt = emailPattern.test(tag.value);
                if (vdt == false) {
                    validation = false;
                    tag.value = "Email chưa đúng định dạng";
                    tag.classList.add("text-danger");
                } else tag.classList.remove("text-danger");
            }
            // }else if (tag.id =='password'){
            //     let str = tag.value;
            //     if (str=='') alert("Không được để trống mật khẩu");
            //     else{
            //         let pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{6,10}$/;
            //         let vdt = pattern.test(password);
            //         if (vdt==false){
            //             validation=false;
            //             tag.value = '';
            //             alert("Mật khẩu phải từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");  
            //         }
            //     }
            // 
        } else if (tag.id == 'password') {
            const matKhau = tag.value.trim();
            if (matKhau == '') alert("Mật khẩu không được để trống");
            else{
            const reMatKhau = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
            if (!reMatKhau.test(matKhau)) {
            alert("Mật khẩu phải dài từ 6–10 ký tự, có ít nhất 1 số, 1 chữ in hoa và 1 ký tự đặc biệt.");}
}
        } else if (tag.id == "luongCB") {
            let luong = +tag.value;
            if (!luong || isNaN(luong)) {
                tag.value = 'Không hợp lệ!';
                tag.classList.add("text-danger");
                validation = false;
            }
            else {
                let vdt = luong >= 1000000 && luong <= 20000000;
                if (vdt == false) {
                    validation = false;
                    tag.value = " Lương thuộc 1000000-20000000 !";
                    tag.classList.add("text-danger");
                }
                else tag.classList.remove("text-danger");
            }

        } else if (tag.id == 'gioLam') {
            if (tag.value < 80 || tag.value > 200) {
                tag.value = 'Số giờ thuộc 80->200';
                tag.classList.add("text-danger");
                validation = false;
            }
        } else if (tag.id == 'chucvu') {
            if (tag.value == 'Chọn chức vụ') {
                alert('Vui lòng chọn chức vụ');
                validation = false;
            }
        } else tag.classList.remove("text-danger");
    }
    if (validation == true) {
        for (let tag of arrInputTag) {
            let id = tag.id;
            let value = tag.value;
            nhanVien[id] = value;
        }
        // console.log(nhanVien);
        listNV.themNhanVien(nhanVien);
        //console.log(listNV);
        listNV.hienThi('tableDanhSach');
        listNV.luuLocalStorage();
    }

}
//7. Xóa nhân viên
window.xoaNhanVien = function (indexDel) {
    //console.log(indexDel);
    listNV.xoaNhanVien(indexDel);
    //listNV.luuLocalStorage();
    listNV.hienThi('tableDanhSach');
    listNV.luuLocalStorage();

}
//8. Cập nhật nhân viên (có validation)
window.chinhSuaNhanVien = function (indexEdit) {
    //console.log(indexEdit);
    //console.log("object edit",listNV.arrNhanVien[indexEdit]);
    document.querySelector('#btnThemNV').classList.add('d-none');
    let arrNV = listNV.arrNhanVien[indexEdit];
    console.log(arrNV);
    let arrInputTag = document.querySelectorAll('#frmNhap input,#frmNhap select');
    for (let input of arrInputTag) {
        input.value = arrNV[input.id];
    }
    // Tạo thuộc tính trên nút cập nhật chứa index
    let btnCapNhat = document.querySelector('#btnCapNhat');
    // setAttribute thêm 1 thuộc tính trên thẻ  
    btnCapNhat.setAttribute('data-index-edit', indexEdit);
}

/*
localStorage.setItem('hoTen','Dương Danh Quốc');
    ----JSON method-----
    object -> string : JSON.stringify(object);
    string -> object : JSON.parse(string); 
 
let str = JSON.stringify({id:1,ten:'DuongQuoc',tuoi:19});
localStorage.setItem('thong tin',str);
 
let output = JSON.parse(localStorage.getItem('thong tin'));
console.log(output);
*/

window.onload = function () {
    // Khi html js load xong thì hàm này tự động chạy 
    listNV.loadLocalStorage();
    // Sau khi load dữ liệu cũ thì tạo bảng 
    listNV.hienThi('tableDanhSach');
}

document.querySelector('#btnCapNhat').onclick = function (e) {
    // e.target : dom ngược lại thẻ đang xử lí sự kiện này 
    let indexEdit = e.target.getAttribute('data-index-edit');
    console.log("index Edit", indexEdit);
    // Lấy nhân viên sau khi người dùng chỉnh sửa 
    let arrInputTag = document.querySelectorAll('#frmNhap input,#frmNhap select');
    let nhanVienUpdate = new NhanVien();
    for (let tag of arrInputTag) {
        nhanVienUpdate[tag.id] = tag.value;
    }
    // GỌi hàm để cập nhật lại nhân viên 
    listNV.capNhatNhanVien(indexEdit, nhanVienUpdate);
    // Hiển thị lại object ra bảng và lưu và localStorage
    listNV.hienThi('tableDanhSach');
    listNV.luuLocalStorage();
}
// 9. Tìm Nhân Viên theo loại (xuất săc, giỏi, khá...) và hiển thị
document.querySelector('#btnTimNV').onclick = function () {
    let value = document.querySelector('#searchName').value;
    console.log(value);
    listNV.filterNhanVien(value);
    listNV.hienThi('tableDanhSach');
    listNV.loadLocalStorage();
}
document.querySelector('#btnDong').onclick = function(){
    document.querySelector('#btnThemNV').classList.remove('d-none');
}

