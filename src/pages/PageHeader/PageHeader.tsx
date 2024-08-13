import React from 'react';
import { Breadcrumb, BreadcrumbProps, Button, Divider, Space, Typography } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import './styles.css';

type Props = {
  title: string;
  breadcrumbs: BreadcrumbProps['items'];
} & React.HTMLAttributes<HTMLDivElement>;

export const PageHeader = ({ breadcrumbs, title, ...others }: Props) => {
  return (
    <div {...others}>
      <Space direction="vertical" size="small">
        <Typography.Title
          level={3}
          style={{ padding: 0, margin: 3, textTransform: 'capitalize' }}

        >
          <Button type="text" icon={<LeftCircleOutlined /> } style={{width: 30,height: 30}} />
          {title}
        </Typography.Title>
        <Breadcrumb items={breadcrumbs} className="page-header-breadcrumbs" />
      </Space>
      <Divider orientation="right" plain>
        <span style={{ textTransform: 'capitalize' }}>{title}</span>
      </Divider>
    </div>
  );
};
