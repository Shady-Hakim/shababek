import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import { Payment, Print, Cancel } from '@mui/icons-material';
import PrintableReceipt from './PrintableReceipt';
import { useUpdateOrderMutation } from '../order.actions';

const PaymentDialog = ({ open, onClose, order, refetch }) => {
  const receiptRef = useRef();
  const [updateOrder, { isSuccess, isError }] = useUpdateOrderMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const onAction = async (action) => {
    await updateOrder({ paymentType: 'Cash', status: action, orderId: order._id });
    refetch();
    setOpenDialog(true);
    setTimeout(() => {
      setOpenDialog(false);
    }, 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Shababeek</title></head><body style="text-align: center">');

    printWindow.document.write(receiptRef.current.innerHTML);

    printWindow.document.write('</body></html>');
    printWindow.document.close();

    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent ref={receiptRef}>
        <PrintableReceipt order={order} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onAction('Paid')} startIcon={<Payment />} variant='contained'>
          Pay
        </Button>
        <Button onClick={handlePrint} startIcon={<Print />} variant='contained'>
          Print
        </Button>
        <Button onClick={() => onAction('Cancelled')} startIcon={<Payment />} variant='contained'>
          Cancel
        </Button>
        <Button onClick={() => onAction('Refunded')} startIcon={<Payment />} variant='contained'>
          Refund
        </Button>
        <Button onClick={onClose} startIcon={<Cancel />} variant='outlined'>
          Close
        </Button>
      </DialogActions>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          {isError && <div style={{ color: 'red', marginTop: '8px' }}>Error updating order</div>}
          {isSuccess && <div style={{ color: 'green', marginTop: '8px' }}>Order updated successfully</div>}
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default PaymentDialog;
