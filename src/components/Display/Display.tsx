"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import NewInvoice from "../NewInvoice/NewInvoice";
import ItemList from "../ItemList/ItemList";

function Display() {
  const [invoices, setInvoices] = useState<string[]>([]);

  return (
    <Box>
      {/* <NewInvoice setInvoices={setInvoices} /> */}
      <ItemList invoices={invoices} />
    </Box>
  );
}

export default Display;
