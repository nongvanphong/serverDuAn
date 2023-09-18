"use strict";
const bcrypt = require("bcrypt");
const { numberHash } = require("../../config");

const password = "123456";
const now = new Date();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Stores",
      [
        {
          email: "highdrink@gmail.com",
          store_phone_number: "0977777777",
          store_name: "High Drink",
          manager_phone_number: "0977777777",
          lat: 12.6917223,
          long: 108.0546495,
          image: "high_drink.jpg",
          address: "Đăk Lăk",
          status: 0,
          refresh_token: null,
          password: bcrypt.hashSync(password, numberHash),
          describe: `Tọa lạc ngay trung tâm Buôn Mê, Amour có đa dạng không gian từ trong “nhà” cho đến ngoài trời rooftop, bạn thoải mái lựa chọn nơi thích hợp nhất để tổ chức bữa tiệc của riêng mình. Trong không gian lung linh, còn gì tuyệt vời hơn khi cả nhà mình vừa ngồi trò chuyện tâm tình vừa thưởng thức các món Âu chuẩn vị được bày trí bắt mắt. 
          Một buổi tiệc sinh nhật gần gũi bên gia đình, bạn bè hay ngày kỉ niệm với người thương, chỉ cần đặt chân đến Amour, chúng tôi sẽ khiến buổi tiệc của bạn trở nên đáng nhớ hơn bao giờ hết `,
          createdAt: now,
          updatedAt: now,
        },

        // {
        //   email: "comtambatam@gmail.com",
        //   store_phone_number: "0394717172",
        //   store_name: "Cơm tấm",
        //   manager_phone_number: "0394717172",
        //   lat: 12.6917223,
        //   long: 108.0546495,
        //   image: null,
        //   address:
        //     "79 Văn Tiến Dũng, Tân An, Thành phố Buôn Ma Thuột, Đắk Lắk, Việt Nam",
        //   status: 0,
        //   refresh_token: null,
        //   password: bcrypt.hashSync(password, numberHash),
        //   describe:
        //     "Tuyệt vời cho khách du lịch Nhà nghỉ hiện đại nằm trên con phố rợp bóng cây gần nhiều quán bar và quán cà phê, cách Bảo tàng tỉnh Đăk Lăk và Chùa sắc tứ Khải Đoan rộng lớn 4 km và cách Sân bay Buôn Ma Thuột 9 km",
        //   createdAt: now,
        //   updatedAt: now,
        // },
        // {
        //   email: "phongon@gmail.com",
        //   store_phone_number: "0394717173",
        //   store_name: "Phở ngon",
        //   manager_phone_number: "0394717173",
        //   lat: 12.6917223,
        //   long: 108.0546495,
        //   image: null,
        //   address:
        //     "127A Hà Huy Tập, Tân Lợi, Thành phố Buôn Ma Thuột, Đắk Lắk 630000, Việt Nam",
        //   status: 0,
        //   refresh_token: null,
        //   password: bcrypt.hashSync(password, numberHash),
        //   describe:
        //     "Tuyệt vời cho khách du lịch Nhà nghỉ hiện đại nằm trên con phố rợp bóng cây gần nhiều quán bar và quán cà phê, cách Bảo tàng tỉnh Đăk Lăk và Chùa sắc tứ Khải Đoan rộng lớn 4 km và cách Sân bay Buôn Ma Thuột 9 km",
        //   createdAt: now,
        //   updatedAt: now,
        // },
        // {
        //   email: "comga123@gmail.com",
        //   store_phone_number: "0394717174",
        //   store_name: "Cơm gà",
        //   manager_phone_number: "0394717174",
        //   lat: 12.7120264,
        //   long: 108.0694648,
        //   image: null,
        //   address:
        //     "42 Phạm Hùng, Tân An, Thành phố Buôn Ma Thuột, Đắk Lắk 630000, Việt Nam",
        //   status: 0,
        //   refresh_token: null,
        //   password: bcrypt.hashSync(password, numberHash),
        //   describe:
        //     "Tuyệt vời cho khách du lịch Nhà nghỉ hiện đại nằm trên con phố rợp bóng cây gần nhiều quán bar và quán cà phê, cách Bảo tàng tỉnh Đăk Lăk và Chùa sắc tứ Khải Đoan rộng lớn 4 km và cách Sân bay Buôn Ma Thuột 9 km",
        //   createdAt: now,
        //   updatedAt: now,
        // },
        // {
        //   email: "laubo@gmail.com",
        //   store_phone_number: "0394717175",
        //   store_name: "Lẩu bò",
        //   manager_phone_number: "0394717175",
        //   lat: 12.712735,
        //   long: 108.0679248,
        //   image: null,
        //   address:
        //     "579 Tôn Đức Thắng, Tân Lợi, Thành phố Buôn Ma Thuột, Đắk Lắk 63000, Việt Nam",
        //   status: 0,
        //   refresh_token: null,
        //   password: bcrypt.hashSync(password, numberHash),
        //   describe:
        //     "Tuyệt vời cho khách du lịch Nhà nghỉ hiện đại nằm trên con phố rợp bóng cây gần nhiều quán bar và quán cà phê, cách Bảo tàng tỉnh Đăk Lăk và Chùa sắc tứ Khải Đoan rộng lớn 4 km và cách Sân bay Buôn Ma Thuột 9 km",
        //   createdAt: now,
        //   updatedAt: now,
        // },
        // {
        //   email: "caybang@gmail.com",
        //   store_phone_number: "0394717176",
        //   store_name: "Cây bàng",
        //   manager_phone_number: "0394717176",
        //   lat: 12.712735,
        //   long: 108.0679248,
        //   image: null,
        //   address:
        //     "P39F+2M5, Tân Hội, Thành phố Buôn Ma Thuột, Đắk Lắk, Việt Nam",
        //   status: 0,
        //   refresh_token: null,
        //   password: bcrypt.hashSync(password, numberHash),
        //   describe:
        //     "Tuyệt vời cho khách du lịch Nhà nghỉ hiện đại nằm trên con phố rợp bóng cây gần nhiều quán bar và quán cà phê, cách Bảo tàng tỉnh Đăk Lăk và Chùa sắc tứ Khải Đoan rộng lớn 4 km và cách Sân bay Buôn Ma Thuột 9 km",
        //   createdAt: now,
        //   updatedAt: now,
        // },
        // {
        //   email: "Hokkaido@gmail.com",
        //   store_phone_number: "0900996630",
        //   store_name: "Sushi Hokkaido Sachi Phan Xích Long",
        //   manager_phone_number: "0900996630",
        //   lat: 10.7986972,
        //   long: 106.6883454,
        //   image: null,
        //   address:
        //     "163 Phan Xích Long, Phường 2, Phú Nhuận, Thành phố Hồ Chí Minh 700000, Việt Nam",
        //   status: 0,
        //   refresh_token: null,
        //   password: bcrypt.hashSync(password, numberHash),
        //   describe:
        //     "Tuyệt vời cho khách du lịch Nhà nghỉ hiện đại nằm trên con phố rợp bóng cây gần nhiều quán bar và quán cà phê, cách Bảo tàng tỉnh Đăk Lăk và Chùa sắc tứ Khải Đoan rộng lớn 4 km và cách Sân bay Buôn Ma Thuột 9 km",
        //   createdAt: now,
        //   updatedAt: now,
        // },
        // {
        //   email: "phogaban@gmail.com",
        //   store_phone_number: "0242213033",
        //   store_name: "Phở Gà Bản",
        //   manager_phone_number: "0242213033",
        //   lat: 21.0240269,
        //   long: 105.8313094,
        //   image: null,
        //   address: "172 P. Tôn Đức Thắng, Hàng Bột, Đống Đa, Hà Nội, Việt Nam",
        //   status: 0,
        //   refresh_token: null,
        //   password: bcrypt.hashSync(password, numberHash),
        //   describe:
        //     "Tuyệt vời cho khách du lịch Nhà nghỉ hiện đại nằm trên con phố rợp bóng cây gần nhiều quán bar và quán cà phê, cách Bảo tàng tỉnh Đăk Lăk và Chùa sắc tứ Khải Đoan rộng lớn 4 km và cách Sân bay Buôn Ma Thuột 9 km",
        //   createdAt: now,
        //   updatedAt: now,
        // },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Stores", null, {});
  },
};
