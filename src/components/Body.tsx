import { FunctionComponent } from "react";
import LayoutBlocksvertical from "./LayoutBlocksvertical";
import TextText from "./TextText";
import styles from "./Styles/Body.module.css";

export type BodyType = {
  className?: string;
};

const Body: FunctionComponent<BodyType> = ({ className = "" }) => {
  return (
    <div className={[styles.body, className].join(" ")}>
      <LayoutBlocksvertical />
      <div className={styles.layoutblocksvertical2}>
        <TextText text="Sales Ranking" />
        <div className={styles.layoutblockshorizontal3}>
          <div className={styles.layoutblocksvertical7}>
            <div className={styles.badgecount}>
              <div className={styles.badge}>
                <div className={styles.number}>1</div>
              </div>
            </div>
            <div className={styles.badgecount}>
              <div className={styles.badge}>
                <div className={styles.number}>2</div>
              </div>
            </div>
            <div className={styles.badgecount}>
              <div className={styles.badge}>
                <div className={styles.number}>3</div>
              </div>
            </div>
            <div className={styles.badgecount}>
              <div className={styles.badge}>
                <div className={styles.number}>4</div>
              </div>
            </div>
            <div className={styles.badgecount}>
              <div className={styles.badge}>
                <div className={styles.number}>5</div>
              </div>
            </div>
            <div className={styles.badgecount}>
              <div className={styles.badge}>
                <div className={styles.number}>6</div>
              </div>
            </div>
            <div className={styles.badgecount}>
              <div className={styles.badge}>
                <div className={styles.number}>7</div>
              </div>
            </div>
          </div>
          <div className={styles.layoutblocksvertical71}>
            <div className={styles.texttext}>
              <div className={styles.text}>Gongzhuan No.1 shop</div>
            </div>
            <div className={styles.texttext}>
              <div className={styles.text}>Gongzhuan No.2 shop</div>
            </div>
            <div className={styles.texttext}>
              <div className={styles.text}>Gongzhuan No.3 shop</div>
            </div>
            <div className={styles.texttext}>
              <div className={styles.text}>Gongzhuan No.4 shop</div>
            </div>
            <div className={styles.texttext}>
              <div className={styles.text}>Gongzhuan No.5 shop</div>
            </div>
            <div className={styles.texttext}>
              <div className={styles.text}>Gongzhuan No.6 shop</div>
            </div>
            <div className={styles.texttext}>
              <div className={styles.text}>Gongzhuan No.7 shop</div>
            </div>
          </div>
          <div className={styles.layoutblocksvertical71}>
            <div className={styles.texttext7}>
              <div className={styles.text}>323,234</div>
            </div>
            <div className={styles.texttext7}>
              <div className={styles.text}>323,234</div>
            </div>
            <div className={styles.texttext7}>
              <div className={styles.text}>323,234</div>
            </div>
            <div className={styles.texttext7}>
              <div className={styles.text}>323,234</div>
            </div>
            <div className={styles.texttext7}>
              <div className={styles.text}>323,234</div>
            </div>
            <div className={styles.texttext7}>
              <div className={styles.text}>323,234</div>
            </div>
            <div className={styles.texttext7}>
              <div className={styles.text}>323,234</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
