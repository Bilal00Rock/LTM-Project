import { Alert, CardProps, Flex, Typography } from 'antd';
import {
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { ReactElement, ReactNode } from 'react';
import { Card } from '../Card/Card';
import {Loader} from '../Loader/Loader';
import CountUp from 'react-countup';
import { LiaBrainSolid } from "react-icons/lia";


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
      case 'تعداد بیماران':
        i = <UserOutlined style={{ fontSize: 30 }} />;
        break;
      case 'بیماران در لیست انتظار':
        i = <UserAddOutlined style={{ fontSize: 30 }} />;
        break;
      case 'تعداد تشنج های ثبت شده':
        i  =<LiaBrainSolid  style={{ fontSize: 35 }}/>;
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
            <CountUp end={value || 10} />
            

          </Typography.Title>
        </Flex>
      )}
    </Card>
  );
};
