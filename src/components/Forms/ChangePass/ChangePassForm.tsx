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
interface ChangepassComponentProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
const ChangePassForm: FunctionComponent<ChangepassComponentProps> = ({
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
    currentPassword?: string;
    newPassword?: string;
    reEnterPassword?: string;
  };
  const next = () => {
    setCurrent(current + 1);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form
            name="form-change-password"
            layout="vertical"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item<FieldType>
              label="رمز عبور فعلی "
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "لطفاً رمز عبور فعلی خود را وارد کنید!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="رمز عبور جدید"
              name="newPassword"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "لطفاً رمز عبور جدید خود را وارد کنید!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label=" تکرار رمز عبور"
              name="reEnterPassword"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "لطفاً رمز عبور جدید خود را دوباره وارد کنید!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("!گذرواژه ها یکسان نیستند")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
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
export default ChangePassForm;
