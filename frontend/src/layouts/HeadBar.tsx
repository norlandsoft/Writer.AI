import React, {useState, useEffect} from "react";
import {connect} from 'umi';
import {Avatar} from 'antd';
import {Button, Dialog, Icon, SlidePanel} from 'aird';
import UserSettings from "@/pages/Platform/Users/UserSettings";
import screenfull from "screenfull";
import styles from "./HeadBar.less";

const HeadBar: React.FC = (props: any) => {

  const {
    dispatch,
    frameSize,
    layoutSize,
    currentPage,
    currentUser,
    currentProject
  } = props;

  const [fullScreen, setFullScreen] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // 页面尺寸变动事件
    window.addEventListener('resize', handleSizeChange);

    // 获取当前全屏状态
    setFullScreen(screenfull.isFullscreen);

    return () => {
      window.removeEventListener('resize', handleSizeChange)
    }
  }, []);

  const handleSizeChange = () => {
    // 改变全屏标志
    setFullScreen(screenfull.isFullscreen);
  }

  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.toggle().then();
      } else {
        screenfull.request().then();
      }
    }
  }

  const handleUserSettings = () => {
  }

  const handleUserLogout = () => {
    // 确认是否退出
    Dialog({
      title: '退出',
      message: '是否退出AirMachine？',
      onConfirm: dlg => {
        dispatch({
          type: 'global/removeAllTabs'
        });
        dispatch({
          type: 'login/logout',
        });

        dlg.doCancel();
      }
    });
  }

  const RightPanel = () => {
    return (
      <div className={styles.right}>
        {/*全屏*/}
        <div className={styles.function}>
          <div className={styles.functionInner} onClick={handleFullScreen}>
            <Icon name={fullScreen ? 'full_screen_exit' : 'full_screen'} thickness={1} size={22}/>
          </div>
        </div>
        {/*Avatar*/}
        <div className={styles.avatar} style={{cursor: 'pointer'}} onClick={() => setShowUserPanel(true)}>
          <Avatar size={28} src={currentUser.avatar}/>
        </div>
      </div>
    );
  }

  const UserPanel = () => {
    return (
      <div className={styles.panel}>
        <div className={styles.info}>
          <Avatar size={64} className={styles.avatar} src={currentUser.avatar}/>
          <div className={styles.name}>{currentUser.name}</div>
          <div className={styles.id}>#{currentUser.id}</div>

          <div className={styles.close} onClick={() => setShowUserPanel(false)}>
            <Icon name={'close'} size={14}/>
          </div>
        </div>

        <div className={styles.ops} onClick={() => setShowUserPanel(false)}>
          <div className={styles.item} onClick={() => {
            window.open('https://www.norlandsoft.com', '_blank');
          }}>
            <Icon name={'global'} size={20}/>
            <div className={styles.text}>产品主页</div>
          </div>
          <div className={styles.item} onClick={() => setShowSettings(true)}>
            <Icon name={'config'} size={20}/>
            <div className={styles.text}>用户设置</div>
          </div>
          <div className={styles.hr}/>
          <div className={styles.item} onClick={handleUserLogout}>
            <Icon name={'exit'} size={20}/>
            <div className={styles.text}>退出</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{width: window.innerWidth, height: layoutSize.headerHeight}}>
      
      <div className={styles.content}>

        <div className={styles.machine}>
          <div className={styles.icon} style={{ height: layoutSize.headerHeight, width: layoutSize.menuWidth}}/>
          <div className={styles.title}/>
        </div>

        {/*项目选择*/}
        {
          ['auto', 'load', 'link', 'manage'].includes(currentPage) && (
            <div className={styles.project} onClick={() => {
              console.log("ok");
            }}>
              <Icon name={'projects'} size={20}/>
              核心系统性能测试项目
              <div className={styles.more}>
                <Icon name={'arrow_down'} size={14}/>
              </div>
            </div>
          )
        }

        {/*工作空间*/}
        {
          currentPage === 'wiki' && (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div className={styles.project} onClick={() => {
                console.log("ok");
              }}>
                <Icon name={'workspace'} size={20}/>
                文档空间
                <div className={styles.more}>
                  <Icon name={'arrow_down'} size={14}/>
                </div>
              </div>
              <Button type={'primary'} style={{minHeight: '30px', marginLeft: '18px'}}>新建</Button>
            </div>
          )
        }
      </div>

      <RightPanel/>

      {/*用户操作面板，小面板*/}
      <SlidePanel
        type={'small'}
        open={showUserPanel}
        maskClosable={true}
        hasButtonBar={false}
        bodyPadding={0}
        onClose={() => {
          setShowUserPanel(false);
        }}
      >
        <UserPanel/>
      </SlidePanel>

      <SlidePanel
        type={'full'}
        title={'用户设置'}
        bodyPadding={0}
        open={showSettings}
        onClose={() => {
          setShowSettings(false);
        }}
        hasCloseButton={true}
        hasButtonBar={false}
      >
        <UserSettings/>
      </SlidePanel>
    </div>
  );
}

export default connect(({global, login, project}) => ({
  frameSize: global.frameSize,
  layoutSize: global.layoutSize,
  currentPage: global.currentPage,
  currentUser: login.currentUser,
  currentProject: project.currentProject,
}))(HeadBar);