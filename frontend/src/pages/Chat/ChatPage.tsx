import React, {useEffect, useState} from "react";
import {connect} from 'umi';
import {Icon, SlidePanel, UploadDialog} from 'aird';
import {success, error} from "@/components/air-design";
import ChatInput from "@/components/ChatInput";
import ChatView from "@/components/ChatView";
import {Form, FloatButton} from "antd";
import styles from './ChatPage.less';

import ChatHistory from "./ChatHistory";
import EmptyNotice from './EmptyNotice';

import FileAttachmentPanel from './components/FileAttachmentPanel';
import ChatSettingPanel from "./components/ChatSettingPanel";

const ChatPage: React.FC = (props: any) => {

  const {
    dispatch,
    frameSize,
    chat: {
      currentSession,
      chatList,
      lastContent
    },
    session: {
      chatUISettings
    }
  } = props;

  const [inputHeight, setInputHeight] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  // const [historyWidth, setHistoryWidth] = useState<number>(255);
  const [toggleName, setToggleName] = useState<string>('toggle_normal');

  const historyWidth = chatUISettings.showHistory ? 255 : 0;
  const togglePosition = historyWidth - 5;
  const langWidth = frameSize.width - historyWidth - 175;

  // 显示设置面板
  const [showConfig, setShowConfig] = useState<boolean>(false);

  // 聊天设置表单对象
  const [chatSettingForm] = Form.useForm();

  useEffect(() => {
    // 加载设置
    const uiSettings = localStorage.getItem('machine/chat/ui/settings');
    if (uiSettings) {
      saveUISettings(JSON.parse(uiSettings));
    }

    // 加载聊天历史
  }, []);

  const saveUISettings = (settings: any) => {
    dispatch({
      type: 'session/saveChatUISettings',
      payload: settings
    });
    localStorage.setItem('machine/chat/ui/settings', JSON.stringify(settings));
  }

  const toggleHistoryPanel = () => {
    const newSettings = {
      ...chatUISettings,
      showHistory: !chatUISettings.showHistory
    };
    saveUISettings(newSettings);
  }

  const sendQuestion = (question: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    dispatch({
      type: 'chat/conversation',
      payload: {
        sessionId: currentSession,
        content: question
      },
      callback: (data: ChatResponseProps) => {

        if (currentSession === null) {
          dispatch({
            type: 'chat/saveCurrentSession',
            payload: data.sessionId
          });
        }

        dispatch({
          type: 'chat/fetchResponse',
          payload: data,
          callback: (response: any) => {

            if (response === '<OPEN>') {
              setLoading(true);
              return;
            }

            if (response === '<END>' || response === '<ERROR>') {
              // 结束对话，将最后一次的回答保存到chatList
              dispatch({
                type: 'chat/saveLastChatMessage',
                payload: data.chatId,
              });
              setLoading(false);
              return;
            }

            dispatch({
              type: 'chat/updateLastContent',
              payload: response
            });
          }
        });
      }
    });
  }

  // 侧边栏保存聊天设置
  const handleSaveChatSetting = () => {
    chatSettingForm.validateFields().then((values: any) => {
      dispatch({
        type: 'chat/saveChatSetting',
        payload: values,
        callback: resp => {
          if (resp.success) {
            success({
              title: '保存成功',
              message: '聊天设置已保存'
            });
            setShowConfig(false);
          } else {
            error({
              title: '保存失败',
              message: resp.message
            });
          }
        }
      });
    });
  }

  // 显示上传文件对话框
  const handleAttachment = (file: any) => {
    UploadDialog({
      title: '上传文件',
    });
  }

  return (
    <div className={styles.container} style={{height: frameSize.height, width: frameSize.width - 1}}>
      <div className={styles.history}
           style={{width: historyWidth, borderRight: chatUISettings.showHistory ? '1px solid #ccc' : 'none'}}>
        <ChatHistory/>
      </div>
      <div className={styles.toggle} style={{left: togglePosition, height: frameSize.height}}>
        <div className={styles.toggleInner}
             onMouseEnter={() => {
               chatUISettings.showHistory ? setToggleName('toggle_close') : setToggleName('toggle_open')
             }}
             onMouseLeave={() => setToggleName('toggle_normal')}
             onClick={() => {
               // setHistoryWidth(chatUISettings.showHistory ? 0 : 255)
               toggleHistoryPanel();
               setToggleName('toggle_normal')
             }}
        >
          <Icon name={toggleName} size={32} color={'#888'} thickness={3}/>
        </div>
      </div>
      <div className={styles.content} style={{width: frameSize.width - historyWidth}}>
        {/*聊天列表*/}
        {
          currentSession ? (
            <ChatView
              height={frameSize.height - inputHeight - 40 - 18}
              width={langWidth}
              chatList={chatList}
              lastResponse={lastContent}
              loading={loading}
            />
          ) : <EmptyNotice height={frameSize.height - inputHeight - 50 + 16} width={frameSize.width - historyWidth - 1}/>
        }

        <div className={styles.input}>
          {/*文件列表 高度40px*/}
          <FileAttachmentPanel/>
          {/*输入框*/}
          <ChatInput width={langWidth}
                     onHeightChange={h => setInputHeight(h + 40)}
                     onSend={(text: string) => sendQuestion(text)}
                     finished={!loading}/>
        </div>
      </div>

      <FloatButton.Group shape="square" style={{ bottom: '220px' }}>
        <FloatButton
          icon={<Icon name={'option'} size={20}/>}
          onClick={() => setShowConfig(true)}
        />
        <FloatButton
          icon={<Icon name={'download'} size={20}/>}
        />
        <FloatButton
          icon={<Icon name={'attach'} size={20}/>}
          onClick={handleAttachment}
        />
      </FloatButton.Group>


      <SlidePanel
        title="对话设置"
        open={showConfig}
        type={'medium'}
        bodyPadding={'6px 32px'}
        onClose={() => setShowConfig(false)}
        onConfirm={handleSaveChatSetting}
        hasCloseButton={true}
      >
        <ChatSettingPanel form={chatSettingForm}/>
      </SlidePanel>
    </div>
  );
}

export default connect(({global, chat, session}) => ({
  frameSize: global.frameSize,
  chat,
  session
}))(ChatPage);