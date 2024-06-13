import React from 'react';
import {Icon} from 'aird';
import {Tooltip} from 'antd';

interface HelpProps {
  icon?: string,
  size?: number,
  text?: string
}

const Help: React.FC<HelpProps> = props => {

  const {
    icon = 'help',
    size = 14,
    text = ''
  } = props;

  return (
      <Tooltip placement="top" title={text}>
        <div style={{margin: '0 4px'}}>
          <Icon name={icon} size={size}/>
        </div>
      </Tooltip>
  );
}

export default Help;