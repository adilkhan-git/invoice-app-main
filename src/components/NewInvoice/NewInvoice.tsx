import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";
import { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
} from "@mui/material";

interface NewInvoiceProps {
  setInvoices: React.Dispatch<React.SetStateAction<string[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ItemFieldName = "name" | "quantity" | "price";

function NewInvoice(props: NewInvoiceProps) {
  const [items, setItems] = useState([{ name: "", quantity: "", price: "" }]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [invoices, setInvoices] = useState<string[]>([]);
  const [newInvoices, setNewInvoices] = useState<string>("");

  const [streetAddressFrom, setStreetAddressFrom] = useState("");
  const [cityFrom, setCityFrom] = useState("");
  const [postCodeFrom, setPostCodeFrom] = useState("");
  const [countryFrom, setCountryFrom] = useState("");

  const handleSave = () => {
    setInvoices([...invoices, newInvoices]);
    setNewInvoices("");
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: "", price: "" }]);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleDiscard = () => {
    setStreetAddressFrom("");
    setCityFrom("");
    setPostCodeFrom("");
    setCountryFrom("");
  };

  const handleItemChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: ItemFieldName
  ) => {
    const newItems = [...items];
    newItems[index][field] = event.target.value;
    setItems(newItems);
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={props.isDrawerOpen}
        onClose={() => props.setIsDrawerOpen(false)}
      >
        <Box p={2} width="616px" role="presentation">
          <Typography variant="h6" component="div">
            New Invoice
          </Typography>
          <Box mt={2}>
            <Typography variant="h6" component="div">
              Bill from
            </Typography>
            <TextField
              fullWidth
              label="Street address"
              value={streetAddressFrom}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStreetAddressFrom(e.target.value)
              }
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} sx={{ marginTop: 2 }}>
                <TextField
                  fullWidth
                  label="City"
                  value={cityFrom}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCityFrom(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ marginTop: 2 }}>
                <TextField
                  fullWidth
                  label="Post Code"
                  value={postCodeFrom}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPostCodeFrom(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ marginTop: 2 }}>
                <TextField fullWidth label="Country" />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Typography variant="h6" component="div">
              Bill To
            </Typography>
            <TextField fullWidth label="Client's Name" sx={{ marginTop: 2 }} />
            <TextField fullWidth label="Client's email" sx={{ marginTop: 2 }} />
            <TextField fullWidth label="Street address" sx={{ marginTop: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} sx={{ marginTop: 2 }}>
                <TextField fullWidth label="City" />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ marginTop: 2 }}>
                <TextField fullWidth label="Post Code" />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ marginTop: 2 }}>
                <TextField fullWidth label="Country" />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} sx={{ marginTop: 2 }}>
                <TextField fullWidth label="Invoice Date" />
              </Grid>

              <Grid item xs={12} sm={4} sx={{ marginTop: 2 }}>
                <TextField fullWidth label="Payment Terms" />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Project Description"
              sx={{ marginTop: 2 }}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="h6" component="div">
              Item List
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item name</TableCell>
                  <TableCell>Qty.</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={item.name}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          handleItemChange(
                            event as React.ChangeEvent<HTMLInputElement>,
                            index,
                            "name"
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        type="number"
                        value={item.quantity}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          handleItemChange(
                            event as React.ChangeEvent<HTMLInputElement>,
                            index,
                            "quantity"
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        type="number"
                        value={item.price}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          handleItemChange(
                            event as React.ChangeEvent<HTMLInputElement>,
                            index,
                            "price"
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {Number(item.quantity) * Number(item.price)}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteItem(index)}>
                        <DeleteOutline />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={handleAddItem}
              >
                New Item
              </Button>
            </Box>
          </Box>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={handleDiscard}>
              Discard
            </Button>
            <Box mx={1} />
            <Button variant="contained" color="primary">
              Save as Draft
            </Button>
            <Box mx={1} />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save & Send
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default NewInvoice;
