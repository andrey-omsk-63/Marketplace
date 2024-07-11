import * as React from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import Button from '@mui/material/Button';

import MarketOrderView from "./MarketOrderView";

import { styleBl1Form01, styleBl1Form02 } from "./../MarketStyle";
import { styleBl1Form03, styleBl1Form04 } from "./../MarketStyle";

const shift = 95;
let IDX = -1;
let ht = 0;
let IdxColor = -1;

const MarketOrder = () => {
  //== Piece of Redux =======================================
  let massroutepro = useSelector((state: any) => {
    const { massrouteproReducer } = state;
    return massrouteproReducer.massroutepro;
  });
  //===========================================================
  const [openImg, setOpenImg] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);

  let cH = 0;
  let kolStr = Math.floor(massroutepro.length / 5);
  if (massroutepro.length / 5 > kolStr) kolStr++;

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

  const PunktSpis = () => {
    cH++;
    let color = cH - 1 === IdxColor ? 1 : 0;
    return (
      <>
        {cH <= massroutepro.length && (
          <Box sx={styleBl1Form04(ht, color)}>
            <Box sx={{ height: ht - 45 }}>
              <img
                src={massroutepro[cH - 1].thumbnail}
                height={ht - 55}
                width={"58%"}
                alt="Pict"
              />
            </Box>
            <Box sx={{ marginTop: -0.75 }}>
              <Box>
                #<b>{massroutepro[cH - 1].id}</b> Цена:{" "}
                <b>{massroutepro[cH - 1].price}</b>Coin
              </Box>
              <Box>
                <b>{massroutepro[cH - 1].title}</b>
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

    const OutputCard = (i: number, column: number) => {
      return (
        <Grid
          item
          xs={2.4}
          sx={stl103(ht)}
          onMouseEnter={() => СhangeColor(i, column)}
          onMouseLeave={() => СhangeColor(-1, column)}
          onClick={() => ClPnt(i, column)}
        >
          {PunktSpis()}
        </Grid>
      );
    };

    for (let i = 0; i < kolStr; i++) {
      resStr.push(
        <Grid key={i} container>
          <Grid item xs={12} sx={{ height: ht }}>
            <Grid key={i * i} container>
            {OutputCard(i, 0)}
              {OutputCard(i, 1)}
              {OutputCard(i, 2)}
              {OutputCard(i, 3)}
              {OutputCard(i, 4)}
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
          <b>Покупки</b>
        </Box>
      </Grid>
      {massroutepro.length === 0 ? (
        <Box sx={{ width: "100%", color: "#7620A2", textAlign: "center" }}>
          <h1>Покупок пока нет</h1>
        </Box>
      ) : (
        <>
          <Box sx={{ marginTop: -3, width: "100%" }}>
            <Box sx={styleBl1Form02(shift)}>{StrokaSpis()}</Box>
          </Box>
          {openImg && <MarketOrderView close={setOpenImg} idx={IDX} />}
        </>
      )}
    </Grid>
  );
};

export default MarketOrder;
