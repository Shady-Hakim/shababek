import React, { useEffect, useState } from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import tableImg from '../../common/assets/images/table.png';
import { useRemoveTableMutation } from '../tables.actions';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative',
}));

const RemoveButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  width: '100%',
}));

function TableItem({ table, refetchTables }) {
  const [removeTable, { isSuccess: isRemoveSuccess }] = useRemoveTableMutation();
  const navigation = useNavigate();
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const handleRemove = (event) => {
    event.stopPropagation();
    setConfirmationOpen(true);
  };

  const handleConfirmRemove = () => {
    removeTable(table._id);
    setConfirmationOpen(false);
  };

  const handleCancelRemove = () => {
    setConfirmationOpen(false);
  };

  useEffect(() => {
    if (isRemoveSuccess) refetchTables();
  }, [isRemoveSuccess, refetchTables]);

  return (
    <Grid xs={2} sm={4} md={4}>
      <Item>
        <RemoveButton color='error' onClick={handleRemove}>
          X
        </RemoveButton>
        <Box onClick={() => navigation(`/tables/${table._id}`)}>
          <img src={tableImg} alt={'table'} loading='lazy' />
          <ContentWrapper>
            <Typography>{table.name}</Typography>
          </ContentWrapper>
        </Box>
      </Item>

      <Dialog open={isConfirmationOpen} onClose={handleCancelRemove}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>Are you sure you want to remove this table?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemove} color='primary'>
            No
          </Button>
          <Button onClick={handleConfirmRemove} color='error'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default TableItem;
