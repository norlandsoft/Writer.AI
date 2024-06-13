import {POST} from "@/utils/HttpRequest";

export default {
  namespace: 'wiki',
  state: {
    currentSpace: {},
    currentDoc: {},
    pageType: 'view'
  },
  effects: {
    * fetchSpace({ payload, callback }, { call, put }) {
      const resp = yield POST("/rest/wiki/space/list", payload);
      if (resp.success && callback) {
        callback(resp.data);
      }
    },

    * fetchDoc({ payload, callback }, { call, put }) {
      const resp = yield POST("/rest/wiki/docs/list", payload);
      if (resp.success && callback) {
        callback(resp.data);
      }
    },

    * createDoc({ payload, callback }, { call, put }) {
      const resp = yield POST("/rest/wiki/docs/add", payload);
      if (resp.success && callback) {
        callback(resp.data);
      }
    }
  },
  reducers: {
    showEditor(state, action) {
    }
  }
}
