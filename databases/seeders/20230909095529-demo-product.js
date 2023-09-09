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
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 2,
          cg_id: 2,
          name_product: "Gà xào xả ớt",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 1,
          cg_id: 1,
          name_product: "nước dừa",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 1,
          cg_id: 1,
          name_product: "nước cam",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 2,
          cg_id: 1,
          name_product: "sinh tố ổi",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 2,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 2,
          cg_id: 1,
          name_product: "sinh xoài",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 3,
          cg_id: 1,
          name_product: "bia",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 2,
          cg_id: 1,
          name_product: "trè đậu xanh",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 3,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 4,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 5,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 5,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 5,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 5,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 5,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 5,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 6,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 6,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },

        {
          store_id: 6,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 6,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 6,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 6,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 7,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 7,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 7,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 7,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
          status: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          store_id: 7,
          cg_id: 1,
          name_product: "sinh tố dâu",
          image_product: "chuaco.png",
          detail:
            "To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.",
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
