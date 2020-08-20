module.exports = function () {
  if (!process.env.VIDLY_JWTPRIVATEKEY) {
    throw new Error("Fatal error: jwtPrivateKey is not defined.");
  }
};
