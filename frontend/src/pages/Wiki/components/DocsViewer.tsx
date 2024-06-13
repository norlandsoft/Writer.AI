import React from "react";
import {connect} from 'umi';
import {Button} from 'aird';
import styles from './DocsViewer.less';

interface DocsViewerProps {
  frameSize: any;
  docId: string;
}

const DocsViewer: React.FC<DocsViewerProps> = props => {

  const {
    frameSize
  } = props;

  return (
    <div className={styles.container} style={{height: frameSize.height}}>
      <div className={styles.toolbar}>
        &nbsp;
        <div className={styles.buttons}>
          <Button type="primary">编辑</Button>
        </div>
      </div>
      <div className={styles.content} style={{height: frameSize.height - 55}}>
        <div>
          {props.docId}
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          ---------------------
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          ok
        </div>
      </div>
    </div>
  );
}

export default connect(({global}) => ({
  frameSize: global.frameSize
}))(DocsViewer);