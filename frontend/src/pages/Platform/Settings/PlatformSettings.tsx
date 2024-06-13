import React from "react";
import {connect} from 'umi';
import {Icon} from 'aird';
import styles from './PlatformSettings.less';

import UserSettings from "./panels/UserSettings";
import DatabaseSettings from "./panels/DatabaseSettings";
import VectorBaseSettings from "./panels/VectorBaseSettings";
import RedisSettings from "./panels/RedisSettings";

// Station
import StationEngine from "./panels/StationEngine";
import StationDevice from "./panels/StationDevice";

const PlatformSettings: React.FC = (props: any) => {

  const {
    dispatch,
    frameSize,
  } = props;

  const [currentPanel, setCurrentPanel] = React.useState('user');

  const navData = [
    {
      key: 'platform',
      label: '平台管理',
      type: 'group',
      children: [
        {
          key: 'user',
          label: '用户管理',
          type: 'item',
        },
        {
          key: 'role',
          label: '角色管理',
          type: 'item',
        },
        {
          key: 'permission',
          label: '权限管理',
          type: 'item',
        }
      ]
    },
    {
      key: 'storage',
      label: '数据存储',
      type: 'group',
      children: [
        {
          key: 'database',
          label: '关系数据库',
          type: 'item',
        },
        {
          key: 'vector',
          label: '向量数据库',
          type: 'item',
        },
        {
          key: 'redis',
          label: '数据缓存',
          type: 'item',
        },
      ]
    },
    {
      key: 'llm',
      label: '大语言模型',
      type: 'group',
      children: [
        {
          key: 'llm',
          label: '模型服务管理',
          type: 'item',
        },
        {
          key: 'local',
          label: '联网搜索管理',
          type: 'item',
        },
      ]
    },
    {
      key: 'station',
      label: '工作站',
      type: 'group',
      children: [
        {
          key: 'engine',
          label: '引擎管理',
          type: 'item',
        },
        {
          key: 'device',
          label: '设备管理',
          type: 'item',
        },
      ]
    }
  ];

  const activeStyle = {
    background: '#c5d5e5',
  }

  return (
    <div className={styles.container} style={{width: frameSize.width, height: frameSize.height}}>
      <div className={styles.nav} style={{height: frameSize.height}}>
        <div className={styles.navtree} style={{height: frameSize.height - 51}}>
          {
            navData.map((group, index) => {
              return (
                <div className={styles.group} key={group.key}>
                  &nbsp;{group.label}
                  {
                    group.children.map((item, index) => {
                      return (
                        <div className={styles.item} key={item.key} style={item.key === currentPanel ? activeStyle : {}} onClick={() => setCurrentPanel(item.key)}>
                          <Icon name={'document'} size={16} />
                          {item.label}
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
        <div className={styles.navfoot}></div>
      </div>
      <div className={styles.content} style={{height: frameSize.height - 51}}>
        {
          (() => {
            switch (currentPanel) {
              case 'user':
                return <UserSettings/>
              case 'database':
                return <DatabaseSettings/>
              case 'vector':
                return <VectorBaseSettings/>
              case 'redis':
                return <RedisSettings/>
              case 'engine':
                return <StationEngine/>
              case 'device':
                return <StationDevice/>
              default:
                return <div>Not Found</div>
            }
          })()
        }
      </div>
    </div>
  );
}

export default connect(({global}) => ({
  frameSize: global.frameSize,
}))(PlatformSettings);
