"use strict";
const now = new Date();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          store_id: 1,
          cg_id: 1,
          name_product: "trà sữa đường đen",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          options: `[{"price":20000,"size":"s"},{"price":25000,"size":"M"},{"price":30000,"size":"xl"}]`,
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 1,
          cg_id: 1,
          name_product: "trà sữa chuyền thống",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          options: `[{"price":2000,"size":"x"},{"price":2500,"size":"xl"},{"price":3000,"size":"M"}]`,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 1,
          cg_id: 1,
          name_product: "trà sữa bạc hà",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          options: `[{"price":2000,"size":"x"},{"price":2500,"size":"xl"},{"price":3000,"size":"M"}]`,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 1,
          cg_id: 2,
          name_product: "Gà chiên mắm",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          options: `[{"price":2500,"size":"phần"}]`,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 1,
          cg_id: 2,
          name_product: "Gà luộc",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          options: `[{"price":2500,"size":"con"}]`,
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 1,
          cg_id: 2,
          name_product: "Gà xào xả ớt",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          options: `[{"price":2500,"size":"đĩa"}]`,
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 1,
          cg_id: 3,
          name_product: "Không độ",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          options: `[{"price":1000,"size":"chai"}]`,
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
