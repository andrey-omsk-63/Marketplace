import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "./../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

//import { ReplaceInSvg } from "../../MapServiceFunctions";

import { styleModalEnd, styleConv00, styleConv01 } from "./../MarketStyle";
import { styleConv02, styleConv03, styleConv04 } from "./../MarketStyle";
import { styleConv05 } from "./../MarketStyle";

let oldIdx = -1;
let coin = -1.00;
let dollar = -1.00;
let HAVE = 0;

const MarketСonversion = (props: {
  close: Function; // функция возврата в родительский компонент
  idx: number;
}) => {
  //== Piece of Redux =======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  const dispatch = useDispatch();
  //===========================================================
  const [openImg, setOpenImg] = React.useState(true);
  const [value, setValue] = React.useState(0);

  //=== инициализация ======================================
  if (props.idx !== oldIdx) {
    coin = JSON.parse(JSON.stringify(datestat.balansCoin));
    dollar = JSON.parse(JSON.stringify(datestat.balans$));
    HAVE = 0;
    oldIdx = props.idx;
  }
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

  const handleKey = (event: any) => {
    if (event.key === "Enter") event.preventDefault();
  };

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => document.removeEventListener("keydown", escFunction);
  }, [escFunction]);
  //=== Функции - обработчики ==============================
  const handleClose = () => {
    setOpenImg(false);
    props.close(false);
  };

  const CloseEndGl = (event: any, reason: string) => {
    if (reason === "escapeKeyDown") handleClose();
  };

  const SaveForm = (mode: number) => {
    if (mode) {
      datestat.balansCoin = coin;
      datestat.balans$ = dollar;
      dispatch(statsaveCreate(datestat));
    }
    handleClose();
  };
  //========================================================
  const DollarInput = () => {
    const handleChange = (event: any) => {
      let valueInp = event.target.value.replace(/^0+/, "");
      if (Number(valueInp) < 0) valueInp = 0;
      if (valueInp === "") valueInp = 0;
      valueInp = Math.trunc(Number(valueInp));
      if (valueInp <= datestat.balans$) {
        dollar = Number(datestat.balans$) - Number(valueInp);
        coin = Number(datestat.balansCoin) + Number(valueInp)
        console.log('###:',valueInp,dollar,datestat.balansCoin,coin)
        //coin = coin.toFixed(2);
        //dollar = Number(dollar).toFixed(2);
        HAVE++;
        setValue(valueInp);
      }
    };

    return (
      <Box sx={styleConv01}>
        <Box component="form" sx={styleConv02}>
          <TextField
            size="small"
            onKeyPress={handleKey} //отключение Enter
            type="number"
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 13.6,
                backgroundColor: "#FFFBE5",
                padding: "3px 0px 0px 0px",
              },
            }}
            value={value}
            onChange={handleChange}
            variant="standard"
            color="secondary"
          />
        </Box>
      </Box>
    );
  };

  const FooterContent = (SaveForm: Function) => {
    return (
      <Box sx={styleConv04}>
        <Box sx={{ display: "inline-block", margin: "0px 5px 0px 0px" }}>
          <Button sx={styleConv05} onClick={() => SaveForm(0)}>
            Отмена
          </Button>
        </Box>
        <Box sx={{ display: "inline-block", margin: "0px 6px 0px 6px" }}>
          <Button sx={styleConv05} onClick={() => SaveForm(1)}>
            Конвертировать
          </Button>
        </Box>
      </Box>
    );
  };

  let coob1 = HAVE ? "На вашем балансе станет: " : "Сейчас на вашем балансе: ";

  return (
    <Modal open={openImg} onClose={CloseEndGl} hideBackdrop={false}>
      <Box sx={styleConv00}>
        <Button sx={styleModalEnd} onClick={() => handleClose()}>
          <b>&#10006;</b>
        </Button>
        <Box sx={{ fontSize: 21, marginTop: 2 }}>
          {coob1} <b>{coin}</b>Coin и <b>{dollar}</b>$
        </Box>
        <Box sx={{ fontSize: 19, marginTop: 2 }}>
          Конвертация $ в Coin по курсу один к одному:
        </Box>
        {!!datestat.balans$ ? (
          <>
            <Box sx={{ fontSize: 19, marginTop: 2 }}>
              Вы можете проконвертировать от 1 до {datestat.balans$} $
            </Box>
            <Box sx={{ border: 0, fontSize: 19, marginTop: 2 }}>
              <Grid container>
                <Grid item xs={3.4}></Grid>
                <Grid item xs sx={{ border: 0, height: "24px" }}>
                  {DollarInput()}
                  <Box sx={styleConv03}>$ ➯ {coin}Coin (итого)</Box>
                </Grid>
              </Grid>
            </Box>
            {!!HAVE && <>{FooterContent(SaveForm)}</>}
          </>
        ) : (
          <>
            <Box sx={{ fontSize: 19, marginTop: 2 }}>
              К сожалению конвертировать нечего
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default MarketСonversion;
