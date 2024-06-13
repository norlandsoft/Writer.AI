import React, {useEffect} from "react";
import {connect} from 'umi';
import {Form, Input, InputNumber, Select, Spin} from 'antd';
import {Button, success} from '@/components/air-design';
import Footbar from "../Footbar";

const DatabaseSettings: React.FC = (props: any) => {

  const {
    dispatch,
    loading
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'database/fetchProfile',
      payload: {},
      callback: (data: any) => {
        form.setFieldsValue(data);
      }
    });
  }, []);

  const handleSaveDbSettings = () => {
    form.validateFields().then(values => {
      dispatch({
        type: 'database/saveProfile',
        payload: values,
        callback: (data: any) => {
          if (data.success) {
            success({
              message: '保存成功',
            });
          }
        }
      });
    }).catch(err => {
      console.log(err);
    });
  }

  const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
  };

  // 获取弹出层渲染位置
  const getPopupContainer = () => {
    return document.getElementById('air-database-dropdown') || document.body;
  }

  return (
    <div id={'air-database-dropdown'}>
      <Spin spinning={loading}>
        <div style={{padding: '60px 60px 0 60px'}}>
          <Form
            form={form}
            {...formItemLayout}
          >
            <Form.Item
              name='id'
              hidden
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label='名称'
              name='name'
              rules={[{required: true, message: '请输入名称'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label='类型'
              name='type'
              rules={[{required: true, message: '请选择类型'}]}
            >
              <Select
                options={[
                  {label: 'MySQL', value: 'mysql'},
                  {label: 'PostgreSQL', value: 'postgresql'}
                ]}
                getPopupContainer={getPopupContainer}
              />
            </Form.Item>
            <Form.Item
              label='服务器'
              name='host'
              rules={[{required: true, message: '请输入服务器地址'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label='端口'
              name='port'
              rules={[{required: true, message: '请输入端口'}]}
            >
              <InputNumber/>
            </Form.Item>
            <Form.Item
              label='用户'
              name='user'
              rules={[{required: true, message: '请输入用户'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label='密码'
              name='password'
              rules={[{required: true, message: '请输入密码'}]}
            >
              <Input.Password/>
            </Form.Item>
            {/*<Form.Item*/}
            {/*  wrapperCol={{*/}
            {/*    span: 24,*/}
            {/*    offset: 4,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Button>测试...</Button>*/}
            {/*</Form.Item>*/}
          </Form>
        </div>
      </Spin>
      <Footbar onSave={handleSaveDbSettings}/>
    </div>
  );
}

export default connect(({database, loading}) => ({
  database,
  loading: loading.effects['database/fetchProfile'],
}))(DatabaseSettings);