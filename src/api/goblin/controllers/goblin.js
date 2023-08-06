"use strict";

/**
 *  goblin controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::goblin.goblin", ({ strapi }) => ({
  async get(ctx) {
    const goblins = await strapi.entityService.findMany("api::goblin.goblin", {
      filters: { publishedAt: { $notNull: true } },
      fields: ["name", "description", "mainParam"],
      populate: {
        src: { fields: ["url"] },
        stats: "*",
        items: {
          filters: { publishedAt: { $notNull: true } },
          fields: ["name"],
        },
        stats_increase: "*",
      },
    });

    goblins.forEach((goblin) => (goblin.src = goblin.src?.url));
    return goblins;
  },
}));
