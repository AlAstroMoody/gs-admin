module.exports = {
  routes: [
    {
      method: "GET",
      path: "/boss",
      handler: "boss.get",
      config: {
        auth: false,
      },
    },
  ],
};
