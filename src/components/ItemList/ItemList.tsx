import React from "react";
import styles from "../ItemList/ItemList.module.css";

function ItemList({ invoices }: { invoices: string[] }) {
  return (
    <div>
      {invoices.length === 0 ? (
        <div className={styles.empty_state}>
          <div className="empty-picture">
            <img src="/empty.svg" alt="empty" />
          </div>
          <div className={styles.empty_text1}>There is nothing here</div>
          <div className={styles.empty_text2}>
            Create an invoice by clicking the <b>New Invoice</b> button and get
            started
          </div>
        </div>
      ) : (
        invoices.map((invoice) => <p key={invoice}>{invoice}</p>)
      )}
    </div>
  );
}

export default ItemList;
