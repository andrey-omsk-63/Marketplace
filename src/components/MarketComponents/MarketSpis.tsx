import * as React from 'react';
import {
  //useDispatch,
  useSelector,
} from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';

import MarketSpisView from './MarketSpisView';

import { styleBl1Form01, styleBl1Form02, styleBl1Form03 } from './../MarketStyle';
import { styleBl1Form04 } from './../MarketStyle';

const shift = 95;
let IDX = -1;
let cH = 0;
let ht = 0;

const MarketSpis = (props: {
  trigger: Function; // функция для ререндера в родительском компоненте
}) => {
  //== Piece of Redux =======================================
  let massdk = useSelector((state: any) => {
    const { massdkReducer } = state;
    return massdkReducer.massdk;
  });
  //const dispatch = useDispatch();
  //===========================================================
  const [openImg, setOpenImg] = React.useState(false);

  let kolStr = Math.floor(massdk.length / 5);
  if (massdk.length / 5 > kolStr) kolStr++;

  const stl103 = styleBl1Form03;

  const ClPnt = (str: number, pnkt: number) => {
    IDX = str * 5 + pnkt;
    //console.log('Click:', IDX, massdk[IDX].id);
    setOpenImg(true);
  };

  const PunktSpis = () => {
    cH++;
    return (
      <>
        {cH <= massdk.length && (
          <Box sx={styleBl1Form04(ht)}>
            <Box sx={{ height: ht - 45 }}>
              <img src={massdk[cH - 1].thumbnail} height={ht - 55} width={'58%'} alt="Pict" />
            </Box>
            <Box sx={{ marginTop: -0.75 }}>
              <Box>
                #<b>{massdk[cH - 1].id}</b> Цена: <b>{massdk[cH - 1].price}</b>Coin
              </Box>
              <Box>
                <b>{massdk[cH - 1].title}</b>
              </Box>
            </Box>
          </Box>
        )}
      </>
    );
  };

  const StrokaSpis = () => {
    let resStr = [];
    ht = (window.innerHeight - shift) / 4;
    cH = 0;
    for (let i = 0; i < kolStr; i++) {
      resStr.push(
        <Grid key={i} container>
          <Grid item xs={12} sx={{ height: ht }}>
            <Grid key={i * i} container>
              <Grid item xs={2.4} sx={stl103(ht)} onClick={() => ClPnt(i, 0)}>
                {PunktSpis()}
              </Grid>
              <Grid item xs={2.4} sx={stl103(ht)} onClick={() => ClPnt(i, 1)}>
                {PunktSpis()}
              </Grid>
              <Grid item xs={2.4} sx={stl103(ht)} onClick={() => ClPnt(i, 2)}>
                {PunktSpis()}
              </Grid>
              <Grid item xs={2.4} sx={stl103(ht)} onClick={() => ClPnt(i, 3)}>
                {PunktSpis()}
              </Grid>
              <Grid item xs={2.4} sx={stl103(ht)} onClick={() => ClPnt(i, 4)}>
                {PunktSpis()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  return (
    <Grid container sx={styleBl1Form01(40)}>
      <Grid item xs={12}>
        <Box sx={{ color: '#7620A2', fontSize: 18, marginLeft: 2, height: '27px' }}>
          <b>Каталог</b>
        </Box>
        <Box sx={styleBl1Form02(shift)}>{StrokaSpis()}</Box>
        {openImg && <MarketSpisView close={setOpenImg} idx={IDX} trigger={props.trigger} />}
      </Grid>
    </Grid>
  );
};

export default MarketSpis;
