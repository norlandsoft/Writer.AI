import {POST, SSE} from "@/utils/HttpRequest";
import {randomString} from "@/utils/StringUtils";

export default {
  namespace: 'chat',
  state: {
    currentSession: null,
    // 对话列表
    chatList: [],
    lastContent: '',

    // History
    historyList: []
  },

  effects: {
    * conversation({payload, callback}: any, {call, put}: any) {
      // 保存问题到本地列表
      yield put({
        type: 'saveChatMessage',
        payload: {
          id: randomString(8),
          type: 'q',
          content: payload.content
        }
      });

      // 发送问题
      const resp = yield POST('/rest/chat/conversation', payload);
      if (!resp.success) {
        // 保存错误信息
        yield put({
          type: 'saveChatMessage',
          payload: {
            id: randomString(8),
            type: 'a',
            content: '```Error \n 服务器故障，请稍后再试\n ```'
          }
        });
      }

      if (callback) {
        callback(resp.data);
      }
    },

    * fetchResponse({payload, callback}: any, {}: any) {
      yield SSE('/rest/chat/fetch', payload, callback);
    },

    * fetchChatList({payload}: any, {call, put}: any) {
      const resp = yield POST('/rest/chat/list', payload);
      if (resp.success) {
        yield put({
          type: 'saveChatMessageList',
          payload: resp.data
        });
      }
    },
    * fetchHistoryList(_: any, {call, put}: any) {
      const resp = yield POST('/rest/chat/session/list', {});
      if (resp.success) {
        yield put({
          type: 'saveHistoryList',
          payload: resp.data
        });
      }
    },
    * updateHistoryInfo({payload, callback}: any, {call, put}: any) {
      const resp = yield POST('/rest/chat/session/update', payload);
      if (resp.success) {
        yield put({
          type: 'fetchHistoryList'
        });

        if (callback) callback(resp);
      }
    },
    * deleteHistoryInfo({payload, callback}: any, {call, put}: any) {
      const resp = yield POST('/rest/chat/session/delete', payload);
      if (resp.success) {
        yield put({
          type: 'fetchHistoryList'
        });

        if (callback) callback(resp);
      }
    },

    * fetchChatSetting({_, callback}: any, {}) {
      const resp = yield POST('/rest/chat/setting/info', {});
      if (resp.success) {
        callback(resp.data);
      }
    },
    * saveChatSetting({payload, callback}: any, {put}: any) {
      const resp = yield POST('/rest/chat/setting/save', payload);
      if (callback) callback(resp);
    }
  },
  reducers: {
    saveChatMessage(state: any, {payload}: any) {
      return {
        ...state,
        chatList: [...state.chatList, payload]
      }
    },
    saveChatMessageList(state: any, {payload}: any) {
      return {
        ...state,
        chatList: payload
      }
    },
    saveLastChatMessage(state: any, {payload}: any) {
      const resp = {
        id: payload,
        type: 'a',
        content: state.lastContent
      }
      return {
        ...state,
        chatList: [...state.chatList, resp],
        lastContent: ''
      }
    },
    updateLastContent(state: any, {payload}: any) {
      return {
        ...state,
        lastContent: state.lastContent + payload
      }
    },
    saveCurrentSession(state: any, {payload}: any) {
      return {
        ...state,
        currentSession: payload
      }
    },
    clearChatSession(state: any, _: any) {
      return {
        ...state,
        currentSession: null,
        chatList: []
      }
    },
    saveHistoryList(state: any, {payload}: any) {
      return {
        ...state,
        historyList: payload
      }
    },
  }
}