module.exports = {
  routes: [
    {
      method: "GET",
      path: "/goblins",
      handler: "goblin.get",
      config: {
        auth: false,
      },
    },
  ],
};
