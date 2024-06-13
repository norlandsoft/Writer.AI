import {POST} from "@/utils/HttpRequest";

export default {
  namespace: 'database',
  state: {
    profiles: [],
    vectors: []
  },
  effects: {
    * saveProfile({ payload, callback }, _) {
      const resp = yield POST("/rest/platform/database/set", payload);
      if (callback) {
        callback(resp);
      }
    },
    * fetchProfile({ payload, callback }, _) {
      const resp = yield POST("/rest/platform/database/get", payload);
      if (resp.success && callback) {
        callback(resp.data);
      }
    },
    * saveVector({ payload, callback }, _) {
      const resp = yield POST("/rest/platform/database/vector/set", payload);
      if (callback) {
        callback(resp);
      }
    },
    * fetchVector({ payload, callback }, _) {
      const resp = yield POST("/rest/platform/database/vector/get", payload);
      if (resp.success && callback) {
        callback(resp.data);
      }
    },
    * saveRedis({ payload, callback }, _) {
      const resp = yield POST("/rest/platform/database/redis/set", payload);
      if (callback) {
        callback(resp);
      }
    },
    * fetchRedis({ payload, callback }, _) {
      const resp = yield POST("/rest/platform/database/redis/get", payload);
      if (resp.success && callback) {
        callback(resp.data);
      }
    },

  },
  reducers: {
  },
}