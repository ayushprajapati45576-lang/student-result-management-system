const app = require("../server/app");

module.exports = (req, res) => {
  const requestUrl = new URL(req.url, "http://localhost");
  const remainingPath = requestUrl.searchParams.get("__vercel_path");

  if (remainingPath !== null) {
    requestUrl.searchParams.delete("__vercel_path");
    req.url = `${requestUrl.pathname}${requestUrl.search}`;
  }

  return app(req, res);
};
