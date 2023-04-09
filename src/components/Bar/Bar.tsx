import styles from "../Bar/Bar.module.css";

function Bar() {
  return (
    <div className={styles.rectangle}>
      <div className={styles.logo}>
        <div className={styles.logo1}>
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className={styles.auth}></div>
      </div>
    </div>
  );
}

export default Bar;
