import React, {useEffect, useState} from "react";
import {connect} from 'umi';
import {Tag, Spin} from 'antd';
import {Icon} from 'aird';
import {Button, UploadDialog, success} from "@/components/air-design";
import styles from './CollectionInfoPanel.less';
import {CollectionInfo} from "@/pages/Knowledge/models/knowledge";

interface CollectionInfoPanelProps {
  item: any;
  loadLoading: boolean;
  unloadLoading: boolean;
}

const CollectionInfoPanel: React.FC<CollectionInfoPanelProps> = (props: CollectionInfoPanelProps | any) => {
  const {
    dispatch,
    frameSize,
    item,
    infoLoading,
    loadLoading = false,
    unloadLoading = false,
  } = props;

  const [current, setCurrent] = useState<CollectionInfo>(
    {
      id: '',
      name: '',
      status: 0,
      loaded: false
    }
  );
  const [files, setFiles] = useState<any[]>([]);

  const getCurrentInfo = () => {
    if (item) {
      dispatch({
        type: 'knowledge/fetchCollectionInfo',
        payload: {
          "id": item.id
        },
        callback: resp => {
          if (resp.success) {
            setCurrent(resp.data);
          }
        }
      });
    }
  }

  const getFileList = () => {
    dispatch({
      type: 'knowledge/fetchCollectionFileList',
      payload: {
        "group": item.id
      },
      callback: resp => {
        if (resp.success) {
          setFiles(resp.data)
        }
      }
    });
  }

  useEffect(() => {
    getCurrentInfo();
    getFileList();
  }, [item.id]);

  const handleLoadCollection = () => {
    dispatch({
      type: 'knowledge/loadCollection',
      payload: {
        "id": current.id
      },
      callback: resp => {
        if (resp.success) {
          getCurrentInfo();
          // 刷新Collection列表
          dispatch({
            type: 'knowledge/fetchCollectionList',
          });
        }
      }
    });
  };

  const handleUnloadCollection = () => {
    dispatch({
      type: 'knowledge/unloadCollection',
      payload: {
        "id": current.id
      },
      callback: resp => {
        if (resp.success) {
          getCurrentInfo();
          // 刷新Collection列表
          dispatch({
            type: 'knowledge/fetchCollectionList',
          });
        }
      }
    });
  };

  const showUploadDialog = () => {
    UploadDialog({
      title: '上传向量文件',
      url: '/api/v1/storage/upload',
      group: current.id,
      onFileSaved: () => {
        // 刷新文件列表
        getFileList();
      }
    });
  }

  const handleBuildVector = () => {
    dispatch({
      type: 'knowledge/buildVector',
      payload: {
        "id": current.id
      },
      callback: resp => {
        if (resp.success) {
          success({
            message: '成功构建向量'
          })
        }
      }
    });
  }

  return (
    <Spin spinning={infoLoading || loadLoading || unloadLoading}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.title}>
            {current.name}
            {
              current.loaded ? <Tag color={'geekblue'}>已加载</Tag> : <Tag color={'magenta'}>未加载</Tag>
            }
          </div>
          <div className={styles.options}>
            {
              current.loaded ?
                <Button type={'primary'} onClick={handleUnloadCollection}>卸载</Button> :
                <Button type={'primary'} onClick={handleLoadCollection}>加载</Button>
            }
            <Button style={{marginLeft: '32px'}} onClick={showUploadDialog}>
              <Icon name={'upload'} size={16}/>上传
            </Button>
            <Button style={{marginLeft: '4px'}} onClick={handleBuildVector}>
              <Icon name={'build'} size={16}/>重建
            </Button>
          </div>
        </div>

        <div className={styles.files} style={{height: frameSize.height - 127}}>
          {
            files.map((file) => {
              return <div className={styles.file} key={file.key}>
                <div className={styles.name}>{file.value}</div>
                {/*<div className={styles.type}>{file.data}</div>*/}
              </div>
            })
          }
        </div>
      </div>
    </Spin>
  );
}

export default connect(({global, knowledge, loading}) => ({
  frameSize: global.frameSize,
  knowledge,
  infoLoading: loading.effects['knowledge/fetchCollectionInfo'],
  loadLoading: loading.effects['knowledge/loadCollection'],
  unloadLoading: loading.effects['knowledge/unloadCollection'],
}))(CollectionInfoPanel);