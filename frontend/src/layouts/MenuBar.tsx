import React from "react";
import {connect} from 'umi';
import {Tooltip} from "antd";
import {Icon} from 'aird';
import styles from './MenuBar.less';

const MenuBar: React.FC = (props: any) => {

  const {
    dispatch,
    layoutSize,
    currentPage,
    user: {userMenu}
  } = props;

  const handleClickMenuItem = (id: string) => {
    dispatch({
      type: 'global/changeCurrentPage',
      payload: id
    });
    // 触发窗口resize事件
    window.dispatchEvent(new Event('resize'));
  }

  return (
    <div className={styles.container} style={{width: layoutSize.menuWidth, top: layoutSize.headerHeight}}>
      {
        userMenu.map(item => {
          return (
            <Tooltip placement="right" title={item.title} arrow={false} mouseEnterDelay={0.2} mouseLeaveDelay={0}
                     destroyTooltipOnHide={true} overlayInnerStyle={{fontSize: 13, fontWeight: 600, borderRadius: 3}}
                     key={item.id}
            >
              <div key={item.id} className={styles.menu} onClick={() => handleClickMenuItem(item.id)}>
                <div className={styles.icon} style={{width: layoutSize.menuWidth, height: layoutSize.menuWidth + 5}}>
                  {
                    currentPage === item.id ?
                      <div className={styles.selected}/> : null
                  }
                  <Icon name={item.icon} size={22} thickness={1.5}/>
                </div>
              </div>
            </Tooltip>
          )
        })
      }
    </div>
  );
}

export default connect(({global, user}) => ({
  currentPage: global.currentPage,
  layoutSize: global.layoutSize,
  user
}))(MenuBar);
