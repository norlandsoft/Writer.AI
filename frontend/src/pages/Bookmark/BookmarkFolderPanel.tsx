import React from "react";
import {connect} from 'umi';
import {Dialog, Icon, Tree} from 'aird';
import SimpleInfoDialog from '@/components/SimpleInfoDialog';
import {Dropdown} from '@douyinfe/semi-ui';

import styles from './BookmarkFolderPanel.less';

interface BookmarkFolderPanelProps {
  onSelect: (item: string) => void;
}

const BookmarkFolderPanel: React.FC<BookmarkFolderPanelProps | any> = (props) => {

  const {
    dispatch,
    frameSize,
    onSelect,
    bookmark: {
      bookmarkFolder
    }
  } = props;

  React.useEffect(() => {
    dispatch({
      type: 'bookmark/fetchBookmarkFolder',
    });
  }, []);

  const handleCreateFolder = (data, parent) => {
    SimpleInfoDialog({
      title: '新建文件夹',
      initialParent: {
        id: parent?.key,
        value: parent?.label,
      },
      initialValue: {
        id: data?.key,
        value: data?.label,
      },
      onConfirm: (name: string) => {
        dispatch({
          type: 'bookmark/saveBookmarkFolder',
          payload: {
            id: data?.key,
            name: name,
            parentId: parent?.key,
          },
          callback: () => {
            // 刷新
            dispatch({
              type: 'bookmark/fetchBookmarkFolder',
            });
          }
        });
      },
    });
  }

  const handleDeleteFolder = data => {
    // 确认是否删除
    Dialog({
      title: '删除',
      message: `是否删除文件夹 [${data?.label}] ?`,
      onConfirm: dlg => {
        dispatch({
          type: 'bookmark/deleteBookmarkFolder',
          payload: {
            id: data.key
          },
          callback: () => {
            // 刷新
            dispatch({
              type: 'bookmark/fetchBookmarkFolder',
            });
          }
        });
        dlg.doCancel();
      }
    });
  }

  const bookmarkMenu = [
    {key: 'addFolder', label: '新建文件夹'},
    {type: 'divider'},
    {key: 'moveUp', label: '上移'},
    {key: 'moveDown', label: '下移'},
    {type: 'divider'},
    {key: 'renameFolder', label: '重命名'},
    {key: 'removeFolder', label: '删除'}
  ];

  const handleMenuItemClick = (item, data) => {
    switch (item.key) {
      case 'addFolder':
        // data为父文件夹数据
        handleCreateFolder(undefined, data);
        break;
      case 'addBookmark':
        break;
      case 'renameFolder':
        handleCreateFolder(data, undefined);
        break;
      case 'removeFolder':
        handleDeleteFolder(data);
        break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Icon name={'bookmark'} size={22}/><span>书签</span>
        <Dropdown
          trigger={'click'}
          position={'bottomRight'}
          zIndex={100}
          clickToHide={true}
          render={
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCreateFolder(undefined, undefined)}>新建文件夹</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item>导入</Dropdown.Item>
              <Dropdown.Item>导出</Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <div className={styles.menuButton}>
            <Icon name={'menu'} size={22}/>
          </div>
        </Dropdown>

      </div>
      <Tree
        data={bookmarkFolder}
        height={frameSize.height - 50}
        onSelect={(selectedItem) => {
          onSelect(selectedItem);
        }}
        folderIcon={'bookmarks'}
        groupMenu={bookmarkMenu}
        menuItemClick={handleMenuItemClick}
      />
    </div>
  )
}

export default connect(({global, bookmark}) => ({
  frameSize: global.frameSize,
  bookmark
}))(BookmarkFolderPanel);