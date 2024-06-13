import React, {useEffect} from "react";
import {connect} from 'umi';
import {ConfigProvider, Form, Input} from 'antd';
import {Icon} from 'aird';
import {Dialog, MenuButton} from "@/components/air-design";
import styles from './ChatHistory.less';

const ChatHistory: React.FC = (props: any) => {

  const {
    dispatch,
    frameSize,
    chat: {
      currentSession,
      historyList
    },
  } = props;

  const [menuId, setMenuId] = React.useState('');
  const [renameForm] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'chat/fetchHistoryList'
    });
  }, [currentSession]);

  const createNewChat = () => {
    dispatch({
      type: 'chat/clearChatSession'
    });
  }

  const handleSelectSession = (id: string) => {
    if (id === currentSession) return;

    createNewChat();

    // 设置当前会话ID
    dispatch({
      type: 'chat/saveCurrentSession',
      payload: id
    });

    // 加载聊天列表
    dispatch({
      type: 'chat/fetchChatList',
      payload: {
        sessionId: id
      }
    });
  }

  const handleRenameChatSession = (item: any) => {
    renameForm.resetFields();
    Dialog({
      title: '重命名对话',
      content: (
        <ConfigProvider
          prefixCls={"air"}
        >
          <Form form={renameForm}>
            <Form.Item
              name={'id'}
              initialValue={item.id}
              hidden={true}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name={'name'}
              initialValue={item.name}>
              <Input/>
            </Form.Item>
          </Form>
        </ConfigProvider>
      ),
      onConfirm: (dlg: any) => {
        renameForm.validateFields().then((values: any) => {
          dispatch({
            type: 'chat/updateHistoryInfo',
            payload: values,
            callback: () => {
              dlg.doCancel();
            }
          });
        });
      }
    })
  }

  const handleDeleteChatSession = (item: any) => {
    Dialog({
      title: '删除对话',
      content: <div>即将删除对话: <b>{item.name}</b></div>,
      onConfirm: (dlg: any) => {
        dispatch({
          type: 'chat/deleteHistoryInfo',
          payload: item.id,
          callback: () => {
            if (item.id === currentSession) {
              createNewChat();
            }
            dlg.doCancel();
          }
        });
      }
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.newChat} onClick={createNewChat}>
        新建对话
        <Icon name={'document_add'} size={20} color={'#222'} thickness={1.8}/>
      </div>

      <div className={styles.history} style={{height: frameSize.height - 48}}>
        {
          historyList.map((item: any) => {
            return (
              <div
                className={styles.session}
                key={item.id}
                style={item.id === currentSession ? {background: '#b2d1f5'} : {background: "transparent"}}
                onClick={() => handleSelectSession(item.id)}
                onMouseOver={() => setMenuId(item.id)}
                onMouseOut={() => setMenuId('')}
              >
                <div className={styles.icon}>
                  <Icon name={'dialog'} size={16} thickness={0.1}/>
                </div>
                <div className={styles.title}>
                  {item.name}
                </div>
                <div className={styles.menu} style={{visibility: 'visible'}}>
                  {
                    menuId === item.id && <MenuButton size={22} innerMargin={0} style={{background: 'transparent', border: 'none', padding: 0}} items={[
                      {
                        key: 'rename', label: '重命名', onClick: () => handleRenameChatSession(item)
                      },
                      {
                        key: 'del', label: '删除', onClick: () => handleDeleteChatSession(item)
                      },
                    ]}/>
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default connect(({global, chat}) => ({
  frameSize: global.frameSize,
  chat
}))(ChatHistory);