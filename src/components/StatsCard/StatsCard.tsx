import { Alert, CardProps, Flex, Typography } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import { ReactElement, ReactNode } from 'react';
import { Card } from '../Card/Card';
import {Loader} from '../Loader/Loader';
import CountUp from 'react-countup';
import { LiaBrainSolid } from "react-icons/lia";

import { MdOutlinePendingActions } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
type Props = {
  title: 'followers' | 'following' | 'likes' | 'comments' | string;
  value?: number;
  error?: ReactNode;
  loading?: boolean;
} & CardProps;

export const StatsCard = ({
  value,
  title,
  loading,
  error,
  ...others
}: Props) => {
  const Icon = (): ReactElement => {
    let i;
    switch (title) {
      case "بیماران در حال ثبت نام":
        i = <MdOutlinePendingActions style={{ fontSize: 30 }} />;
        break;
      case 'تعداد تشنج های ثبت شده امروز':
        i  =<LiaBrainSolid  style={{ fontSize: 35 }}/>;
        break;
      case 'تعداد بیماران فعال':
        i =<UserOutlined style={{ fontSize: 30 }} />;
        break;
      case "تعداد دکتر های ثبت شده":
        i = <FaUserDoctor style={{ fontSize: 50 }}  />;
        break;
      case "تعداد بیماران ثبت شده":
        i = <UserOutlined style={{ fontSize: 50 }}  />;
        break;
      default:
        i = <UserOutlined style={{ fontSize: 30 }} />;
        break;
    }

    return i;
  };

  return (
    <Card {...others}>
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : loading ? (
        <Loader />
      ) : (
        <Flex vertical gap="middle">
          <Icon />
          <Typography.Text className="text-capitalize">{title}</Typography.Text>
          <Typography.Title level={2} className="m-0">
            <CountUp end={value || 0} />
            

          </Typography.Title>
        </Flex>
      )}
    </Card>
  );
};
