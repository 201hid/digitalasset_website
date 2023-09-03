import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
} from '@mui/material';
import transactionData from '../components/transactiondata';

const statusColors = {
  Completed: 'success',
  Processing: 'info',
  Shipped: 'warning',
};

const TransectionPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.checked);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredTransactions = transactionData.filter((transaction) => {
    if (!startDate || !endDate) {
      return true; // If no dates are selected, show all transactions
    }

    const transactionDate = new Date(transaction.purchaseDate);
    return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
  }).filter((transaction) => !statusFilter || transaction.orderStatus === 'Completed');

  const sortedTransactions = sortBy
    ? [...filteredTransactions].sort((a, b) =>
        sortBy === 'lowToHigh' ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice
      )
    : filteredTransactions;

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Filter
              </Typography>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                fullWidth
                sx={{ marginTop: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControlLabel
                control={<Checkbox checked={statusFilter} onChange={handleStatusChange} />}
                label="Show Completed Transactions"
                sx={{ marginTop: 2 }}
              />
              <FormControl fullWidth sx={{ marginTop: 2 }}>
                <Select value={sortBy} onChange={handleSortChange} displayEmpty>
                  <MenuItem value="">Sort By</MenuItem>
                  <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
                  <MenuItem value="highToLow">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <List>
            {sortedTransactions.map((transaction) => (
              <ListItem key={transaction.id}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom>
                          Hash Value
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {transaction.hashNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom>
                          Total Price
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${transaction.totalPrice.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom>
                          Purchase Date
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {transaction.purchaseDate.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom>
                          Status
                        </Typography>
                        <Chip
                          label={transaction.orderStatus}
                          color={statusColors[transaction.orderStatus]}
                        />
                      </Grid>
                    </Grid>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                      Items
                    </Typography>
                    <List>
                      {transaction.items.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={item.itemName}
                            secondary={`Quantity: ${item.quantity}`}
                          />
                          <ListItemSecondaryAction>
                            <Typography variant="body2">
                              ${item.price.toFixed(2)}
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TransectionPage;
