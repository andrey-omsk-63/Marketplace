import * as React from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BsCart3, BsFillLuggageFill } from "react-icons/bs";
import { BsListColumnsReverse } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";

import MarketSpis from "./MarketComponents/MarketSpis";
import MarketBasket from "./MarketComponents/MarketBasket";
import MarketOrder from "./MarketComponents/MarketOrder";
import MarketСonversion from "./MarketComponents/MarketСonversion";

import { styleMain01, styleMain02 } from "./MarketStyle";

export let ILLUM = 1; // номер активной кнопки меню

const MarketMain = (props: {}) => {
  //== Piece of Redux =======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  let massroute = useSelector((state: any) => {
    const { massrouteReducer } = state;
    return massrouteReducer.massroute;
  });
  let massroutepro = useSelector((state: any) => {
    const { massrouteproReducer } = state;
    return massrouteproReducer.massroutepro;
  });
  //console.log('datestat:', datestat);
  //===========================================================
  const [dispBlock1, setDispBlock1] = React.useState(true);
  const [dispBlock2, setDispBlock2] = React.useState(false);
  const [dispBlock3, setDispBlock3] = React.useState(false);
  const [dispBlock4, setDispBlock4] = React.useState(false);

  const [trigger, setTrigger] = React.useState(false);

  //=== инициализация ======================================

  //========================================================
  const RandomNumber = (min: number, max: number) => {
    let rand = Math.random() * (max - min) + min;
    return Math.floor(rand);
  };

  const Turn01 = () => {
    setDispBlock2(false);
    setDispBlock3(false);
    setDispBlock4(false);
  };

  const Turn02 = () => {
    setDispBlock1(false);
    setDispBlock3(false);
    setDispBlock4(false);
  };

  const Turn03 = () => {
    setDispBlock1(false);
    setDispBlock2(false);
    setDispBlock4(false);
  };

  const Turn04 = () => {
    setDispBlock1(false);
    setDispBlock2(false);
    setDispBlock3(false);
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

  const ClickKnop4 = () => {
    ILLUM = 4;
    Turn04();
    setDispBlock4(true);
  };
  //=== Компоненты =========================================
  const actionKnopSpis = () => {
    return (
      <Grid item xs={1.5}>
        <Button sx={styleMain02(1.5, ILLUM, 1)} onClick={() => ClickKnop1()}>
          {/* 📝Каталог */}
          <BsListColumnsReverse /> &nbsp; Каталог
        </Button>
      </Grid>
    );
  };

  const actionKnopOrder = () => {
    return (
      <Grid item xs={1.5}>
        <Button sx={styleMain02(1.5, ILLUM, 3)} onClick={() => ClickKnop3()}>
          {/* 📦Заказы */}
          <BsFillLuggageFill /> &nbsp; Заказы
          {massroutepro.length > 0 && (
            <Box>
              {" ("}
              {massroutepro.length}
              {")"}
            </Box>
          )}
        </Button>
      </Grid>
    );
  };

  const actionKnopBasket = () => {
    return (
      <Grid item xs={1.5}>
        <Button sx={styleMain02(1.5, ILLUM, 2)} onClick={() => ClickKnop2()}>
          {/* 🛒Корзина{" "} */}
          <BsCart3 /> &nbsp; Корзина
          {massroute.length > 0 && (
            <Box>
              {" ("}
              {massroute.length}
              {")"}
            </Box>
          )}
        </Button>
      </Grid>
    );
  };

  const BalansField = () => {
    let soob1 =
      "Ваш баланс: " + datestat.balansCoin + "Coin и " + datestat.balans$ + "$";
    return (
      <Grid item xs={2.0}>
        <Button sx={styleMain02(2.0, ILLUM, 4)} onClick={() => ClickKnop4()}>
          <BiTransfer /> &nbsp; {soob1}
        </Button>
      </Grid>
    );
  };

  const SetTrigger = () => {
    setTrigger(!trigger);
  };

  return (
    <Grid container sx={styleMain01}>
      <Grid item xs={12} sx={{ height: "30px" }}>
        <Grid container sx={{ height: "30px", fontSize: 12.9 }}>
          {/* Каталог */}
          {actionKnopSpis()}
          <Grid item xs={5.5}></Grid>
          {/* Заказы */}
          {actionKnopOrder()}
          {/* Корзина */}
          {actionKnopBasket()}
          {/* Баланс */}
          {BalansField()}
        </Grid>
      </Grid>
      {dispBlock1 && <MarketSpis trigger={SetTrigger} />}
      {dispBlock2 && <MarketBasket trigger={SetTrigger} />}
      {dispBlock3 && <MarketOrder />}
      {dispBlock4 && (
        <MarketСonversion close={setDispBlock4} idx={RandomNumber(1, 10000)} />
      )}
    </Grid>
  );
};

export default MarketMain;
