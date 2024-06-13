import React, {useEffect} from "react";
import {connect} from 'umi';
import {Icon} from 'aird';
import Writer from "@/pages/Writer";
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
            case 'writer':
              return <Writer/>;
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