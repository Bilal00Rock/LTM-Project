import { Input, Result, Steps } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import {
  SolutionOutlined,
  MessageOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import type { GetProps } from "antd";
import AddPatientForm from "./AddPatientForm";
import ConfirmOTP from "./ConfirmOTP";

type OTPProps = GetProps<typeof Input.OTP>;

export type FrgpassComponentType = {};
interface AddFormLayoutComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFormLayout: FunctionComponent<AddFormLayoutComponentProps> = ({
  open,
  setOpen,
}) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!open) {
      setCurrent(0);
    } else {
    }
  }, [open]);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onFinish1 = (values: any) => {
    console.log("Received values of form: ", values);
    next();
  };
  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };
  const steps = [
    {
      title: "ثبت اطلاعات",
      content: <AddPatientForm current={current} setCurrent={setCurrent} />,
      icon: <SolutionOutlined />,
    },

    {
      title: "رمز یکبار مصرف",
      content: <ConfirmOTP current={current} setCurrent={setCurrent} />,
      icon: <MessageOutlined />,
    },
    {
      title: "انجام شد",
      content: (
        <Result
          status="success"
          title="عملیات با موفقیت انجام شد!"
          subTitle="بیمار با موفقیت توی لیست بیماران درحال ثبت نام ثبت شد!"
        />
      ),
      icon: <FileDoneOutlined />,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  return (
    <>
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
    </>
  );
};
export default AddFormLayout;
