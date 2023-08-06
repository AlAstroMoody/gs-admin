"use strict";

/**
 *  boss controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::boss.boss", ({ strapi }) => ({
  async get(ctx) {
    return await strapi.entityService.findMany("api::boss.boss", {
      filters: { publishedAt: { $notNull: true } },
      fields: ["name", "wave", "demonic", "catchPhrase"],
      populate: {
        // image: { fields: ["url"] },
        items: {
          filters: { publishedAt: { $notNull: true } },
          fields: ["name"],
        },
        ability: "*",
      },
    });
  },
}));
