# Data_Management
USGE version 2.0
1. Khi mới clone về (đối với máy chưa tạo database lần nào) chạy câu lệnh ALTER USER 'root'@'localhost' IDENTIFIED BY '12345';
2. Sau đó chạy lại full database do tui đã thay đổi nhiều thuộc tính.
3. Để thêm toàn bộ phim thì truy cập vào đường dẫn: http://localhost:3000/admin/createFilm/true, sau đó copy toàn bộ dữ liệu từ file data.json vô phần body raw của postman với định dang:
	[
		film1,
		flim2,
		....
	]
4. Phần server mấy fen coi lại phần route, model, controller do tui đã thêm cái Admin và có chỉnh sửa một số thứ.
5. Phần client mấy fen cũng coi thêm phần route, service do tui cũng có chỉnh sửa.
