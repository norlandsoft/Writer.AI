export default {
  namespace: 'global',
  state: {
    layoutSize: {
      headerHeight: 40,
      menuWidth: 40
    },
    // 工作区框架尺寸
    frameSize: {
      width: 0,
      height: 0
    },
    actionPages: ['wiki', 'code', 'manage', 'link', 'load', 'ops'],
    currentPage: 'writer',
  },
  effects: {},
  reducers: {
    changeFrameSize(state: any, _: any) {
      const { actionPages, currentPage } = state;
      const rightBar = (actionPages.includes(currentPage)) ? 40 : 0;

      const frameWidth = window.innerWidth - state.layoutSize.menuWidth - rightBar;
      const frameHeight = window.innerHeight - state.layoutSize.headerHeight;

      return {
        ...state,
        frameSize: {
          width: frameWidth,
          height: frameHeight
        }
      }
    },

    changeCurrentPage(state: any, action: any) {
      return {
        ...state,
        currentPage: action.payload
      }
    }
  },
};