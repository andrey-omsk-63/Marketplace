import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { massrouteCreate } from "./../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import MarketBasketView from "./MarketBasketView";

import { styleBl1Form01, styleBl1Form02 } from "./../MarketStyle";
import { styleBl1Form04, styleFormEnd } from "./../MarketStyle";
import { styleBl1Form03 } from "./../MarketStyle";

const shift = 95;
let IDX = -1;
let ht = 0;
let IdxColor = -1;

const MarketBasket = (props: {
  trigger: Function; // функция для ререндера в родительском компоненте
}) => {
  //== Piece of Redux =======================================
  let massroute = useSelector((state: any) => {
    const { massrouteReducer } = state;
    return massrouteReducer.massroute;
  });
  const dispatch = useDispatch();
  //===========================================================
  const [openImg, setOpenImg] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);

  let cH = 0;
  let kolStr = Math.floor(massroute.length / 5);
  if (massroute.length / 5 > kolStr) kolStr++;

  const stl103 = styleBl1Form03;

  const ClPnt = (str: number, pnkt: number) => {
    IDX = str * 5 + pnkt;
    setOpenImg(true);
  };

  const СhangeColor = (str: number, pnkt: number) => {
    if (str < 0) {
      IdxColor = -1;
    } else {
      IdxColor = str * 5 + pnkt;
    }
    setTrigger(!trigger);
  };

  const handleDel = (str: number, pnkt: number) => {
    let idx = str * 5 + pnkt;
    let massRab = [];
    for (let i = 0; i < massroute.length; i++) {
      if (i !== idx) massRab.push({ ...massroute[i] });
    }
    massroute = [];
    massroute = massRab;
    dispatch(massrouteCreate(massroute));
  };

  const PunktSpis = (i: number, j: number) => {
    cH++;
    let color = cH - 1 === IdxColor ? 1 : 0;
    return (
      <>
        {cH <= massroute.length && (
          <Box sx={styleBl1Form04(ht, color)}>
            <Grid container>
              <Grid item xs={11} onClick={() => ClPnt(i, j)}>
                <Box sx={{ height: ht - 45 }}>
                  <img
                    src={massroute[cH - 1].thumbnail}
                    height={ht - 55}
                    width={"69%"}
                    alt="Pict"
                  />
                </Box>
              </Grid>
              <Grid item xs={1} sx={{ border: 0 }}>
                <Box sx={{ textAlign: "right" }}>
                  <Button sx={styleFormEnd} onClick={() => handleDel(i, j)}>
                    🗑️
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ marginTop: -0.75 }} onClick={() => ClPnt(i, j)}>
              <Box>
                #<b>{massroute[cH - 1].id}</b> Цена:{" "}
                <b>{massroute[cH - 1].price}</b>Coin
              </Box>
              <Box>
                <b>{massroute[cH - 1].title}</b>
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
              <Grid
                item
                xs={2.4}
                sx={stl103(ht)}
                onMouseEnter={() => СhangeColor(i, 0)}
                onMouseLeave={() => СhangeColor(-1, 0)}
              >
                {PunktSpis(i, 0)}
              </Grid>
              <Grid item xs={2.4} sx={stl103(ht)}
               onMouseEnter={() => СhangeColor(i, 1)}
               onMouseLeave={() => СhangeColor(-1, 0)}
              >
                {PunktSpis(i, 1)}
              </Grid>
              <Grid item xs={2.4} sx={stl103(ht)}
               onMouseEnter={() => СhangeColor(i, 2)}
               onMouseLeave={() => СhangeColor(-1, 0)}
              >
                {PunktSpis(i, 2)}
              </Grid>
              <Grid item xs={2.4} sx={stl103(ht)}
               onMouseEnter={() => СhangeColor(i, 3)}
               onMouseLeave={() => СhangeColor(-1, 0)}
              >
                {PunktSpis(i, 3)}
              </Grid>
              <Grid item xs={2.4} sx={stl103(ht)}
               onMouseEnter={() => СhangeColor(i, 4)}
               onMouseLeave={() => СhangeColor(-1, 0)}
              >
                {PunktSpis(i, 4)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
    return resStr;
  };

  return (
    <Grid container sx={styleBl1Form01(40)}>
      <Grid item xs={12}>
        <Box
          sx={{ color: "#7620A2", fontSize: 18, marginLeft: 2, height: "27px" }}
        >
          <b>Корзина</b>
        </Box>
      </Grid>
      {massroute.length === 0 ? (
        <Box sx={{ width: "100%", color: "#7620A2", textAlign: "center" }}>
          <h1>Корзина пока пуста</h1>
        </Box>
      ) : (
        <>
          <Box sx={{ marginTop: -3, width: "100%" }}>
            <Box sx={styleBl1Form02(shift)}>{StrokaSpis()}</Box>
          </Box>
          {openImg && (
            <MarketBasketView
              close={setOpenImg}
              idx={IDX}
              trigger={props.trigger}
            />
          )}
        </>
      )}
    </Grid>
  );
};

export default MarketBasket;
