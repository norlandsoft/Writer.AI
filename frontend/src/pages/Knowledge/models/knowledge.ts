import {POST} from "@/utils/HttpRequest";

export interface CollectionInfo {
  id: string,
  name: string,
  loaded: boolean,
  status: number,
}

export default {
  namespace: 'knowledge',
  state: {
    collectionList: []
  },
  effects: {
    * fetchCollectionList({payload, callback}, {put}) {
      const resp = yield POST("/api/v1/vector/collection/list", payload);
      if (resp.success) {
        yield put({
          type: "saveCollectionList",
          payload: resp.data,
        });
        if (callback) callback(resp.data)
      }
    },
    * addCollection({payload, callback}, _) {
      const resp = yield POST("/api/v1/vector/collection/add", payload);
      if (callback) {
        callback(resp);
      }
    },
    * fetchCollectionInfo({payload, callback}, _) {
      const resp = yield POST("/api/v1/vector/collection/info", payload);
      if (callback) {
        callback(resp);
      }
    },
    * loadCollection({payload, callback}, _) {
      const resp = yield POST("/api/v1/vector/collection/load", payload);
      if (callback) {
        callback(resp);
      }
    },
    * unloadCollection({payload, callback}, _) {
      const resp = yield POST("/api/v1/vector/collection/unload", payload);
      if (callback) {
        callback(resp);
      }
    },
    * fetchCollectionFileList({payload, callback}, _) {
      const resp = yield POST("/api/v1/storage/list", payload);
      if (callback) {
        callback(resp);
      }
    },
    * buildVector({payload, callback}, _) {
      const resp = yield POST("/api/v1/vector/collection/build", payload);
      if (callback) {
        callback(resp);
      }
    }
  },
  reducers: {
    saveCollectionList(state: any, {payload}: any) {
      return {
        ...state,
        collectionList: payload
      }
    },
  }
}