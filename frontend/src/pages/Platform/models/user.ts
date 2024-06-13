import {POST} from "@/utils/HttpRequest";

export default {
  namespace: 'user',
  state: {
    userMenu: [],
  },
  effects: {
    // 用户菜单
    * fetchUserMenu({payload}: any, {put}) {
      // 获取当前用户ID
      const userId = sessionStorage.getItem("air-user-id");
      if (!userId) {
        yield put({
          type: "saveUserMenu",
          payload: [],
        });
        return;
      }

      if (userId.toLowerCase() === 'admin') {
        const payload = [{
          id: 'settings',
          title: "平台设置",
          icon: "settings",
          role: "admin",
        }];

        yield put({
          type: "saveUserMenu",
          payload: payload,
        });
        return;
      }
      
      const resp = yield POST('/rest/user/menu', payload);
      if (resp.success) {
        yield put({
          type: "saveUserMenu",
          payload: resp.data,
        });
      }
    },
  },
  reducers: {
    saveUserMenu(state: any, {payload}: any) {
      return {
        ...state,
        userMenu: payload,
      };
    }
  }
}