import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [DialogService]
})
export class MenuComponent {
  yourData: any[] = [
    { dishName: 'Phở Gà', type: 'Soup', price: 10.99, status: 'Active' },
    { dishName: 'Bánh Mì', type: 'Sandwich', price: 15.99, status: 'Inactive' },
    { dishName: 'Gỏi Cuốn', type: 'Appetizer', price: 12.49, status: 'Active' },
    { dishName: 'Bún Riêu', type: 'Noodle Soup', price: 18.99, status: 'Inactive' },
    { dishName: 'Cơm Gà Xối Mỡ', type: 'Rice Dish', price: 14.29, status: 'Active' },
    { dishName: 'Bánh Xèo', type: 'Pancake', price: 22.99, status: 'Inactive' },
    { dishName: 'Cơm Niêu', type: 'Rice Dish', price: 16.79, status: 'Active' },
    { dishName: 'Bánh Tráng Trộn', type: 'Appetizer', price: 20.49, status: 'Inactive' },
    { dishName: 'Bún Thịt Nướng', type: 'Noodle Dish', price: 11.99, status: 'Active' },
    { dishName: 'Bánh Canh Cua', type: 'Noodle Soup', price: 25.49, status: 'Inactive' },
    { dishName: 'Bánh Bèo', type: 'Appetizer', price: 17.99, status: 'Active' },
    { dishName: 'Hủ Tiếu', type: 'Noodle Dish', price: 13.59, status: 'Inactive' },
    { dishName: 'Mì Quảng', type: 'Noodle Dish', price: 19.79, status: 'Active' },
    { dishName: 'Bánh Canh Ghẹo', type: 'Noodle Soup', price: 14.99, status: 'Inactive' },
    { dishName: 'Bún Bò Huế', type: 'Noodle Soup', price: 21.29, status: 'Active' },
    { dishName: 'Bánh Mì Hòa Mã', type: 'Sandwich', price: 16.49, status: 'Inactive' },
    { dishName: 'Bánh Đập', type: 'Pancake', price: 12.99, status: 'Active' },
    { dishName: 'Bánh Tráng Nướng', type: 'Pancake', price: 23.99, status: 'Inactive' },
    { dishName: 'Bánh Mì Chảo', type: 'Sandwich', price: 15.79, status: 'Active' },
    { dishName: 'Bánh Bao', type: 'Appetizer', price: 19.49, status: 'Inactive' },
    { dishName: 'Gỏi Xôi', type: 'Appetizer', price: 24.99, status: 'Active' },
    { dishName: 'Cơm Sườn', type: 'Rice Dish', price: 13.29, status: 'Inactive' },
    { dishName: 'Bánh Bột Lọc', type: 'Appetizer', price: 18.49, status: 'Active' },
    { dishName: 'Chả Cá Lã Vọng', type: 'Fish Dish', price: 22.79, status: 'Inactive' },
    { dishName: 'Bún Mọc', type: 'Noodle Dish', price: 17.29, status: 'Active' },
    { dishName: 'Gỏi Cuốn Tôm Thịt', type: 'Appetizer', price: 20.99, status: 'Inactive' },
    { dishName: 'Bánh Cuốn', type: 'Appetizer', price: 14.49, status: 'Active' },
    { dishName: 'Hoa Quả Dầm', type: 'Dessert', price: 23.49, status: 'Inactive' },
    { dishName: 'Bánh Mì Pate', type: 'Sandwich', price: 16.89, status: 'Active' },
    { dishName: 'Bánh Tét', type: 'Appetizer', price: 25.99, status: 'Inactive' },
];


  searchText: string = '';
  displaySidebar: boolean = false;
  selectedDish: any;
  displayDialog: boolean = false;
  newDish: any = {};
  dt: any; // Thêm thuộc tính dt
  editingDish: any;

  constructor(private dialogService: DialogService) {}


  matchesSearch(row: any): boolean {
    const searchTextLower = this.searchText.toLowerCase();
    return (
      row.dishName.toLowerCase().includes(searchTextLower) ||
      row.type.toLowerCase().includes(searchTextLower) ||
      row.status.toLowerCase().includes(searchTextLower)
    );
  }
    // Hàm để hiển thị Dialog

  viewDetails(row: any): void {
    this.selectedDish = row;
    this.displaySidebar = true;
  }

  hideSidebar(): void {
    this.displaySidebar = false;
  }

  toggleSidebar(): void {
    this.displaySidebar = !this.displaySidebar;
  }
  approveDish(row: any) {
    row.approved = true;
    // Thêm logic lưu trạng thái duyệt vào cơ sở dữ liệu nếu cần
  }
  onGlobalFilter(dt: any, event: any) {
    // Logic xử lý tìm kiếm ở đây
  }
  addDish() {
    this.displayDialog = true; // Hiển thị form thêm món ăn
    this.selectedDish = {}; // Reset dữ liệu món ăn được chọn (nếu có)
  }
   
  deleteDish(row: any) {
    // Hiển thị hộp thoại xác nhận xóa
    if (confirm(`Are you sure you want to delete ${row.dishName}?`)) {
      // Thực hiện logic xóa món ăn khỏi danh sách
      const index = this.yourData.indexOf(row);
      if (index !== -1) {
        this.yourData.splice(index, 1);
      }
    }
  }
  showDialog() {
    this.newDish = {}; // Đặt lại đối tượng món ăn mới trước khi mở form
    this.displayDialog = true; // Hiển thị form
  }
  
  // Hàm lưu món ăn mới
  saveDish() {
    // Thêm logic để lưu món ăn mới vào danh sách
    this.yourData.push({ ...this.newDish });
    this.displayDialog = false; // Đóng form sau khi lưu
  }
  
  // Hàm hủy bỏ đóng form
  cancelDish() {
    this.displayDialog = false; // Đóng form
  }
  editDish() {
    // Khởi tạo biến `editingDish` với dữ liệu của món ăn được chọn
    this.editingDish = { ...this.selectedDish };
  }
  
  saveEditedDish() {
    // Thêm logic để lưu dữ liệu món ăn sau khi chỉnh sửa
    // Ví dụ: Cập nhật dữ liệu trong danh sách `yourData`
    // và đặt lại giá trị của `selectedDish` và `editingDish` về null.
    // Sau đó, đóng p-sidebar nếu bạn muốn.
    this.selectedDish = { ...this.editingDish };
    this.editingDish = null;
    this.displaySidebar = false;
  }
  
  cancelEdit() {
    // Hủy bỏ sự chỉnh sửa và đặt lại giá trị của `editingDish` về null.
    this.editingDish = null;
  }
}
