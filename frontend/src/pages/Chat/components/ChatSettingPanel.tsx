import React, {useEffect} from 'react';
import {connect} from 'umi';
import {Col, Form, Input, InputNumber, Switch, Space, Row, Select, Slider} from 'antd';

const ChatSettingPanel = (props: any) => {

  const {
    dispatch,
    form
  } = props;

  const [temperature, setTemperature] = React.useState(0.9);
  const [topP, setTopP] = React.useState(0.7);
  // const [topK, setTopK] = React.useState(50);
  const [useInternet, setUseInternet] = React.useState<boolean>(false);
  const [collections, setCollections] = React.useState<any[]>([]);

  useEffect(() => {
    dispatch({
      type: 'chat/fetchChatSetting',
      callback: (data: any) => {
        if (data) {
          form.resetFields();
          form.setFieldsValue(data);
          setTemperature(data.temperature);
          setTopP(data.topP);
          setUseInternet(data.useInternet);
        }
      }
    });

    dispatch({
      type: 'knowledge/fetchCollectionList',
      payload: {},
      callback: (data: any) => {
        if (data) {
          // 删除data列表数据项中loaded属性为false的
          data = data.filter(item => item.loaded === true);
          // 根据data生成新列表，新列表label为data.name，value为data.id
          const newData = [{label: "无", value: "000000"}, ...data.map((item: any) => {
            return {
              label: item.name,
              value: item.id
            }
          })]
          setCollections(newData);
        }
      }
    });
  }, []);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name={'userId'}
          hidden
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label={'选择语言模型'}
          name={'modelId'}
        >
          <Select
            options={[
              {label: '清华智谱 GLM-4', value: 'glm-4'},
              {label: '清华智谱 GLM-4-Chat', value: 'glm-4-chat'},
              {label: '通义千问 QWEN-14B', value: 'qwen'},
            ]}
          />
        </Form.Item>

        <Space.Compact>
          <Form.Item
            label={'最大上下文条数'}
          >
          </Form.Item>
          <Form.Item
            name={'contextCount'}
          >
            <InputNumber
              min={0}
              max={1024}
              step={1}
            />
          </Form.Item>
        </Space.Compact>
        <br/>
        <Space.Compact>
          <Form.Item
            label={'最大输出Token'}
          >
          </Form.Item>
          <Form.Item
            name={'maxTokens'}
          >
            <InputNumber
              min={128}
              step={1}
            />
          </Form.Item>
        </Space.Compact>


        <Row style={{marginTop: '60px'}}>
          <Col span={20} style={{marginTop: '-35px'}}>
            <Form.Item
              label={'Temperature'}
              name={'temperature'}
            >
              <Slider
                min={0.01}
                max={1.00}
                step={0.01}
                value={temperature}
                onChange={value => setTemperature(value)}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name={'temperature'}
            >
              <InputNumber
                min={0.01}
                max={1.00}
                style={{margin: '0 0 0 8px'}}
                step={0.01}
                value={temperature}
                onChange={value => setTemperature(value ? value : 0.01)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row style={{marginTop: '16px'}}>
          <Col span={20} style={{marginTop: '-35px'}}>
            <Form.Item
              label={'Top P'}
              name={'topP'}
            >
              <Slider
                min={0.01}
                max={0.99}
                step={0.01}
                value={topP}
                onChange={value => setTopP(value)}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name={'topP'}
            >
              <InputNumber
                min={0.01}
                max={0.99}
                style={{margin: '0 0 0 8px'}}
                step={0.01}
                value={topP}
                onChange={value => setTopP(value ? value : 0.01)}
              />
            </Form.Item>
          </Col>
        </Row>
        {/*<Row style={{marginTop: '16px'}}>*/}
        {/*  <Col span={20} style={{marginTop: '-35px'}}>*/}
        {/*    <Form.Item*/}
        {/*      label={'Top K'}*/}
        {/*      name={'topK'}*/}
        {/*    >*/}
        {/*      <Slider*/}
        {/*        min={10}*/}
        {/*        max={200}*/}
        {/*        step={10}*/}
        {/*        value={topK}*/}
        {/*        onChange={value => setTopK(value)}*/}
        {/*      />*/}
        {/*    </Form.Item>*/}
        {/*  </Col>*/}
        {/*  <Col span={4}>*/}
        {/*    <Form.Item*/}
        {/*      name={'topK'}*/}
        {/*    >*/}
        {/*      <InputNumber*/}
        {/*        min={10}*/}
        {/*        max={200}*/}
        {/*        style={{margin: '0 0 0 8px'}}*/}
        {/*        step={10}*/}
        {/*        value={topK}*/}
        {/*        onChange={value => setTopP(value ? value : 50)}*/}
        {/*      />*/}
        {/*    </Form.Item>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Form.Item
          label={'关联知识库'}
          name={'ragId'}
        >
          <Select
            options={collections}
          />
        </Form.Item>

        {/*接入互联网*/}
        <Form.Item>
          <Space.Compact>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              paddingRight: '12px',
              height: '49px',
              userSelect: 'none'
            }}>接入互联网
            </div>
            <Form.Item name={'useInternet'}>
              <Switch
                checked={useInternet}
                onChange={() => setUseInternet(!useInternet)}
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect(({chat}) => ({
  chat
}))(ChatSettingPanel);