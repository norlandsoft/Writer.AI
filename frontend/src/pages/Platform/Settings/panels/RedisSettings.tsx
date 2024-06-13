import React, {useEffect} from "react";
import {connect} from "umi";
import {Form, Input, InputNumber, Spin} from 'antd';
import Footbar from "../Footbar";
import {success} from "@/components/air-design";

const RedisSettings: React.FC = (props: any) => {

  const {
    dispatch,
    loading
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'database/fetchRedis',
      payload: {},
      callback: (data: any) => {
        form.setFieldsValue(data);
      }
    });
  }, []);

  const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
  };

  const handleSaveVecSettings = () => {
    form.validateFields().then(values => {
      dispatch({
        type: 'database/saveRedis',
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

  return (
    <div>
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
          </Form>
        </div>
      </Spin>
      <Footbar onSave={handleSaveVecSettings}/>
    </div>
  );
}


export default connect(({database, loading}) => ({
  database,
  loading: loading.effects['database/fetchRedis'],
}))(RedisSettings);