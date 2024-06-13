import React, {useEffect} from "react";
import {connect} from 'umi';
import {Icon} from 'aird';
import ChatPage from "@/pages/Chat/ChatPage";
import Knowledge from "@/pages/Knowledge";
import Bookmark from "@/pages/Bookmark";
import Auto from "@/pages/Auto";
import Tool from '@/pages/Tool';
import Wiki from '@/pages/Wiki';
import Manager from '@/pages/Manager';
import Linker from '@/pages/Linker';
import Loader from '@/pages/Loader';
import Ops from '@/pages/Ops';
import PlatformSettings from "@/pages/Platform/Settings/PlatformSettings";
import Error404 from "@/layouts/Error404";

import styles from './WorkContent.less';

const WorkContent: React.FC = (props: any) => {

  const {
    dispatch,
    frameSize,
    layoutSize,
    actionPages,
    currentPage
  } = props;

  useEffect(() => {
    dispatch({
      type: 'global/changeCurrentPage',
      payload: sessionStorage.getItem('air-user-id') === 'admin' ? 'settings' : 'chat',
    });
  }, []);

  return (
    <div style={{position: 'fixed', left: layoutSize.menuWidth, top: layoutSize.headerHeight}}>
      {
        (() => {
          switch (currentPage) {
            case 'chat':
              return <ChatPage/>;
            case 'knowledge':
              return <Knowledge/>;
            case 'wiki':
                return <Wiki/>;
            case 'bookmark':
              return <Bookmark/>;
            case 'tool':
              return <Tool/>;
            case 'manage':
              return <Manager/>;
            case 'auto':
              return <Auto/>;
            case 'link':
              return <Linker/>;
            case 'load':
              return <Loader/>;
            case 'ops':
              return <Ops/>
            case 'settings':
                return <PlatformSettings/>;
            default:
              return <Error404/>;
          }
        })()
      }
      {
        actionPages.includes(currentPage) && (
          <div className={styles.actionPanel} style={{height: frameSize.height}}>
            <div className={styles.actionItem}>
              <Icon name={'dialog_filled'} size={22}/>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default connect(({global}) => ({
  frameSize: global.frameSize,
  layoutSize: global.layoutSize,
  currentPage: global.currentPage,
  actionPages: global.actionPages
}))(WorkContent);