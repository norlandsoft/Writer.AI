import React, {useEffect, useState} from 'react';
import {connect} from 'umi';

import Login from '@/pages/Platform/Login'
import BasicLayout from "@/layouts/BasicLayout";

const SecurityLayout: React.FC = (props: any) => {
  const {
    dispatch,
    currentUser,
    loading
  } = props;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (dispatch) {
      dispatch({
        type: 'login/fetchCurrentUser'
      });
    }
  }, []);

  // 是否可以获取当前用户信息
  const isLogin = currentUser && currentUser.id;
  if ((!isLogin && loading) || !ready) {
    return <div/>;
  }

  return isLogin ? <BasicLayout/> : <Login/>;
};

export default connect(({login, loading}) => ({
  currentUser: login.currentUser,
  loading: loading.effects['login/fetchCurrentUser']
}))(SecurityLayout);