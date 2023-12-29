import React from 'react';
import { Unstable_Grid2 as Grid, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';

import tableImg from '../../common/assets/images/table.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function TableItem({ table }) {
  const navigation = useNavigate();
  return (
    <Grid xs={2} sm={4} md={4}>
      <Item>
        <Box onClick={() => navigation(`/tables/${table.name}`)}>
          <Typography>{table.name}</Typography>
          <img src={tableImg} alt={'table'} loading='lazy' />
        </Box>
      </Item>
    </Grid>
  );
}

export default TableItem;
