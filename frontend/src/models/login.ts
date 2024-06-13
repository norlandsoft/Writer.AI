import {POST} from "@/utils/HttpRequest";
import {history} from "umi";
import {SHA} from "@/utils/CryptoUtils";
import {error} from '@/components/air-design';

export default {
  namespace: 'login',
  state: {
    currentUser: {},
  },
  effects: {
    * login({payload}: any, {}) {
      const {id, password} = payload;
      const newPassword = SHA(password);
      // admin和其它用户登录的接口不一样
      const loginUri = id.toLowerCase() === 'admin' ? "/rest/admin/login" : "/rest/user/login";
      const resp = yield POST(loginUri, {...payload, password: newPassword});
      if (resp.success) {
        if (resp.data.status === 'logged_in') {
          // 登录成功，保存id和token
          sessionStorage.setItem('air-user-id', resp.data.id);
          sessionStorage.setItem('air-auth-token', resp.data.token);

          // 刷新页面
          history.go(0);
        }
      } else {
        error({
          title: '登录失败',
          message: resp.message,
        });
      }
    },
    * fetchCurrentUser(_, {put}) {
      const userId = sessionStorage.getItem("air-user-id");
      const token = sessionStorage.getItem("air-auth-token");

      if (!userId || !token) {
        return;
      }

      const currentUri = userId.toLowerCase() === 'admin' ? "/rest/admin/current" : "/rest/user/current";
      const resp = yield POST(currentUri, {});
      if (resp.success) {
        yield put({
          type: "saveCurrentUser",
          payload: resp.data,
        });
      } else {
        sessionStorage.removeItem("air-user-id");
        sessionStorage.removeItem("air-auth-token");
      }
    },
    * logout(_, {}) {
      sessionStorage.removeItem("air-user-id");
      sessionStorage.removeItem("air-auth-token");
      // 刷新页面
      history.go(0);
    },
    * changeAdminPassword({payload, callback}: any, {}) {
      const resp = yield POST('/rest/admin/password', payload);
      if (callback) callback(resp);
    }
  },
  reducers: {
    saveCurrentUser(state: any, {payload}: any) {
      return {
        ...state,
        currentUser: payload,
      };
    }
  }
}