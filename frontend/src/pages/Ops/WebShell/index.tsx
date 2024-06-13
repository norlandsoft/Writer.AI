import React, {useEffect} from "react";
import {connect} from 'umi';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

import '@xterm/xterm/css/xterm.css'
import styles from './index.less';

interface WebShellProps {
  height: number;
  width: number;
}

const WebShell: React.FC<WebShellProps> = props => {

  const {
    height,
    width
  } = props;

  const termRef = React.useRef<Terminal | null>(null);
  const fitRef = React.useRef<FitAddon | null>(null);

  useEffect(() => {
    termRef.current = new Terminal({
      // 渲染类型
      // rendererType: 'canvas',
      // 是否禁用输入
      disableStdin: false,
      cursorStyle: 'underline',
      // 启用时光标将设置为下一行的开头
      convertEol: true,
      // 终端中的回滚量
      scrollback: 500,
      tabStopWidth: 4, //制表宽度
      // screenKeys: true, //Xterm下的快捷键
      // 光标闪烁
      cursorBlink: true,
      theme: {
        foreground: '#52d22a', //字体,LightGreen,Orange,SlateBlue,Magenta Purple Red Violet White Yellow
        background: '#f1f2f3', //背景色
        // foreground: "#7e9192", //字体
        // background: "#002833", //背景色
        cursor: "Orange", //设置光标
        // lineHeight: 16
      },
    });

    fitRef.current = new FitAddon();
    termRef.current.loadAddon(fitRef.current);

    const canvas = document.getElementById('terminal');
    if (canvas) {
      termRef.current.open(canvas);
      termRef.current.focus();
    }

    fitRef.current.fit();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleResize = () => {
    if (fitRef.current) {
      fitRef.current.fit();
    }
  }

  return (
    <div className={styles.container} style={{height, width}}>
      <div id="terminal" />
    </div>
  )
}

export default connect(({global}) => ({
  frameSize: global.frameSize
}))(WebShell);