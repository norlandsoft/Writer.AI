import {POST} from "@/utils/HttpRequest";

export default {
  namespace: 'project',
  state: {
    projectList: [],
    currentProject: {},
  },
  effects: {
    * fetchProjectList({payload, callback}, {put}) {
      const resp = yield POST("/rest/project/list", payload);
      if (resp.success) {
        yield put({
          type: "saveProjectList",
          payload: resp.data,
        });
        if (callback) callback(resp.data)
      }
    }
  },
  reducers: {
    saveProjectList(state: any, {payload}: any) {
      return {
        ...state,
        projectList: payload
      }
    },
  },
}