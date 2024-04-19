import * as React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

//import { ReplaceInSvg } from "../../MapServiceFunctions";

import { styleModalEnd } from "./../MarketStyle";
//import { styleWVI00, styleWVI01 } from "../../MainMapStyle";

//import { KolIn } from "./../../MapConst";

//let nameIn = "";

const MarketSpisView = (props: {
  close: Function; // функция возврата в родительский компонент
  idx: number;
  // name: string;
  // nik: string;
  // pict: any; // фото
}) => {
  //console.log("MapWindPK:", props.route);
  //== Piece of Redux =======================================
  let massdk = useSelector((state: any) => {
    const { massdkReducer } = state;
    return massdkReducer.massdk;
  });
  //===========================================================
  const [openImg, setOpenImg] = React.useState(true);

  //=== инициализация ======================================
  //if (props.name) nameIn = props.name + ".";

  //========================================================
  const CloseEnd = React.useCallback(() => {
    props.close(null);
  }, [props]);

  //=== обработка Esc ======================================
  const escFunction = React.useCallback(
    (event) => {
      if (event.keyCode === 27) CloseEnd();
    },
    [CloseEnd]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => document.removeEventListener("keydown", escFunction);
  }, [escFunction]);
  //=== Функции - обработчики ==============================

  //========================================================

  const handleClose = () => {
    setOpenImg(false);
    props.close(false);
  };

  const CloseEndGl = (event: any, reason: string) => {
    if (reason === "escapeKeyDown") handleClose();
  };

  //let lngth = Math.round(window.innerHeight * 0.8).toString();
  //let expSvg = ReplaceInSvg(props.svg, lngth);

  const styleWVI00 = {
    outline: "none",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: window.innerHeight * 1.1 + 5,
    bgcolor: "background.paper",
    border: "1px solid #FFFFFF",
    borderRadius: 1,
    color: "#7620a2", // сиреневый
    boxShadow: 24,
    textAlign: "center",
    padding: "5px 5px 5px 5px",
    height: window.innerHeight * 0.9 + 4,
  };

  // const styleWVI01 = {
  //   border: "1px solid #d4d4d4",
  //   marginTop: 1,
  //   bgcolor: "#F1F5FB",
  //   height: window.innerHeight * 0.8 + 4,
  //   borderRadius: 1,
  //   overflowX: "auto",
  //   boxShadow: 6,
  // };

  return (
    <Modal open={openImg} onClose={CloseEndGl} hideBackdrop={false}>
      <Box sx={styleWVI00}>
        <Button sx={styleModalEnd} onClick={() => handleClose()}>
          <b>&#10006;</b>
        </Button>
        {/* <b>{props.name}</b> {nik1}
        <b>{props.nik}</b>
        {nik2}
        <Box sx={styleWVI01}>
          <img src={props.pict} height={window.innerHeight * 0.8} alt="PICT" />
        </Box> */}
      </Box>
    </Modal>
  );
};

export default MarketSpisView;
