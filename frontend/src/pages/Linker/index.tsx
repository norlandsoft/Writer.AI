import React from "react";
import {connect} from 'umi';
import {Splitter} from 'aird';
import styles from "@/pages/Knowledge/index.less";

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const markdown = `
这是一个普通的段落。

这是一个行内公式：[ 华氏度 = 摄氏度 \\times \\frac{9}{5} + 32 ]

这是一个块级公式：

$$
\\int_0^\\infty x^2 dx
$$
`;

const Linker: React.FC = (props: any) => {
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
      <div>
        <ReactMarkdown
          children={markdown}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>
    </Splitter>
  );
};

export default connect(({global}) => ({
  frameSize: global.frameSize,
}))(Linker);