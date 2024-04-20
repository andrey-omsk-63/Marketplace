import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { massrouteCreate } from './../../redux/actions';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

//import { ReplaceInSvg } from "../../MapServiceFunctions";

import { styleModalEnd, styleWVI00, styleWVI01 } from './../MarketStyle';
import { styleWVI02, styleWVI03, styleWVI022 } from './../MarketStyle';

const MarketBasketView = (props: {
  close: Function; // функция возврата в родительский компонент
  idx: number;
  trigger: Function; // функция для ререндера в родительском компоненте
}) => {
  //== Piece of Redux =======================================
  // let massdk = useSelector((state: any) => {
  //   const { massdkReducer } = state;
  //   return massdkReducer.massdk;
  // });
  let massroute = useSelector((state: any) => {
    const { massrouteReducer } = state;
    return massrouteReducer.massroute;
  });
  console.log('massroute:', massroute);
  const dispatch = useDispatch();
  //===========================================================
  const [openImg, setOpenImg] = React.useState(true);

  //=== инициализация ======================================
  //========================================================
  const CloseEnd = React.useCallback(() => {
    props.close(null);
  }, [props]);

  const handleClose = () => {
    setOpenImg(false);
    props.close(false);
  };

  const CloseEndGl = (event: any, reason: string) => {
    if (reason === 'escapeKeyDown') handleClose();
  };
  //=== обработка Esc ======================================
  const escFunction = React.useCallback(
    (event) => {
      if (event.keyCode === 27) CloseEnd();
    },
    [CloseEnd],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', escFunction);
    return () => document.removeEventListener('keydown', escFunction);
  }, [escFunction]);
  //=== Функции - обработчики ==============================
  const ClickBasket = () => {
    let rec = massroute[props.idx];
    massroute.push(rec);
    dispatch(massrouteCreate(massroute));
    props.trigger();
    props.close(false);
  };

  const ClickDel = () => {
    let massRab = [];
    for (let i = 0; i < massroute.length; i++)
      if (i !== props.idx) massRab.push({ ...massroute[i] });
    massroute = [];
    massroute = massRab;
    dispatch(massrouteCreate(massroute));
    props.trigger();
    props.close(false);
  };
  //========================================================
  return (
    <Modal open={openImg} onClose={CloseEndGl} hideBackdrop={false}>
      <Box sx={styleWVI00}>
        <Button sx={styleModalEnd} onClick={() => handleClose()}>
          <b>&#10006;</b>
        </Button>
        <Grid container>
          <Grid item xs={8} sx={{ border: 0 }}>
            <Box sx={styleWVI01}>
              <img
                src={massroute[props.idx].thumbnail}
                height={window.innerHeight * 0.8}
                width={'95%'}
                alt="PICT"
              />
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ border: 0 }}>
            <Box sx={styleWVI03}>
              <b>
                <em>Описание:</em>
              </b>
            </Box>
            <Button sx={styleWVI02} onClick={() => ClickBasket()}>
              Оформить товар
            </Button>
            <Button sx={styleWVI022} onClick={() => ClickDel()}>
              🗑️ Удалить товар
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'left', padding: '5px 0px 0px 10px' }}>
          <Box>
            #<b>{massroute[props.idx].id}</b> Цена: <b>{massroute[props.idx].price}</b>
          </Box>
          <Box>
            <b>{massroute[props.idx].title}</b>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default MarketBasketView;
