import React from "react";
import {Dropdown} from '@douyinfe/semi-ui';
import {Icon} from 'aird';
import './MenuButton.less';

interface MenuButtonProps {
  size?: number;
  items: any[];
  transClickEvent?: boolean;
  innerMargin?: number;
  style?: any;
}

const MenuButton: React.FC<MenuButtonProps> = props => {

  const {
    size,
    items,
    transClickEvent = false,
    innerMargin = 8,
    style
  } = props;

  return (
    <Dropdown
      trigger={'click'}
      render={
        <Dropdown.Menu>
          {
            items.map((item: any, index: number) => {
              return (
                <Dropdown.Item key={item.key} onClick={e => {
                  // 阻止事件冒泡
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  if (item.onClick) {
                    item.onClick(e);
                  }
                }}>
                  {item.label}
                </Dropdown.Item>
              )
            })
          }
        </Dropdown.Menu>
      }
    >
      <div className={'air-menu-button'}
             style={{width: size, height: size, lineHeight: size, margin: innerMargin, ...style}}
             onClick={e => {
               // 阻止事件冒泡
               if (!transClickEvent) {
                 e.stopPropagation();
                 e.nativeEvent.stopImmediatePropagation();
               }
             }}
        >
          <Icon name={'more'} size={size}/>
        </div>
    </Dropdown>
  );
}

export default MenuButton;