"use strict";

/**
 *  boss controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::boss.boss", ({ strapi }) => ({
  async get(ctx) {
    return await strapi.entityService.findMany("api::boss.boss", {
      fields: ["name", "wave", "demonic", "catchPhrase"],
      populate: {
        // image: { fields: ["url"] },
        items: { fields: ["name"] },
        ability: "*",
      },
    });
  },
}));
