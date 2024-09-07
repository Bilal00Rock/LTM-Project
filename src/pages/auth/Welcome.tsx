import { Button, Col, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import styles from "../Styles/Login.module.css";

export const WelcomePage = () => {
  return (
    <Flex
      vertical
      gap="large"
      align="center"
      justify="center"
      style={{ height: "80vh" }}
    >
      <img
        className={styles.logo}
        loading="lazy"
        alt="Logo"
        src={process.env.PUBLIC_URL + "/img/logo.png"}
        style={{ maxWidth: "100vw   ", height: "auto" }}
      />
      <Typography.Title className="m-0">Welcome to Pineu</Typography.Title>
      <Typography.Text style={{ fontSize: 18 }}>
        An Application of FUTURE!!
      </Typography.Text>
      <Flex gap={"middle"}>
        <Link to="/login-page">
          <Button type="primary" size="middle">
            Login Now!
          </Button>
        </Link>

        <Link to="https://pineu.ir">
          <Button type="primary" size="middle">
            Go to Pineu.ir
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
