import React from "react";
import {connect} from 'umi';
import {Button, Table} from '@/components/air-design';
import Footbar from "../Footbar";

const UserSettings = (props: any) => {

  const {
    frameSize
  } = props;

  const tableHeight  = frameSize.height - 60 - 51;

  return (
    <div>
      <div style={{height: '32px', padding: '20px 12px 8px'}}>
        <Button type={'primary'}>新建</Button>
      </div>
      <div style={{height: tableHeight, overflow: 'auto'}}>
        <Table
          height={tableHeight - 17}
          columns={[]}
          data={[]}
        />
      </div>
      <Footbar/>
    </div>
  );
}

export default connect(({global}) => ({
  frameSize: global.frameSize
}))(UserSettings);