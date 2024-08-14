import React from 'react';
import { Breadcrumb, BreadcrumbProps, Button, Divider, Space, Typography } from 'antd';
import { LeftCircleOutlined, UserOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import './styles.css';
import { BackBtn } from '../BackBtn/BackBtn';

type Props = {
  title: string;
  breadcrumbs: BreadcrumbProps['items'];
  icon?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;


export const PageHeader = ({ breadcrumbs, title, icon, ...others }: Props) => {
  return (
    <div {...others}>
      <Space direction="vertical" size="small">
        <Breadcrumb items={breadcrumbs} className="page-header-breadcrumbs" />
        <Typography.Title
          level={3}
          style={{ padding: 0, margin: 3, textTransform: 'capitalize' }}

        >
          {/* when dashboard  is implenemted change btn link to dashbaord */}
          <BackBtn type="text" icon={<LeftCircleOutlined style={{ fontSize: '23px' }} />} style={{ width: 30, height: 30 }} iconOnly={true}></BackBtn>
          <Space>

            {icon}
            {title}
          </Space>
        </Typography.Title>

      </Space>
      <Divider  plain>
      </Divider>
    </div>
  );
};
