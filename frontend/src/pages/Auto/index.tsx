import React from "react";
import {connect} from 'umi';
import {Button} from 'aird';
import WebClient from '@/components/WebClient';
import WebPhone from '@/components/WebPhone';

const Auto: React.FC = (props: any) => {

  const {
    dispatch
  } = props;

  const [webSession, setWebSession] = React.useState<string | undefined>(undefined);
  const [screen, setScreen] = React.useState<string | undefined>(undefined);

  const handleWebMessage = (message: any) => {
    if (message.type === 'echo') {
      setWebSession(message.session);
    } else if (message.type === 'screen') {
      setScreen(message.data);
    }
  }

  const openCalc = () => {
    dispatch({
      type: 'phone/open',
      payload:'aaa',
      callback: (resp: any) => {
      }
    });
  }

  return (
    <div style={{width: '800px'}}>
      {/*<WebClient onMessage={handleWebMessage}/>*/}
      {/*<div>自动化测试</div>*/}
      <Button onClick={openCalc}>Screen</Button>
      {/*{*/}
      {/*  screen && <img src={`data:image/jpeg;base64,${screen}`} width={300}/>*/}
      {/*}*/}
      {/*<FloatPanel/>*/}
      <WebPhone/>
    </div>
  );
}

export default connect(({phone}) => ({
  phone
}))(Auto);