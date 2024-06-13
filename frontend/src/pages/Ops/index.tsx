import React from "react";
import {connect} from 'umi';
import {Splitter} from 'aird';
import WebShell from "./WebShell";

import styles from "./index.less";

const Ops: React.FC = (props: any) => {
  const {
    frameSize
  } = props;

  const [treeWidth, setTreeWidth] = React.useState(320);

  return (
    <Splitter
      split="vertical"
      primary="first"
      defaultSize={320}
      minSize={180}
      maxSize={500}
      className={styles.container}
      style={{width: frameSize.width, height: frameSize.height}}
      onChange={w => setTreeWidth(w)}
    >
      <div>a</div>
      <div>
        <WebShell height={frameSize.height - 8} width={frameSize.width - treeWidth - 9}/>
      </div>
    </Splitter>
  );
};

export default connect(({global}) => ({
  frameSize: global.frameSize,
}))(Ops);