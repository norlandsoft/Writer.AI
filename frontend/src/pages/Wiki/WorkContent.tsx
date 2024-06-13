import React from "react";
import DocsViewer from "./components/DocsViewer";
import DocsEditor from "./components/DocsEditor";

interface WikiWorkContentProps {
  page: string,
  docId: string;
}

const WorkContent: React.FC<WikiWorkContentProps> = props => {

  const {
    page,
    docId
  } = props;

  return (
    <div>
      <DocsViewer docId={docId}/>
    </div>
  );
}

export default WorkContent;