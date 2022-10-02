const redis = require("redis");
const { redisFuncitonsList } = require("./listFunctions");
const allowList = redis.createClient({
  name: "allowList",
});
allowList.on("connect", function () {
  console.log("AllowList Connected!");
});
allowList.connect();

exports.allowList = redisFuncitonsList(allowList);
