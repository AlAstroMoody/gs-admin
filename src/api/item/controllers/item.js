"use strict";

/**
 *  item controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::item.item", ({ strapi }) => ({
  async get(ctx) {
    let items = await strapi.entityService.findMany("api::item.item", {
      filters: { publishedAt: { $notNull: true } },
      fields: [
        "name",
        "level",
        "description",
        "craft",
        "count",
        "max_count",
        "rare",
        "source",
      ],
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
            "critical_chance",
            "critical_value",
            "block_chance",
            "block_value",
            "hidden_regen",
          ],
        },
        notUsed: {
          filters: { publishedAt: { $notNull: true } },
          fields: ["name"],
        },
        parents: {
          filters: { publishedAt: { $notNull: true } },
          fields: ["name", "count"],
        },
        children: {
          filters: { publishedAt: { $notNull: true } },
          fields: ["name"],
        },
        src: { fields: ["url"] },
        boss: { fields: ["name", "wave"] },
        goblins: { fields: ["name"] },
      },
    });

    for (const item of items) {
      // await strapi.entityService.update("api::item.item", item.id, {
      //   data: {
      //     publishedAt: null,
      //   },
      // });

      item.src = item.src?.url;
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
      item.parents.forEach((parent) =>
        parent.count ? null : delete parent.count
      );
    }
    return items;
  },
}));
