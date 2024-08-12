import { FunctionComponent, useCallback } from "react";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/SiderantFinance.module.css";

export type SiderantFinanceType = {
  className?: string;
  lOGO?: string;
};

const SiderantFinance: FunctionComponent<SiderantFinanceType> = ({
  className = "",
  lOGO,
}) => {
  const navigate = useNavigate();

  const onSignoutContainerClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  return (
    <div className={[styles.siderantFinance, className].join(" ")}>
      <div className={styles.headParent}>
        <div className={styles.head}>
          <img className={styles.logoIcon} loading="lazy" alt="" src={lOGO} />
        </div>
        <Menu
          wrapper4="/wrapper2@2x.png"
          // wrapper4="/wrapper-11@2x.png"
          // wrapper4="/wrapper-2@2x.png"
          // wrapper4="/wrapper-31@2x.png"
          // wrapper4="/wrapper-41@2x.png"
          title4="Overview"
          // title4="Patients"
          // title4="User Profile"
          // title4={`Help & Support`}
          // title4="Settings"
        />
      </div>
      <div className={styles.headParent}>
        <div className={styles.signout} onClick={onSignoutContainerClick}>
          <div className={styles.innerWrapper}>
            <div className={styles.titleWrapper}>
              <img
                className={styles.openPaneIcon}
                alt=""
                src="/open-pane@2x.png"
              />
              <div className={styles.signoutWrapper}>
                <div className={styles.signout1}>Sign Out</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.siderTrigger}>
          <div className={styles.innerWrapper1}>
            <img
              className={styles.iconWrapper}
              alt=""
              src="/iconwrapper@2x.png"
            />
          </div>
        </div>
      </div>
      <img
        className={styles.sidemenuFixedSwitcherIcon}
        alt=""
        src="/sidemenufixedswitcher.svg"
      />
    </div>
  );
};

export default SiderantFinance;
