import React from "react";
import {EditorRender, useEditor} from '@norlandsoft/tide';
import { StarterKit } from '@norlandsoft/tide-starter-kit';

import '@norlandsoft/tide/dist/style.css';
import 'highlight.js/styles/a11y-light.css';

const DocsEditor: React.FC = (props: any) => {
  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit.configure({
        textAlign: false,
        taskItem: {
          onReadOnlyChecked: () => true,
        },
      }),
    ],
    readOnlyEmptyView: (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <p>暂无内容（只读模式）</p>
      </div>
    ),
  });

  return (
    <div>
      <EditorRender editor={editor} />
    </div>
  );
}

export default DocsEditor