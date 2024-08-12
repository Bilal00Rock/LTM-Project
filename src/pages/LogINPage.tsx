import { FunctionComponent } from "react";
import FrameComponent from "../components/FrameComponent";
import styles from "./Styles/LogINPage.module.css";

const LogINPage: FunctionComponent = () => {
  return (
    <div className={styles.loginPage}>
      <FrameComponent />
      <section className={styles.main}>
        <img
          className={styles.headerLogoWithoutBack2Icon}
          loading="lazy"
          alt=""
          src="/headerlogowithoutback-2@2x.png"
        />
      </section>
    </div>
  );
};

export default LogINPage;
