import { Button, Col, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from "../Styles/Login.module.css";

export const WelcomePage = () => {
  return (
    <Flex
      vertical
      gap="large"
      align="center"
      justify="center"
      style={{ height: '80vh' }}
    >
     
        <img
          className={styles.logo}
          loading="lazy"
          alt="Logo"
          src="/headerlogowithoutback-2@2x.png"
          style={{ maxWidth: '100vw   ', height: 'auto' }}
        />
      <Typography.Title className="m-0">Welcome to LTM</Typography.Title>
      <Typography.Text style={{ fontSize: 18 }}>
        An Application of FUTURE!!
      </Typography.Text>
      <Link to='/login-page'>
        <Button type="primary" size="middle">
          Login Now!
        </Button>
      </Link>
    </Flex>
    
  );
};
