"use strict";

/**
 *  item controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::item.item", ({ strapi }) => ({
  async get(ctx) {
    let items = await strapi.entityService.findMany("api::item.item", {
      fields: ["name", "level", "description", "craft", "count"],
      populate: {
        params: {
          fields: [
            "agility",
            "intelligence",
            "strength",
            "resist",
            "luck",
            "hp",
            "mp",
            "attack",
            "defence",
            "as",
            "ms",
            "hp_regeneration",
            "mp_regeneration",
            "visibility",
            "evade",
            "manaburn",
            "aura",
            "active",
            "distant_resist",
            "stealth_detection",
          ],
        },
        parents: {
          fields: ["name", "count"],
        },
        children: { fields: ["name"] },
        src: { fields: ["url"] },
        boss: { fields: ["name", "wave"] },
        goblins: { fields: ["name"] },
      },
    });

    for (const item of items) {
      item.src = item.src?.url;
      item.level = item.level || 0;
      item.goblins = item.goblins.map((g) => g.name);
      for (const property in item) {
        if (!item[property]) {
          delete item[property];
        }
      }
      for (const param in item.params) {
        if (!item.params[param]) {
          delete item.params[param];
        }
      }
    }
    return items;
  },
}));
