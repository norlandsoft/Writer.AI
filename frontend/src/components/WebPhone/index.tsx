import React, {useEffect, useRef} from "react";
import './index.less';

interface WebStreamProps {
  width?: number;
  height?: number;
}

const WebPhone: React.FC<WebStreamProps> = props => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/phone');
    ws.binaryType = 'arraybuffer';

    ws.onmessage = (event) => {
      if (videoRef.current) {
        const videoElement = videoRef.current;
        const blob = new Blob([event.data], { type: 'video/webm' });
        videoElement.src = URL.createObjectURL(blob);
        videoElement.play();
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay />
    </div>
  );
}

export default WebPhone;