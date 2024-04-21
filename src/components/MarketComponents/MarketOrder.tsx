import * as React from 'react';
import {
  //useDispatch,
  useSelector,
} from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';

import { styleBl1Form01 } from './../MarketStyle';

const MarketOrder = () => {
  //== Piece of Redux =======================================
  // let datestat = useSelector((state: any) => {
  //   const { statsaveReducer } = state;
  //   return statsaveReducer.datestat;
  // });
  let massroutepro = useSelector((state: any) => {
    const { massrouteproReducer } = state;
    return massrouteproReducer.massroutepro;
  });
  //console.log('massroutePro:', massroutePro);
  //const dispatch = useDispatch();
  return (
    <Grid container sx={styleBl1Form01(40)}>
      <Grid item xs={12}>
        <Box sx={{ color: '#7620A2', fontSize: 18, marginLeft: 2, height: '27px' }}>
          <b>Покупки</b>
        </Box>
      </Grid>
      {massroutepro.length === 0 ? (
        <Box sx={{ width: '100%', color: '#7620A2', textAlign: 'center' }}>
          <h1>Покупок пока нет</h1>
        </Box>
      ) : (
        <h1>Корзина уже не пуста</h1>
      )}
    </Grid>
  );
};

export default MarketOrder;
