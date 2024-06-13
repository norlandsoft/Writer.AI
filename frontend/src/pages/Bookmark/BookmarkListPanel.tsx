import React, {useEffect} from "react";
import {connect} from 'umi';
import {Dialog, Icon} from 'aird';
import {Form} from 'antd';
import BookmarkInfoPanel from './components/BookmarkInfoPanel';

import './BookmarkListPanel.less';

interface BookmarkListPanelProps {
  folder: any;
}

const BookmarkListPanel: React.FC<BookmarkListPanelProps | any> = props => {

  const {
    dispatch,
    frameSize,
    folder,
    currentList
  } = props;

  const [infoForm] = Form.useForm();

  useEffect(() => {
    // 获取书签列表
    loadBookmarkList();
  }, [folder]);

  const loadBookmarkList = () => {
    if (folder && folder.key) {
      dispatch({
        type: 'bookmark/fetchBookmarkList',
        payload: {
          folderId: folder.key
        }
      });
    }
  }

  const handleNewBookmark = () => {
    const bookmark = {
      folderId: folder.key
    }
    infoForm.resetFields();
    Dialog({
      title: '新书签',
      content: <BookmarkInfoPanel form={infoForm} bookmark={bookmark}/>,
      okText: '保存',
      onConfirm: dlg => {
        infoForm.validateFields().then(values => {
          dispatch({
            type: 'bookmark/saveBookmarkInfo',
            payload: values,
            callback: resp => {
              if (resp.success) {
                // 刷新
                loadBookmarkList();
                dlg.doCancel();
              } else {
                // error
              }
            }
          });
        });
      }
    });
  }

  const handleOpenUrl = (url: string) => {
    // url 前置加http
    url = url.startsWith('http') ? url : 'http://' + url;
    // 在新网页中打开url
    window.open(url);
  }

  const EmptyPanel = (
    <div></div>
  );

  const BookmarkPanel = (
    <div className="bookmark-panel">
      <div className='bookmark-panel-toolbar'>
        <span>
          <Icon name={'bookmarks'}/> {folder && folder.label}
        </span>
        <span onClick={handleNewBookmark} style={{cursor: 'pointer'}}>
          <Icon name={'add'} size={28} thickness={1}/>
        </span>
      </div>
      <div className={'bookmark-list'} style={{height: frameSize.height - 50, overflow: 'auto'}}>
        {
          currentList.map(item => {
            return (
              <div key={item.id} className={'bookmark-list-item'} onClick={() => handleOpenUrl(item.url)}>
                <div className={'bookmark-list-item-title'}>{item.name}</div>
                <div style={{color: '#999'}}>{item.url}</div>
                <div className={'bookmark-list-item-action'} onClick={e => {
                  dispatch({
                    type: 'bookmark/fetchWebsiteInfo',
                    payload: {
                      url: item.url
                    },
                    callback: resp => {
                      console.log(resp);
                    }
                  });
                  // 阻止事件冒泡
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}>
                  <Icon name={'more'}/>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );

  return (
    <div style={{height: frameSize.height, overflow: 'hidden'}}>
      {
        folder && folder.key ? BookmarkPanel : EmptyPanel
      }
    </div>
  )
}

export default connect(({global, bookmark}) => ({
  frameSize: global.frameSize,
  bookmark,
  currentList: bookmark.currentList
}))(BookmarkListPanel);