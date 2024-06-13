import React from "react";
import { Spin } from '@douyinfe/semi-ui';
import { IconLoading } from '@douyinfe/semi-icons';

const Loading: React.FC = () => {

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      padding: '60px 120px',
      background: 'rgba(100, 100, 255, 0.2)',
      border: '1px solid rgba(100, 100, 255, 0.5)',
      borderRadius: '8px',
      transform: 'translate(-50%, -50%)',
    }}>
      <Spin
        tip={'Loading...'}
        indicator={<IconLoading/>}
        size={'large'}
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          width: '80px'
        }}
      />
    </div>
  );
}

export default Loading;