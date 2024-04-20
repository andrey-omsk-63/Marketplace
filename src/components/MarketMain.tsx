import * as React from 'react';
import {
  //useDispatch,
  useSelector,
} from 'react-redux';
//import { statsaveCreate } from "../redux/actions";
//import imageCompression from 'browser-image-compression';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import MarketSpis from './MarketComponents/MarketSpis';
import MarketBasket from './MarketComponents/MarketBasket';
import MarketOrder from './MarketComponents/MarketOrder';

import { styleMain01, styleMain02 } from './MarketStyle';

export let ILLUM = 1; // номер активной кнопки меню
export let FORM3 = '0'; // какую форму Справочная информация выдать через диспетчер
export let FORM5 = '0'; // какую форму Ввода данных выдать через диспетчер
export let widthGl = window.innerWidth - 3; // ширина окна браузера

const MarketMain = (props: {}) => {
  //== Piece of Redux =======================================
  // let datestat = useSelector((state: any) => {
  //   const { statsaveReducer } = state;
  //   return statsaveReducer.datestat;
  // });
  // let massdk = useSelector((state: any) => {
  //   const { massdkReducer } = state;
  //   return massdkReducer.massdk;
  // });
  let massroute = useSelector((state: any) => {
    const { massrouteReducer } = state;
    return massrouteReducer.massroute;
  });
  //console.log("MASSDK:", massdk);
  ////const dispatch = useDispatch();
  //===========================================================
  const [dispBlock1, setDispBlock1] = React.useState(true);
  const [dispBlock2, setDispBlock2] = React.useState(false);
  const [dispBlock3, setDispBlock3] = React.useState(false);

  const [trigger, setTrigger] = React.useState(false);

  //=== инициализация ======================================

  //========================================================
  const Turn01 = () => {
    setDispBlock2(false);
    setDispBlock3(false);
  };

  const Turn02 = () => {
    setDispBlock1(false);
    setDispBlock3(false);
  };

  const Turn03 = () => {
    setDispBlock1(false);
    setDispBlock2(false);
  };
  //=== Функции - обработчики ==============================
  const ClickKnop1 = () => {
    ILLUM = 1;
    Turn01();
    setDispBlock1(true);
  };

  const ClickKnop2 = () => {
    ILLUM = 2;
    Turn02();
    setDispBlock2(true);
  };
  const ClickKnop3 = () => {
    ILLUM = 3;
    Turn03();
    setDispBlock3(true);
  };
  //=== Компоненты =========================================
  const actionKnopSpis = () => {
    return (
      <Grid item xs={1.5}>
        <Button sx={styleMain02(1.5, ILLUM, 1)} onClick={() => ClickKnop1()}>
          📝Каталог
        </Button>
      </Grid>
    );
  };
  //🧾

  const actionKnopOrder = () => {
    return (
      <Grid item xs={1.5}>
        <Button sx={styleMain02(1.5, ILLUM, 3)} onClick={() => ClickKnop3()}>
          📦Заказы
        </Button>
      </Grid>
    );
  };

  const actionKnopBasket = () => {
    return (
      <Grid item xs={1.5}>
        <Button sx={styleMain02(1.5, ILLUM, 2)} onClick={() => ClickKnop2()}>
          🛒Корзина{' '}
          {massroute.length > 0 && (
            <Box>
              {' ('}
              {massroute.length}
              {')'}
            </Box>
          )}
        </Button>
      </Grid>
    );
  };

  const SetTrigger = () => {
    setTrigger(!trigger);
  };

  return (
    <Grid container sx={styleMain01}>
      <Grid item xs={12} sx={{ height: '30px' }}>
        <Grid container sx={{ height: '30px', fontSize: 12.9 }}>
          {/* Каталог */}
          {actionKnopSpis()}
          <Grid item xs={7.5}></Grid>
          {/* Заказы */}
          {actionKnopOrder()}
          {/* Корзина */}
          {actionKnopBasket()}
        </Grid>
      </Grid>
      {dispBlock1 && <MarketSpis trigger={SetTrigger} />}
      {dispBlock2 && <MarketBasket trigger={SetTrigger} />}
      {dispBlock3 && <MarketOrder />}
    </Grid>
  );
};

export default MarketMain;
