import React from "react";
import {Form, Input} from 'antd';

interface BookmarkInfoPanelProps {
  form: any;
  bookmark: any;
}

const BookmarkInfoPanel: React.FC<BookmarkInfoPanelProps> = props => {

  const {
    form,
    bookmark
  } = props;

  return (
    <div>
      <Form form={form}>
        <Form.Item
          name={'folderId'}
          initialValue={bookmark?.folderId}
          hidden
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name={'id'}
          initialValue={bookmark?.id}
          hidden
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label={'名称'}
          name={'name'}
          required={true}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label={'网址'}
          name={'url'}
          required={true}
        >
          <Input/>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BookmarkInfoPanel;