exports.redisFuncitonsList = function (list) {
  return {
    async addToList(key, value, expirationDate) {
      await list.set(key, value);
      await list.expireAt(key, expirationDate);
    },
    async getValue(key) {
      const result = await list.get(key);
      return result;
    },

    async deleleFromList(key) {
      return await list.del(key);
    },

    async verifyList(key) {
      const result = await list.exists(key);
      return result === 1;
    },
  };
};
