import React from "react";
import {connect} from 'umi';
import {Splitter, Tree} from 'aird';

import styles from './index.less';

const Writer: React.FC = (props: any) => {
  
  const {
    dispatch,
    frameSize
  } = props;

  const [docId, setDocId] = React.useState('');

  const ddata = [
    {
      label: '文档',
      key: '1',
      children: [
        {
          label: '文档1的名称非常长，但是长名称不可以显示全，所以要截断',
          key: '1-1',
        },
        {
          label: '文档2',
          key: '1-2',
        },
        {
          label: '文档3',
          key: '1-3',
        },
        {
          label: '文档3',
          key: '1-4',
        },
        {
          label: '文档3',
          key: '1-5',
        },
        {label: '文档3', key: '1-6',},
        {label: '文档3', key: '1-7',},
        {label: '文档3', key: '1-8',},
        {label: '文档3', key: '1-9',},
        {label: '文档3', key: '1-10',},
        {label: '文档3', key: '1-11',},
        {label: '文档3', key: '1-12',},
        {label: '文档3', key: '1-13',},
        {label: '文档3', key: '1-14',},
        {label: '文档3', key: '1-15',},
      ],
    },
    {
      label: '文档',
      key:'2',
    }
  ];

  const handleNewDocDialog = () => {
  }

  const handleDockItemClick = (item: any) => {
    setDocId(item.key);
  }

  return (
    <Splitter
      split="vertical"
      primary="first"
      defaultSize={320}
      minSize={180}
      maxSize={500}
      style={{width: frameSize.width, height: frameSize.height}}
      className={styles.container}
    >
      <div style={{height: frameSize.height}} className={styles.nav}>
        <div className={styles.spaceName}>
          <div className={styles.spaceNameInner}>
            空间名称
          </div>
        </div>
        <Tree
          data={ddata}
          height={frameSize.height - 51}
          showFilter={true}
          groupCollapsed={true}
          // defaultExpandedKeys={['ROOT-CODEC']}
          // defaultValue={'CODEC-GENERATOR'}
          onSelect={handleDockItemClick}
          // menuItemClick={handleMenuItemClick}
          rootButtonClick={handleNewDocDialog}
        />
      </div>
      <div className={styles.content} style={{height: frameSize.height}}>
        <div>Work</div>
      </div>
    </Splitter>
  );
}

export default connect(({global}) => ({
  frameSize: global.frameSize
}))(Writer);