import {POST} from "@/utils/HttpRequest";

export default {
  namespace: 'phone',
  state: {
  },

  effects: {
    * open({payload, callback}: any, {call, put}: any) {
      const resp = yield POST('/rest/app/iphone', payload);
      if (callback) {
        callback(resp);
      }
    },
  },

  reducers: {
  }
}