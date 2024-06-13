import {POST} from "@/utils/HttpRequest";

export default {
  namespace: 'bookmark',
  state: {
    bookmarkFolder: [],
    currentList: []
  },

  effects: {
    * fetchBookmarkFolder({ payload }, { call, put }) {
      const resp = yield POST("/rest/bookmark/folder/tree", payload);
      if (resp.success) {
        yield put({
          type: 'saveFolder',
          payload: resp.data
        });
      }
    },
    * saveBookmarkFolder({ payload, callback }, _) {
      const resp = yield POST("/rest/bookmark/folder/update", payload);
      if (callback) {
        callback(resp);
      }
    },
    * deleteBookmarkFolder({ payload, callback }, _) {
      const resp = yield POST("/rest/bookmark/folder/delete", payload);
      if (callback) {
        callback(resp);
      }
    },

    * fetchWebsiteInfo({ payload, callback }, _) {
      const resp = yield POST("/rest/bookmark/site", payload);
      if (callback) {
        callback(resp);
      }
    },

    * fetchBookmarkList({ payload }, { call, put }) {
      const resp = yield POST("/rest/bookmark/list", payload);
      if (resp.success) {
        yield put({
          type: 'saveBookmarkList',
          payload: resp.data
        });
      }
    },
    * saveBookmarkInfo({ payload, callback }, _) {
      const resp = yield POST("/rest/bookmark/update", payload);
      if (callback) {
        callback(resp);
      }
    },
  },

  reducers: {
    saveFolder(state, action) {
      return {
        ...state,
        bookmarkFolder: action.payload
      }
    },
    saveBookmarkList(state, action) {
      return {
        ...state,
        currentList: action.payload
      }
    }
  }
}