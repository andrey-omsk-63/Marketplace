import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { massdkCreate, statsaveCreate } from "./redux/actions";

import Grid from "@mui/material/Grid";

import axios from "axios";

import MarketMain from "./components/MarketMain";

import { DOLLARS, COINS } from "./MarketConst"; // Баланс долларов, коинов

export interface Pointer {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface Router {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface Stater {
  balans$: number;
  balansCoin: number;
}

export let dateStat: Stater = {
  balans$: 0.0, // Баланс долларов
  balansCoin: 0.0, // Баланс коинов
};
export let massDk: Pointer[] = []; // каталог
export let massRoute: Router[] = []; // корзина
export let massRoutePro: Router[] = []; // сделанные покупки

let flagOpen = false;

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
      for (let i = 0; i < DateCarts.carts.length; i++) {
        let mass = DateCarts.carts[i];
        for (let j = 0; j < mass.products.length; j++) {
          let mask: any = {
            id: 0,
            title: "",
            price: 0,
            thumbnail: "",
          };
          let have = 0;
          for (let ii = 0; ii < massDk.length; ii++)
            if (massDk[ii].id === mass.products[j].id) have++; // дубликат
          if (!have) {
            mask.id = mass.products[j].id;
            mask.title = mass.products[j].title;
            mask.price = mass.products[j].price;
            mask.thumbnail = mass.products[j].thumbnail;
            massDk.push(mask);
          }
        }
      }

      // "id" - ключ, по которому будем сортировать
      massDk.sort((user1, user2) => (user1["id"] > user2["id"] ? 1 : -1));

      dispatch(massdkCreate(massdk));
      flagOpen = true;
      setTrigger(!trigger);
    });
    dateStat.balans$ = DOLLARS;
    dateStat.balansCoin = COINS;
    dispatch(statsaveCreate(dateStat));
  }

  return (
    <Grid container sx={{ height: "100vh", width: "100%", bgcolor: "#E3D8F7" }}>
      <Grid item xs>
        {flagOpen && <MarketMain />}
      </Grid>
    </Grid>
  );
};

export default App;
