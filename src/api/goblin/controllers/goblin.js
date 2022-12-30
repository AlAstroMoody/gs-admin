"use strict";

/**
 *  goblin controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::goblin.goblin", ({ strapi }) => ({
  async get(ctx) {
    const goblins = await strapi.entityService.findMany("api::goblin.goblin", {
      fields: ["name", "description", "mainParam"],
      populate: {
        src: { fields: ["url"] },
        stats: "*",
        items: { fields: ["name"] },
        stats_increase: "*",
      },
    });

    goblins.forEach((goblin) => (goblin.src = goblin.src?.url));
    return goblins;
  },
}));
