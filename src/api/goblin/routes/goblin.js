'use strict';

/**
 * goblin router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::goblin.goblin');
