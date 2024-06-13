import React, {useEffect, useRef} from "react";
import './index.less';

interface WebClientProps {
  onOpen?: () => void;
  onMessage?: (data: any) => void;
}

const WebClient: React.FC<WebClientProps> = props => {
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const lockRef = useRef<boolean>(true);
  const [info, setInfo] = React.useState<string | null>(null);

  const {
    onOpen,
    onMessage
  } = props;

  useEffect(() => {
    // 连接到服务器
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      wsRef.current = null;
      intervalRef.current = undefined;
      lockRef.current = false;
      setInfo(null);
    };
  }, []);

  const connect = () => {
    const ws = new WebSocket('ws://localhost:8000/webapi');
    ws.onopen = () => {
      clearInterval(intervalRef.current);
      setInfo(null);
      wsRef.current = ws;
      ws.send("{type: 'echo'}");

      if (onOpen) onOpen();
    };

    ws.onmessage = (event) => {
      if (event.data) {
        const buffer = JSON.parse(event.data);
        if (onMessage) {
          onMessage(buffer);
        }
      }
    };

    ws.onerror = () => {
      setInfo('无法连接到平台服务器');
      wsRef.current = null;
      reconnect();
    };

    ws.onclose = () => {
      setInfo('与平台服务器的连接已断开');
      wsRef.current = null;
      reconnect();
    };
  }

  const reconnect = () => {
    // 每3秒钟重试一次
    if (lockRef.current) {
      disconnect();
      // 可以重新连接
      console.log('尝试重新连接...')
      intervalRef.current = window.setInterval(() => connect(), 3000);
    }
  }

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    clearInterval(intervalRef.current);
  }

  return (
    <div className={'web-socket-notice'} style={{visibility: info ? 'visible' : 'hidden'}}>
      {info}
    </div>
  )
}

export default WebClient;