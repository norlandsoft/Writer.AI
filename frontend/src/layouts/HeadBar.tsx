import React, {useState, useEffect} from "react";
import {connect} from 'umi';
import {Button, Dialog, Icon, SlidePanel} from 'aird';
import screenfull from "screenfull";
import styles from "./HeadBar.less";

const HeadBar: React.FC = (props: any) => {

  const {
    dispatch,
    frameSize,
    layoutSize,
    currentPage,
  } = props;

  const [fullScreen, setFullScreen] = useState(false);

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

  const RightPanel = () => {
    return (
      <div className={styles.right}>
        {/*全屏*/}
        <div className={styles.function}>
          <div className={styles.functionInner} onClick={handleFullScreen}>
            <Icon name={fullScreen ? 'full_screen_exit' : 'full_screen'} thickness={1} size={22}/>
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
    </div>
  );
}

export default connect(({global, project}) => ({
  frameSize: global.frameSize,
  layoutSize: global.layoutSize,
  currentPage: global.currentPage,
  currentProject: project.currentProject,
}))(HeadBar);