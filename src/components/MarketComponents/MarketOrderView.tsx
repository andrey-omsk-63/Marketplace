import * as React from 'react';
import {
  //useDispatch,
  useSelector,
} from 'react-redux';
//import { massrouteCreate } from './../../redux/actions';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

//import { ReplaceInSvg } from "../../MapServiceFunctions";

import { styleModalEnd, styleWVI00, styleWVI01 } from './../MarketStyle';
import { styleWVI03 } from './../MarketStyle';

const MarketOrderView = (props: {
  close: Function; // функция возврата в родительский компонент
  idx: number;
  //trigger: Function; // функция для ререндера в родительском компоненте
}) => {
  //== Piece of Redux =======================================
  let massroutepro = useSelector((state: any) => {
    const { massrouteproReducer } = state;
    return massrouteproReducer.massroutepro;
  });
  //console.log('massroute:', massroute);
  //const dispatch = useDispatch();
  //===========================================================
  const [openImg, setOpenImg] = React.useState(true);

  //=== инициализация ======================================

  //========================================================
  const CloseEnd = React.useCallback(() => {
    props.close(null);
  }, [props]);

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

  //========================================================

  const handleClose = () => {
    setOpenImg(false);
    props.close(false);
  };

  const CloseEndGl = (event: any, reason: string) => {
    if (reason === 'escapeKeyDown') handleClose();
  };

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
                src={massroutepro[props.idx].thumbnail}
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
            <Box>Срок доставки 3 дня</Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'left', padding: '5px 0px 0px 10px' }}>
          <Box>
            #<b>{massroutepro[props.idx].id}</b> Цена: <b>{massroutepro[props.idx].price}</b>Coin
          </Box>
          <Box>
            <b>{massroutepro[props.idx].title}</b>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default MarketOrderView;
