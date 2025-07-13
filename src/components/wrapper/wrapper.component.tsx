import styles from "./wrapper.module.scss";

const WrapperComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className={styles.main}>{children}</main>;
};

export default WrapperComponent;
