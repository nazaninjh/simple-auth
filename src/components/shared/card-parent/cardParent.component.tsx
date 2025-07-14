import { CSSProperties } from "react";
import styles from "./cardParent.module.scss";
const CardParentComponent = ({
  children,
  customStyle,
}: {
  children: React.ReactNode;
  customStyle?: CSSProperties;
}) => {
  return (
    <div style={customStyle ? customStyle : {}} className={styles.wrapper}>
      {children}
    </div>
  );
};

export default CardParentComponent;
