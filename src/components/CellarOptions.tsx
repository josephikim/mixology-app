import React from 'react';
import { Form, Select, Input, Button } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const CellarOptions = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  const onViewChange = (value: string) => {
    switch (value) {
      case 'all':
        console.log('show me all');
        return;
      case 'wine':
        console.log('show me wine');

        return;
      case 'spirits':
        console.log('show me spirits');
    }
  };

  return (
    <Form {...layout} form={form} name="cellarOptions" onFinish={(values) => handleFormSubmit(values)}>
      <Form.Item name="selectView" label="Select View" rules={[{ required: true }]}>
        <Select placeholder="Select view" onChange={onViewChange} allowClear>
          <Option value="all">all</Option>
          <Option value="wine">wine</Option>
          <Option value="spirits">spirits</Option>
        </Select>
      </Form.Item>

      <Form.Item name="searchInput" label="Search">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CellarOptions;
