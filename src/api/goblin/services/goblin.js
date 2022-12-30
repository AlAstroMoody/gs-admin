'use strict';

/**
 * goblin service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::goblin.goblin');
