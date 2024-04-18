import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapCreate, massrouteCreate, massplanCreate } from "./redux/actions";
import { massrouteproCreate, coordinatesCreate } from "./redux/actions";
import { massdkCreate, statsaveCreate } from "./redux/actions";

import Grid from "@mui/material/Grid";

import axios from "axios";

import MainMap from "./components/MainMapGl";
import AppSocketError from "./AppSocketError";
import {
  SoobErrorCreateWay,
  SoobErrorDeleteWay,
  SoobErrorCreateWayToPoint,
  SoobErrorDeleteWayToPoint,
  SoobErrorCreateWayFromPoint,
  SoobErrorDeleteWayFromPoint,
} from "./components/MapSocketFunctions";

import { ZONE } from "./components/MapConst";

import { PlanCoord } from "./interfacePlans.d";
//import { DatePlan } from "./interfacePlans.d";
//import { DateRoute } from "./interfaceRoute.d";
//import { Tflight } from "./interfaceMAP.d";
import { dataMap } from "./otladkaMaps";
import { dataRoute } from "./otladkaRoutes";
import { dataPlan } from "./otladkaPlans";

export let dateMapGl: any;
export let dateRouteGl: any;
export let dateRouteProGl: any;
export let datePlan: any;

export interface Pointer {
  ID: number;
  coordinates: Array<number>;
  nameCoordinates: string;
  region: number;
  area: number;
  subarea: number;
  phases: number[];
  newCoordinates: number;
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

let flagOpen = true;
let flagOpenКостыль = true;
let flagOpenWS = true;
let WS: any = null;
let homeRegion: any = "";
let soob = "";

const App = () => {
  //== Piece of Redux ======================================
  let massdk = useSelector((state: any) => {
    const { massdkReducer } = state;
    return massdkReducer.massdk;
  });

  let coordinates = useSelector((state: any) => {
    const { coordinatesReducer } = state;
    return coordinatesReducer.coordinates;
  });

  const dispatch = useDispatch();
  //========================================================
  const host =
    "wss://" +
    window.location.host +
    window.location.pathname +
    "W" +
    window.location.search;

  const [openSetErr, setOpenSetErr] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);
  const [svg, setSvg] = React.useState<any>(null);

  const FilterArea = React.useCallback(
    (data: any) => {
      dateMapGl = data;
      if (ZONE) {
        dateMapGl.tflight = dataMap.tflight.filter(
          (user) => user.area.num === ZONE.toString()
        );
      }
      dispatch(mapCreate(dateMapGl));
    },
    [dispatch]
  );

  if (flagOpenWS) {
    WS = new WebSocket(host);
    flagOpenWS = false;
    dateStat.ws = WS;
    if (WS.url === "wss://localhost:3000/W") dateStat.debug = true;
    dispatch(statsaveCreate(dateStat));
    let pageUrl = new URL(window.location.href);
    homeRegion = Number(pageUrl.searchParams.get("Region"));
  }

  React.useEffect(() => {
    WS.onopen = function (event: any) {
      console.log("WS.current.onopen:", event);
    };

    WS.onclose = function (event: any) {
      console.log("WS.current.onclose:", event);
    };

    WS.onerror = function (event: any) {
      console.log("WS.current.onerror:", event);
    };

    WS.onmessage = function (event: any) {
      let allData = JSON.parse(event.data);
      let data = allData.data;
      console.log("пришло:", allData.type, data);
      switch (allData.type) {
        case "mapInfo":
          FilterArea(data); // берём в работу заданный район
          break;
        case "graphInfo":
          let pointRab = JSON.parse(JSON.stringify(data));
          pointRab.points = []; // массив протоколов
          pointRab.vertexes = [];
          pointRab.ways = [];
          dateRouteProGl = JSON.parse(JSON.stringify(pointRab));
          dateRouteGl = JSON.parse(JSON.stringify(data));
          if (dateRouteGl.points === null) dateRouteGl.points = [];
          if (dateRouteGl.vertexes === null) dateRouteGl.vertexes = [];
          if (dateRouteGl.ways === null) dateRouteGl.ways = [];
          dispatch(massrouteCreate(dateRouteGl));
          dispatch(massrouteproCreate(dateRouteProGl));
          break;
        case "createPoint":
          if (data.status) {
            dateRouteGl.vertexes[dateRouteGl.vertexes.length - 1].id = data.id;
            massdk[massdk.length - 1].ID = data.id;
            setTrigger(!trigger);
          } else {
            dateRouteGl.vertexes.splice(dateRouteGl.vertexes.length - 1, 1);
            massdk.splice(massdk.length - 1, 1);
            coordinates.splice(coordinates.length - 1, 1);
            soob = "Произошла ошибка при создании точки";
            setOpenSetErr(true);
            dispatch(coordinatesCreate(coordinates));
          }
          dispatch(massrouteCreate(dateRouteGl));
          dispatch(massdkCreate(massdk));
          break;
        case "deletePoint":
          if (!data.status) {
            soob = "Произошла ошибка при удалении точки";
            setOpenSetErr(true);
          }
          break;
        case "createVertex":
          if (!data.status) {
            dateRouteGl.vertexes.splice(dateRouteGl.vertexes.length - 1, 1);
            massdk.splice(massdk.length - 1, 1);
            coordinates.splice(coordinates.length - 1, 1);
            soob = "Произошла ошибка при создании перекрёстка";
            setOpenSetErr(true);
            dispatch(coordinatesCreate(coordinates));
            dispatch(massrouteCreate(dateRouteGl));
            dispatch(massdkCreate(massdk));
          }
          break;
        case "deleteVertex":
          if (!data.status) {
            soob = "Произошла ошибка при удалении перекрёстка";
            setOpenSetErr(true);
          }
          break;
        case "createWay":
          if (!data.status) {
            soob = SoobErrorCreateWay(data);
            //================================= потом исправить ======
            console.log("createWay:", soob);
            // dateRouteGl.ways.splice(dateRouteGl.ways.length - 1, 1);
            // dateRouteProGl.ways.splice(dateRouteGl.ways.length - 1, 1);
            // dispatch(massrouteproCreate(dateRouteProGl));
            // dispatch(massrouteCreate(dateRouteGl));
            // console.log('dateRouteGl:',dateRouteGl)
            // setOpenSetErr(true);
          }
          break;
        case "deleteWay":
          if (!data.status) {
            soob = SoobErrorDeleteWay(data);
            setOpenSetErr(true);
          }
          break;
        case "createWayToPoint":
          if (!data.status) {
            soob = SoobErrorCreateWayToPoint(data);
            //================================= потом исправить ======
            console.log("createWayToPoint:", soob);
            // dateRouteGl.ways.splice(dateRouteGl.ways.length - 1, 1);
            // dispatch(massrouteCreate(dateRouteGl));
            // dateRouteProGl.ways.splice(dateRouteGl.ways.length - 1, 1);
            // dispatch(massrouteproCreate(dateRouteProGl));
            // setOpenSetErr(true);
          }
          break;
        case "deleteWayToPoint":
          if (!data.status) {
            soob = SoobErrorDeleteWayToPoint(data);
            setOpenSetErr(true);
          }
          break;
        case "createWayFromPoint":
          if (!data.status) {
            soob = SoobErrorCreateWayFromPoint(data);
            //================================= потом исправить ======
            console.log("createWayFromPoint:", soob);
            // dateRouteGl.ways.splice(dateRouteGl.ways.length - 1, 1);
            // dispatch(massrouteCreate(dateRouteGl));
            // dateRouteProGl.ways.splice(dateRouteGl.ways.length - 1, 1);
            // dispatch(massrouteproCreate(dateRouteProGl));
            // setOpenSetErr(true);
          }
          break;
        case "deleteWayFromPoint":
          if (!data.status) {
            soob = SoobErrorDeleteWayFromPoint(data);
            setOpenSetErr(true);
          }
          break;
        case "getSvg":
          if (!data.status) {
            soob = "Ошибка при получении изображений перекрёстков";
            setOpenSetErr(true);
            setSvg(0);
          } else setSvg(data.svg);
          break;
        default:
          console.log("data_default:", data);
      }
    };
  }, [dispatch, massdk, coordinates, svg, trigger, FilterArea]);

  if (WS.url === "wss://localhost:3000/W" && flagOpen) {
    console.log("РЕЖИМ ОТЛАДКИ!!!", dataMap.tflight);
    FilterArea(dataMap); // берём в работу заданный район
    console.log("dataRoute.data:", dataRoute.data);
    dateRouteGl = { ...dataRoute.data };
    dateRouteProGl = { ...dataRoute.data };
    dateRouteProGl.points = []; // массив протоколов
    dateRouteProGl.vertexes = [];
    dateRouteProGl.ways = [];
    flagOpen = false;
    dispatch(massrouteCreate(dateRouteGl));
    dispatch(massrouteproCreate(dateRouteProGl));
    axios.get("http://localhost:3000/otladkaPlans.json").then(({ data }) => {
      datePlan = data.data;
      dispatch(massplanCreate(datePlan));
      console.log("datePlan:", datePlan);
    });
    axios.get("http://localhost:3000/examplSvg1.svg").then(({ data }) => {
      dateStat.exampleImg1 = data;
      dispatch(statsaveCreate(dateStat));
    });
    axios.get("http://localhost:3000/examplSvg2.svg").then(({ data }) => {
      dateStat.exampleImg2 = data;
      dispatch(statsaveCreate(dateStat));
    });
  } else {
    if (flagOpenКостыль) {
      datePlan = { ...dataPlan.data }; // временный костыль
      dispatch(massplanCreate(datePlan));
      console.log("datePlan:", datePlan);
      flagOpenКостыль = false;
    }
  }

  return (
    <Grid container sx={{ height: "100vh", width: "100%", bgcolor: "#E9F5D8" }}>
      <Grid item xs>
        {openSetErr && <AppSocketError sErr={soob} setOpen={setOpenSetErr} />}
        <MainMap
          region={homeRegion}
          sErr={soob}
          svg={svg}
          setSvg={setSvg}
          trigger={trigger}
        />
      </Grid>
    </Grid>
  );
};

export default App;
