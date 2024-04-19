import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { massdkCreate } from "./redux/actions";

import Grid from "@mui/material/Grid";

import axios from "axios";

import MarketMain from "./components/MarketMain";

import { PlanCoord } from "./interfacePlans.d";

//import { dataMap } from "./otladkaMaps";

export let dateMapGl: any;
export let dateRouteGl: any;
export let dateRouteProGl: any;
export let datePlan: any;

export interface Pointer {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}
export let massDk: Pointer[] = [];

export interface Router {
  region: number;
  sourceArea: number;
  sourceID: number;
  targetArea: number;
  targetID: number;
  lsource: number;
  ltarget: number;
  starts: string;
  stops: string;
  lenght: number;
  time: number;
}

export interface Directions {
  name: string; // номер направления
  satur: number; // Насыщение(т.е./ч.)
  intensTr: number; // Интенсивность(т.е./ч.)
  dispers: number; // Дисперсия пачки(%)
  peregon: number; // Длинна перегона(м)
  wtStop: number; // Вес остановки
  wtDelay: number; // Вес задержки
  offsetBeginGreen: number; // Смещ.начала зелёного(сек)
  offsetEndGreen: number; // Смещ.конца зелёного(сек)
  intensFl: number; // Интенсивность пост.потока(т.е./ч.)
  phases: Array<number>; // зелёные фазы для данного направления
  edited: boolean; //
  opponent: string; // Левый поворот конкурирует с направлением...
}

export interface Stater {
  ws: any;
  debug: boolean;
  oldIdxForm: number;
  needMakeSpisPK: boolean; // вызов списка ПК после корректровки ПК
  lockUp: boolean; // блокировка меню районов и меню режимов
  needMenuForm: boolean; // выводить меню форм ПК
  idxMenu: number; // активная строка списка ПК
  nomMenu: number; // номер активного плана ПК
  exampleImg1: any; // отладочное изображение перекрёстка
  exampleImg2: any; // отладочное изображение перекрёстка
  have: 0; // счётчик изменений в форме параметров перекрёстка
}

export let dateStat: Stater = {
  ws: null,
  debug: false,
  oldIdxForm: -1,
  needMakeSpisPK: true,
  lockUp: false,
  needMenuForm: false,
  idxMenu: 0,
  nomMenu: -1, // номер активного плана ПК
  exampleImg1: null,
  exampleImg2: null,
  have: 0,
};

export let massRoute: Router[] = [];
export let massPlan: PlanCoord[] = [];
export let massRoutePro: Router[] = [];
export let Coordinates: Array<Array<number>> = []; // массив координат

let flagOpen = false;
//let flagOpenWS = true;
//let WS: any = null;

const App = () => {
  //== Piece of Redux ======================================
  let massdk = useSelector((state: any) => {
    const { massdkReducer } = state;
    return massdkReducer.massdk;
  });

  const dispatch = useDispatch();
  //========================================================

  const [trigger, setTrigger] = React.useState(false);

  if (!flagOpen) {
    let DateCarts: any = null;
    axios.get("https://dummyjson.com/carts").then(({ data }) => {
      DateCarts = data;
      console.log("!!!DateCarts:", DateCarts);
      for (let i = 0; i < DateCarts.carts.length; i++) {
        let mass = DateCarts.carts[i];
        for (let j = 0; j < mass.products.length; j++) {
          let mask: any = {
            id: 0,
            title: "",
            price: 0,
            thumbnail: "",
          };
          mask.id = mass.products[j].id;
          mask.title = mass.products[j].title;
          mask.price = mass.products[j].price;
          mask.thumbnail = mass.products[j].thumbnail;
          massDk.push(mask);
        }
      }
      console.log("!!!massDk:", massDk);
      dispatch(massdkCreate(massdk));
      flagOpen = true;
      setTrigger(!trigger);
    });
  }

  return (
    <Grid container sx={{ height: "100vh", width: "100%", bgcolor: "#E9F5D8" }}>
      <Grid item xs>
        {flagOpen && <MarketMain />}
      </Grid>
    </Grid>
  );
};

export default App;
