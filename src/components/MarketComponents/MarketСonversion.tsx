import * as React from 'react';
import {
  //useDispatch,
  useSelector,
} from 'react-redux';
//import { statsaveCreate } from "../redux/actions";

//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

//import { ReplaceInSvg } from "../../MapServiceFunctions";

import { styleModalEnd } from './../MarketStyle';
//import { styleWVI03 } from './../MarketStyle';

const MarketСonversion = (props: {
  close: Function; // функция возврата в родительский компонент
  //idx: number;
  //trigger: Function; // функция для ререндера в родительском компоненте
}) => {
  //== Piece of Redux =======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
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

  const styleConv00 = {
    fontSize: 19.0,
    outline: 'none',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 230,
    bgcolor: 'background.paper',
    border: '1px solid #FFFFFF',
    borderRadius: 1,
    color: '#7620a2', // сиреневый
    boxShadow: 24,
    textAlign: 'center',
    padding: '5px 5px 5px 5px',
  };

  return (
    <Modal open={openImg} onClose={CloseEndGl} hideBackdrop={false}>
      <Box sx={styleConv00}>
        <Button sx={styleModalEnd} onClick={() => handleClose()}>
          <b>&#10006;</b>
        </Button>
        <Box sx={{ fontSize: 21, marginTop: 2 }}>
          На вашем балансе: <b>{datestat.balansCoin}</b>Coin и <b>{datestat.balans$}</b>$
        </Box>
        <Box sx={{ fontSize: 19, marginTop: 2 }}>Конвертация $ в Coin по курсу один к одному:</Box>
        <Box sx={{ fontSize: 19, marginTop: 2 }}>
          Вы можете проконвертировать от 1 до {datestat.balans$} $
        </Box>
        <Box sx={{ fontSize: 19, marginTop: 2 }}>XXX$ ➯ XXXCoin</Box>
        <Box sx={{ fontSize: 19, marginTop: 2 }}>Отмена Конвертировать</Box>
      </Box>
    </Modal>
  );
};

export default MarketСonversion;
