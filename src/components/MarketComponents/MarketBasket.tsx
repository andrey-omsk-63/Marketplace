import * as React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import Button from '@mui/material/Button';

import { styleBl1Form01 } from "./../MarketStyle";

const MarketBasket = () => {
  return (
    <Grid container sx={styleBl1Form01(40)}>
      <Grid item xs={12}>
        <Box sx={{ fontSize: 18, marginLeft: 2 }}>
          <b>Корзина</b>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MarketBasket;
