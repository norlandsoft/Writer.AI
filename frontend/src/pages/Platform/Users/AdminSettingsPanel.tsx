import React from "react";
import {connect} from "umi";
import { Form, Input } from 'antd';
import {Button, success, error} from '@/components/air-design';
import {SHA} from "@/utils/CryptoUtils";

const AdminSettingsPanel: React.FC = (props: any) => {

  const {
    dispatch
  } = props;

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  const [passwordForm] = Form.useForm();

  const handleChangeAdminPassword = () => {
    passwordForm.validateFields().then(values => {
      if (values.newPassword !== values.confirmNewPassword) {
        error({
          title: '修改用户密码失败',
          message: '新密码和确认密码不一致',
        });
        return;
      }

      dispatch({
        type: 'login/changeAdminPassword',
        payload: {
          password: SHA(values.oldPassword),
          salt: SHA(values.newPassword)
        },
        callback: resp => {
          if (resp.success) {
            passwordForm.resetFields();
            success({
              message: '修改用户密码成功'
            });
          } else {
            error({
              title: '修改用户密码失败',
              message: resp.message,
            });
          }
        }
      });
    });
  }

  return (
    <div style={{width: '320px', padding: '12px 24px'}}>
      <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '12px'}}>重置管理员密码</div>
      <Form
        form={passwordForm}
        {...formItemLayout}
      >
        <Form.Item
          label='旧密码'
          name='oldPassword'
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='新密码'
          name='newPassword'
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='确认新密码'
          name='confirmNewPassword'
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24 }}
        >
          <Button type='primary' onClick={handleChangeAdminPassword}>修改</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect()(AdminSettingsPanel);