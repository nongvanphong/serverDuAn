# cách cài đặt môi trường

# đứng ở thư mục severduan

--vào terminal npm install hoactj là npm i

# b1

-- tải mysql phiên bản 8.0 trở lên ( không phải là mysqladmin)

# b2

-- mở dự án
-- mở terminal gõ cd databases -> npx sequelize-cli db:migrate
-- mở terminal gõ cd databases -> npx sequelize-cli db:seed:all
-- không lỗi là ok

# vào file .env

DB_HOST = dịa chỉ của mysql --- không biết thì để localhost
DB_PORT =post của mysql
DB_USERNAME = nếu có thì điền vào nếu không thì để root
DB_PASSWORD = nếu có thì điền vào nếu không thì để trống
DB_DATABASE = tên db của bạn tên này phỉa đúng với tên db trong cơ sở dữ liệu
NAME_SQL = nếu dử dụng msql thì ghi mysql vào đây

# quay ra thư mục gốc và chạy
