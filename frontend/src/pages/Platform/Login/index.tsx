import React from "react";
import {connect} from "umi";
import {ConfigProvider, Button, Form, Input} from 'antd';
import styles from './index.less';

const Login: React.FC = (props: any) => {
  const {
    dispatch,
    loginLoading
  } = props;

  const handleSubmit = (values: any) => {
    dispatch({
      type: 'login/login',
      payload: {
        ...values
      }
    });
  }

  return (
    <ConfigProvider prefixCls={"air"}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.office}>
            <div className={styles.cover}/>
          </div>

          <div className={styles.login}>
            {/*title icon*/}
            <div className={styles.title}/>

            {/*login form*/}
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={values => {
                handleSubmit(values);
                return Promise.resolve();
              }}
              onError={() => {
                return Promise.resolve();
              }}
              autoComplete="off"
            >
              <Form.Item
                name="id"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              >
                <Input placeholder='用户名'/>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              >
                <Input.Password placeholder='密码'/>
              </Form.Item>

              <Form.Item>
                <Button id='loginButton' className={styles.loginButton} type="primary" loading={loginLoading} htmlType="submit">
                  登 录
                </Button>
              </Form.Item>
            </Form>

          </div>

        </div>

        <div className={styles.footer}>
          Copyright &copy;2023-{new Date().getFullYear()} Norlandsoft Studio
        </div>
      </div>
    </ConfigProvider>
  );
}

export default connect(({login, loading}) => ({
  login,
  loginLoading: loading.effects['login/login']
}))(Login);