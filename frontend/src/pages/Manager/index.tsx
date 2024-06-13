import React from "react";
import {connect} from 'umi';
import IssueList from "./components/IssueList";
import styles from "./index.less";

const Manager: React.FC = (props: any) => {
  const {
    frameSize
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.left} style={{height: frameSize.height}}>
        问题管理
      </div>
      <div className={styles.content}>
        <IssueList/>
      </div>
    </div>
  );
};

export default connect(({global}) => ({
  frameSize: global.frameSize,
}))(Manager);