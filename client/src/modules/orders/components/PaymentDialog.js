import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from '@mui/material';

const PaymentDialog = ({ open, onClose, onSelectPayment, onPay, onPrint, onPayAndPrint, orderId }) => {
  const [paymentChoice, setPaymentChoice] = React.useState('');

  const handlePaymentChange = (event) => {
    setPaymentChoice(event.target.value);
    onSelectPayment(event.target.value);
  };

  const handlePayment = () => {
    console.log(`Processing payment for order ${orderId}`);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Payment Options</DialogTitle>
      <DialogContent>
        <Typography>Select payment method:</Typography>
        <RadioGroup
          aria-label='payment-method'
          name='payment-method'
          value={paymentChoice}
          onChange={handlePaymentChange}>
          <FormControlLabel value='Cash' control={<Radio />} label='Cash' />
          <FormControlLabel value='Visa' control={<Radio />} label='Visa' />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handlePayment} disabled={!paymentChoice}>
          Pay
        </Button>
        <Button onClick={onPrint} disabled={!paymentChoice}>
          Print
        </Button>
        <Button onClick={onPayAndPrint} disabled={!paymentChoice}>
          Pay & Print
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;
