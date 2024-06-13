import React, {createRef} from "react";
import {error, Dialog} from 'aird';
import {Form, Input} from "antd";

const frmRef = createRef<any>();

const parentStyle = {
  height: '40px',
  lineHeight: '40px',
  paddingLeft: '10px',
  border: '1px solid #ccc',
  borderRadius: '3px',
  fontSize: '0.95rem',
  // 禁止换行
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

interface SimpleInfoDialogValue {
  label?: string,
  id?: string,
  value?: string
}

interface SimpleInfoDialogOptions {
  title: any,
  initialParent?: SimpleInfoDialogValue | undefined,
  initialValue?: SimpleInfoDialogValue | undefined,
  onConfirm: (name: string) => void,
  onCancel?: () => void
}

const SimpleInfoDialog = (options: SimpleInfoDialogOptions) => {

  const showParent = options.initialParent && options.initialParent.id;

  Dialog({
    title: options.title,
    content: <Form ref={frmRef}>
      {
        showParent && (
          <>
            <Form.Item
              name={'parentId'}
              initialValue={options.initialParent?.id}
              hidden={true}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label={options.initialParent?.label ? options.initialParent.label : '父级'}
            >
              <div style={parentStyle}>{options.initialParent?.value}</div>
            </Form.Item>
          </>
        )
      }
      <Form.Item
        label={options.initialValue?.label ? options.initialValue?.label : '名称'}
        name={'name'}
        initialValue={options.initialValue?.value}
      >
        <Input/>
      </Form.Item>
    </Form>,
    onConfirm: dlg => {
      // 获取并返回表单数据对象
      frmRef.current.validateFields().then(values => {
        if (values.name && values.name.trim().length > 0) {
          if (options.onConfirm) options.onConfirm(values.name);
          // close
          dlg.doCancel();
        } else {
          error({
            message: '请输入合法名称'
          });
        }
      });
    },
    onCancel: () => {
      if (options.onCancel) options.onCancel();
    }
  });
}

export default SimpleInfoDialog;