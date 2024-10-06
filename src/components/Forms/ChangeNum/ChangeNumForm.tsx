import React, { useEffect, useState } from "react";
import { FunctionComponent, useCallback } from "react";
import {
  InfoCircleOutlined,
  UserOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Tooltip,
  ConfigProvider,
  Divider,
  Row,
  Col,
  Card,
} from "antd";
import { useNavigate } from "react-router-dom";

export type FrgpassComponentType = {
  className?: string;
};
interface ChangeNumComponentProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
const ChangeNumForm: FunctionComponent<ChangeNumComponentProps> = ({
  current,
  setCurrent,
}) => {

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    setCurrent(current + 1);
    console.log(current);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    newNum?: string;
  };
  const next = () => {
    setCurrent(current + 1);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form
            name="form-change-num"
            layout="vertical"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item<FieldType>
              label="شماره تماس جدید"
              name="newNum"
              rules={[
                {
                  required: true,
                  message: "لطفاً شماره تماس جدید خود را وارد کنید!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                مرحله بعد
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default ChangeNumForm;
