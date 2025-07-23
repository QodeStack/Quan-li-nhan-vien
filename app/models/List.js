export class List {
    arrNhanVien = [];
    themNhanVien(nhanVienMoi) {
        this.arrNhanVien.push(nhanVienMoi);
    }
    hienThi(idTable) {
        let tBodyTable = document.querySelector(`#${idTable}`);
        tBodyTable.innerHTML = '';
        let index =0;
        for (let NV of this.arrNhanVien) {
            if (NV.checkChucVu == false ){
            if (NV.chucvu == 'Sếp') NV.luongCB *=3;
                else if (NV.chucvu == 'Trưởng phòng') NV.luongCB *=2;}
            NV.checkChucVu = true;
            let xepLoai ='';
            if (NV.gioLam>=192) xepLoai = 'xuất sắc';
                else if (NV.gioLam>=176) xepLoai ='giỏi';
                    else if (NV.gioLam>=160) xepLoai ='khá';
                        else xepLoai ='trung bình';
            NV.xepLoai = xepLoai;
            tBodyTable.innerHTML += `
                <tr>
					<th>${NV.tknv}</th>
									<th>${NV.name}</th>
									<th>${NV.email}</th>
									<th>${NV.datepicker}</th>
									<th>${NV.chucvu}</th>
									<th>${NV.luongCB}</th>
									<th>${NV.xepLoai}</th>
                                    <th>
                                        <button id='btnEdit' class="btn btn-primary" data-toggle="modal" data-target="#myModal"
                                        onclick="chinhSuaNhanVien('${index}')">
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button class="btn btn-danger" onclick="xoaNhanVien('${index}')">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </th>
				</tr>
            `
            index++;           
        }
    }
    //7. Xóa nhân viên
    xoaNhanVien(indexDel){
        this.arrNhanVien.splice(indexDel,1);
    }
    // Lưu dữ liệu về máy chủ 
    luuLocalStorage(){
        let str = JSON.stringify(this.arrNhanVien);
        localStorage.setItem('arrNhanVien',str);
    }
    // Lấy dữ liệu từ máy chủ bỏ vào object 
    loadLocalStorage(){
        if (localStorage.getItem('arrNhanVien')){
            let str = localStorage.getItem('arrNhanVien');
            this.arrNhanVien = JSON.parse(str);
        }
    }
    capNhatNhanVien(indexUpdate,nhanVienUpdate){
        let nhanVienPresent = this.arrNhanVien[indexUpdate];
        for (let index in nhanVienUpdate){
            nhanVienPresent[index] = nhanVienUpdate[index];
        }
    }
    //9. Tìm Nhân Viên theo loại (xuất săc, giỏi, khá...) và hiển thị
    filterNhanVien(dkNhanVien){
        this.luuLocalStorage();
        if (dkNhanVien != ''){
            this.arrNhanVien = this.arrNhanVien.filter(obItem => obItem.xepLoai == dkNhanVien);      
        }
    }
}