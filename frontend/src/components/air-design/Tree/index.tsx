import React, {useState} from "react";
import {Typography} from "antd";
import {Button, Dropdown, Input, Tree} from '@douyinfe/semi-ui';
import {randomString} from "@/utils/StringUtils";
import Icon from "../Icon";
import styles from './index.less';

interface TreeProps {
  data: any[];
  height?: number;
  showFilter?: boolean;
  folderIcon?: string;
  itemIcon?: string;
  groupMenu?: any[];
  itemMenu?: any[];
  rootButtonClick?: () => void;
  menuItemClick?: (info: any, data: any) => void;
  onSelect?: (info: any) => void;
  defaultExpandedKeys?: string[];
  groupCollapsed?: boolean;
}

const AirTree: React.FC<TreeProps> = props => {

  const {
    data,
    height = 200,
    showFilter = false,
    folderIcon = 'folder',
    itemIcon = 'document',
    groupMenu,
    itemMenu,
    rootButtonClick,
    menuItemClick,
    onSelect,
    defaultExpandedKeys = [],
    groupCollapsed = false
  } = props;

  const [keys, setKeys] = useState(defaultExpandedKeys);

  const handleRootButtonClick = () => {
    if (rootButtonClick) {
      rootButtonClick();
    }
  }

  const handleMenuItemClick = (info, data) => {
    if (menuItemClick) {
      menuItemClick(info, data);
    }
  }

  const renderMenuBar = (data, menu) => {
    return menu ? (
      <Dropdown.Menu>
        {
          menu.map(item => {
            return item.type === 'divider' ? <Dropdown.Divider key={randomString(8)}/> :
              <Dropdown.Item style={{minWidth: '100px'}} key={item.key}
                             onClick={e => handleMenuItemClick(item, data)}>{item.label}</Dropdown.Item>
          })
        }
      </Dropdown.Menu>
    ) : null;
  }

  const itemSelect = (key, _, node) => {
    !groupCollapsed ? (() => {
      const f = keys.find(item => item === key);
      if (!f && node.children) {
        // 展开
        const newKeys = keys.concat([key]);
        setKeys(newKeys);
      }
    })() : null

    // 事件响应
    if (onSelect) {
      onSelect(node);
    }
  }

  const itemExpand = keyArray => {
    setKeys(keyArray);
  }

  const renderLabel = (label, data) => {
    return (
      <div className={styles.label}>
        <div className={styles.node_icon}>
          {
            data.img ? <Icon name={data.img} size={18}/> :
              <Icon name={data.type === 'group' ? folderIcon : itemIcon} size={18}/>
          }
        </div>
        <Typography.Text
          ellipsis={{tooltip: data.label}}
        >
          {data.label}
        </Typography.Text>
        {
          (data.type === 'group' && (data.menu || groupMenu)) || (data.type === 'item' && (data.menu || itemMenu)) ? (
            <Dropdown
              trigger={'click'}
              position={'bottomRight'}
              zIndex={100}
              render={
                data.menu ? renderMenuBar(data, data.menu) : (
                  data.type === 'group' ? renderMenuBar(data, groupMenu) : renderMenuBar(data, itemMenu)
                )
              }
              clickToHide={true}
              stopPropagation={true}
            >
              <Button
                onClick={e => {
                  // 阻止事件冒泡
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
                icon={<Icon name={'more'} size={20} />}
                size="small"
              />
            </Dropdown>
          ) : null
        }
      </div>
    )
  };

  const searchRender = props => {
    return (
      <Input {...props}/>
    );
  }

  return (
    <div
      className={styles.container}
      style={{height: height}}
    >
      {
        showFilter ? (
          <Button className={styles.rootButton} onClick={handleRootButtonClick}>
            <Icon name={'add'} size={18} thickness={2}/>
          </Button>
        ) : null
      }
      <Tree
        {...props}
        treeData={data}
        className={styles.tree}
        filterTreeNode={showFilter}
        showFilteredOnly={showFilter}
        renderLabel={renderLabel}
        searchRender={searchRender}
        onSelect={itemSelect}
        onExpand={itemExpand}
        expandedKeys={keys}
        expandAction={groupCollapsed ? 'click' : undefined}
        disableStrictly={true}
        emptyContent={' '}
        virtualize={{
          height: showFilter ? height - 52 : height,
          itemSize: 36
        }}
      />
    </div>
  );
}

export default AirTree;