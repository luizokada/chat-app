const redis = require("redis");
const { redisFuncitonsList } = require("./listFunctions");
const blockList = redis.createClient({
  name: "BlockList",
});
blockList.on("connect", function () {
  console.log("BlockListConnected!");
});
blockList.connect();

exports.blockList = redisFuncitonsList(blockList);
