import React, {useEffect} from "react";
import {connect} from 'umi';
import {Form, Input, Spin} from 'antd';
import {Icon, Dialog, Splitter, error} from 'aird';
import CollectionInfoPanel from "./CollectionInfoPanel";
import styles from './index.less';

const Knowledge: React.FC = (props: any) => {

  const {
    dispatch,
    frameSize,
    knowledge: {collectionList},
    loading
  } = props;

  const [currentCollection, setCurrentCollection] = React.useState({} as any);
  const [collectionForm] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'knowledge/fetchCollectionList',
      payload: {}
    });
  }, []);

  const NewCollection= () => {
    return (
      <Form form={collectionForm}>
        <Form.Item
          label={'名称'}
          name={'name'}
          required={true}
        >
          <Input/>
        </Form.Item>
      </Form>
    );
  }

  const showNewCollectionDialog = () => {
    collectionForm.resetFields();
    Dialog({
      title: '新建知识库',
      content: <NewCollection/>,
      onConfirm: dlg => {
        collectionForm.validateFields().then(values => {
          dispatch({
            type: 'knowledge/addCollection',
            payload: values,
            callback: resp => {
              if (resp.success) {
                dispatch({
                  type: 'knowledge/fetchCollectionList',
                  payload: {}
                });

                dlg.doCancel();
              } else {
                error({
                  title: '添加失败',
                  message: resp.message
                });
              }
            }
          });
        })
      }
    });
  }

  const handleSelectCollection = (collection: any) => {
    setCurrentCollection(collection);
  }

  return (
    <Splitter
      split="vertical"
      primary="first"
      defaultSize={320}
      minSize={180}
      maxSize={500}
      className={styles.container}
      style={{width: frameSize.width, height: frameSize.height}}
    >
      <Spin spinning={loading}>
        <div className={styles.menu}>
          <div className={styles.newButton} onClick={showNewCollectionDialog}>
            新建知识库
            <Icon name={'document_add'} size={20} color={'#222'} thickness={1.8}/>
          </div>

          <div className={styles.collection_list} style={{height: frameSize.height - 52}}>
            {
              collectionList.map((collection: any) => (
                <div className={styles.collection_item}
                     key={collection.id}
                     onClick={() => handleSelectCollection(collection)}
                     style={currentCollection?.id === collection.id ? {background: '#b2d1f5'} : {}}
                >
                  <div style={{display: 'flex'}}>
                    <Icon name={'document'} size={16} thickness={2} color={collection.loaded ? "blue" : "red"}/>
                  </div>
                  <div className={styles.collection_name}>
                    {collection.name}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Spin>

      <div className={styles.work}>
        {
          currentCollection?.id && <CollectionInfoPanel item={currentCollection}/>
        }
      </div>
    </Splitter>
  );
}

export default connect(({global, knowledge, loading}) => ({
  frameSize: global.frameSize,
  knowledge,
  loading: loading.effects['knowledge/fetchCollectionList']
}))(Knowledge);