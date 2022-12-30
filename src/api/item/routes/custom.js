module.exports = {
  routes: [
    {
      method: "GET",
      path: "/items",
      handler: "item.get",
      config: {
        auth: false,
      },
    },
  ],
};
