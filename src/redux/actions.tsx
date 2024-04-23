import {
  MASSDK_CREATE,
  MASSROUTE_CREATE,
  MASSROUTEPRO_CREATE,
  STATSAVE_CREATE,
} from "./types";

import { Pointer } from "./../App";
import { Stater } from "./../App";
import { Router } from "./../App";

export function massdkCreate(massDka: Pointer[] = []) {
  return {
    type: MASSDK_CREATE,
    data: massDka,
  };
}

export function massrouteCreate(massRouter: Router) {
  return {
    type: MASSROUTE_CREATE,
    data: massRouter,
  };
}

export function massrouteproCreate(massRouterPro: Router) {
  return {
    type: MASSROUTEPRO_CREATE,
    data: massRouterPro,
  };
}

export function statsaveCreate(dateStat: Stater) {
  return {
    type: STATSAVE_CREATE,
    data: dateStat,
  };
}
