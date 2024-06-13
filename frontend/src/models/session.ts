interface ChatUISettingsProps {
  showHistory: boolean;
}

export default {
  namespace: 'session',
  state: {
    chatUISettings: {
      showHistory: false
    } as ChatUISettingsProps
  },
  effects: {
  },
  reducers: {
    saveChatUISettings(state: any, {payload}: any) {
      return {
        ...state,
        chatUISettings: payload
      };
    }
  }
}