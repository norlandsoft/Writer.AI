import React from "react";
import {connect} from 'umi';
import {Splitter} from 'aird';
import styles from "@/pages/Knowledge/index.less";

const Loader: React.FC = (props: any) => {
  const {
    frameSize
  } = props;

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
      <div></div>
      <div></div>
    </Splitter>
  );
};

export default connect(({global}) => ({
  frameSize: global.frameSize,
}))(Loader);