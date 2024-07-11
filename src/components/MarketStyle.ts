export const styleModalEnd = {
  position: "absolute",
  top: "0%",
  left: "auto",
  right: "-0%",
  height: "21px",
  maxWidth: "2%",
  minWidth: "2%",
  color: "#801F95", // сиреневый
  textShadow: "2px 2px 3px rgba(0,0,0,0.3)",
};
//=== MarketMain ======================================================
export const styleMain01 = {
  height: "99.9vh",
  //background: 'linear-gradient(135deg, #DCE0AB 25%,#97BB92 52%, #D2D8B7 85%)',
  // этюд в зелёных тонах:
  //background: 'linear-gradient(135deg, #e2e5b9 25%,#a8c6a4 52%, #dadec3 85%)',
  // этюд в сиреневых тонах:
  background: "linear-gradient(140deg, #e3d8f7 26%,#dcbaf1 57%, #f8d7f7 85%)",
  padding: "2px 1px 0px 1px",
  //opacity: 0.99,
};

export const styleMain02 = (part: number, ILLUM: number, mode: number) => {
  const styleMain040 = {
    fontSize: ILLUM === mode ? 13.5 : 12.5,
    height: "30px",
    width: ((window.innerWidth - 3) / 12) * part - 3,
    //bgcolor: ILLUM === mode ? '#BAE186' : '#E6F5D6', // тёмно-салатовый/светло-салатовый
    bgcolor: ILLUM === mode ? "#82e94a" : "#E6F5D6", // ярко-салатовый/светло-салатовый
    //bgcolor: ILLUM === mode ? "#82e94a" : "#F4E8FB", // ярко-салатовый/светло-сиреневый
    border: "1px solid #d4d4d4", // серый
    borderRadius: 1,
    color: "black",
    textTransform: "unset !important",
    //padding: "2px 0px 2px 0px",
    boxShadow: ILLUM === mode ? 9 : 3,
    //textShadow: '2px 2px 3px rgba(0,0,0,0.3)',
  };
  return styleMain040;
};

export const styleMain03 = {
  border: 0,
  height: "24px",
  textAlign: "center",
  fontSize: 14.0,
  padding: "5px 0px 0px 0px",
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};
//=== MarketSpis ======================================================
export const styleBl1Form01 = (part: number) => {
  const styleBl3Form = {
    //bgcolor: 'background.paper',
    //border: '1px solid #FFFFFF',
    //borderRadius: 1,
    margin: "5px 2px 0px 1px",
    height: window.innerHeight - part,
    width: "100%",
  };
  return styleBl3Form;
};

export const styleBl1Form02 = (part: number) => {
  const styleBl3Form = {
    //bgcolor: "background.paper",
    //border: '1px solid #d4d4d4', // серый
    borderRadius: 1,
    height: window.innerHeight - part,
    overflowX: "auto", // скролл
  };
  return styleBl3Form;
};

export const styleBl1Form03 = (hght: number) => {
  const styleBl1Form = {
    //border: 1,
    //bgcolor: "#F1F5FB",
    height: hght,
    //padding: "15px 15px 15px 15px",
    //margin: "0px 5px 0px 5px",
  };
  return styleBl1Form;
};

export const styleBl1Form04 = (hght: number, color: number) => {
  //let col = !color ? "#F1F5FB" : "#D0DEF2";
  let col = !color ? "#F1F5FB" : "#DFE9F7";
  const styleBl104 = {
    fontSize: 11.8,
    margin: "0px 5px 5px 5px",
    bgcolor: col,
    border: "1px solid #d4d4d4", // серый
    borderRadius: 2,
    height: hght - 15,
    padding: "5px 05px 0px 10px",
    cursor: "pointer",
  };
  return styleBl104;
};
//=== MarketSpisView ==================================================
export const styleWVI00 = {
  fontSize: 19.0,
  outline: "none",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerHeight * 1.2 + 5,
  bgcolor: "background.paper",
  border: "1px solid #FFFFFF",
  borderRadius: 1,
  color: "#7620a2", // сиреневый
  boxShadow: 24,
  textAlign: "center",
  padding: "5px 5px 5px 5px",
  height: window.innerHeight * 0.9 + 4,
};

export const styleWVI01 = {
  border: "1px solid #d4d4d4",
  marginTop: 1,
  bgcolor: "#F1F5FB",
  height: window.innerHeight * 0.8 + 9,
  width: "100%",
  borderRadius: 1,
  overflowX: "auto",
  boxShadow: 6,
};

export const styleWVI02 = {
  fontSize: 17,
  height: "33px",
  width: "212px",
  marginBottom: 2,
  bgcolor: "#A73AFD", // сиреневый
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  color: "#d4d4d4", // серый
  textTransform: "unset !important",
  boxShadow: 5,
};

export const styleWVI022 = {
  fontSize: 17,
  height: "33px",
  width: "212px",
  bgcolor: "#E8CCFF", // бледно-сиреневый
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  color: "#7620A2", // сиреневый
  textTransform: "unset !important",
  boxShadow: 5,
};

export const styleWVI03 = {
  textAlign: "center",
  marginTop: 1,
  height: window.innerHeight * 0.705,
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};
//=== MarketBasket ====================================================
export const styleFormEnd = {
  height: "21px",
  maxWidth: "2%",
  minWidth: "2%",
  color: "#801F95", // сиреневый
  textShadow: "2px 2px 3px rgba(0,0,0,0.3)",
};
//=== MarketСonversion ================================================
export const styleConv00 = {
  fontSize: 19.0,
  outline: "none",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 230,
  bgcolor: "background.paper",
  border: "1px solid #FFFFFF",
  borderRadius: 1,
  color: "#7620a2", // сиреневый
  boxShadow: 24,
  textAlign: "center",
  padding: "5px 5px 5px 5px",
};

export const styleConv01 = {
  width: "28px",
  maxHeight: "24px",
  minHeight: "24px",
};

export const styleConv02 = {
  "& > :not(style)": {
    maxHeight: "24px",
    minHeight: "24px",
    border: "1px solid #d4d4d4", // серый
    borderRadius: 2,
    marginTop: "-4px",
    marginLeft: "0px",
    width: "48px",
    boxShadow: 6,
  },
};

export const styleConv03 = {
  width: "212px",
  marginTop: -3.5,
  marginLeft: 6.5,
  textAlign: "left",
};

export const styleConv04 = {
  marginTop: 2.2,
  display: "flex",
  justifyContent: "center",
};

export const styleConv05 = {
  maxHeight: "30px",
  minHeight: "30px",
  bgcolor: "#E6F5D6", // светло салатовый
  border: "1px solid #000",
  borderRadius: 1,
  borderColor: "#d4d4d4", // серый
  textTransform: "unset !important",
  boxShadow: 6,
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
  color: "#5B1080", // сиреневый
};
//=== InputAdress =====================================================
