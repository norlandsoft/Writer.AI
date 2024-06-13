import React from "react";
import {connect} from 'umi';
import {Splitter} from '@/components/air-design';
import BookmarkFolderPanel from "./BookmarkFolderPanel";
import BookmarkListPanel from "./BookmarkListPanel";

const Bookmark: React.FC = (props: any) => {

  const {
    frameSize
  } = props;

  const [currentPage, setCurrentPage] = React.useState();

  return (
    <div>
      <Splitter
        split="vertical"
        primary="first"
        defaultSize={320}
        minSize={180}
        maxSize={500}
        style={{width: frameSize.width, height: frameSize.height}}
      >
        <BookmarkFolderPanel
          onSelect={item => {
            setCurrentPage(item)
          }}
        />
        <BookmarkListPanel folder={currentPage}/>
      </Splitter>
    </div>
  );
}

export default connect(({global}) => ({
  frameSize: global.frameSize,
}))(Bookmark);