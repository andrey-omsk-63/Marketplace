import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';

import { styleBl1Form01 } from './../MarketStyle';

const MarketBasket = () => {
  //== Piece of Redux =======================================
  // let datestat = useSelector((state: any) => {
  //   const { statsaveReducer } = state;
  //   return statsaveReducer.datestat;
  // });
  let massroute = useSelector((state: any) => {
    const { massrouteReducer } = state;
    return massrouteReducer.massroute;
  });
  //console.log('MASSDK:', massdk);
  const dispatch = useDispatch();
  //===========================================================
  return (
    <Grid container sx={styleBl1Form01(40)}>
      <Grid item xs={12}>
        <Box sx={{ color: '#A73AFD', fontSize: 18, marginLeft: 2, height: '27px' }}>
          <b>Корзина</b>
        </Box>
      </Grid>
      {massroute.length === 0 ? (
        <Box sx={{ width: '100%', color: '#A73AFD', textAlign: 'center' }}>
          <h1>Корзина пока пуста</h1>
        </Box>
      ) : (
        <h1>Корзина уже не пуста</h1>
      )}
    </Grid>
  );
};

export default MarketBasket;
