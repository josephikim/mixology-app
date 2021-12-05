import React from 'react';
import { Form, Select, Input, Button } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 24 }
};

const BottleOptions: React.FC = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: string[]): void => {
    console.log(values);
  };

  const onStatusChange = (value: string): void => {
    switch (value) {
      case 'In stock':
        console.log('In stock');
        return;
      case 'Out of stock':
        console.log('Out of stock');
        return;
      case 'Wish list':
        console.log('wish list');
    }
  };

  return (
    <Form
      {...layout}
      form={form}
      name="bottleOptions"
      layout="vertical"
      onFinish={(values): void => handleFormSubmit(values)}
    >
      <Form.Item name="selectStatus" label="Select Status" rules={[{ required: true }]}>
        <Select placeholder="Select Status" onChange={onStatusChange} allowClear>
          <Option value="In stock">In stock</Option>
          <Option value="Out of stock">Out of stock</Option>
          <Option value="Wish list">Wish list</Option>
        </Select>
      </Form.Item>

      <Form.Item name="quantityInput" label="Quantity" initialValue="1">
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

export default BottleOptions;
