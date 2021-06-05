import { NextFunction, Response, Request } from "express";
import Token from "../helpers/Token";

export const verificaToken = async (req: any, res: Response, next: NextFunction) => {
  // token enviado por los headers
  const userToken = req.header("x-token") || "";
  // const userToken = req.get("x-token") || "";

  if (!userToken) {
    return res.status(401).json({
      ok: false,
      mensaje: "No hay token en la peticion",
    });
  }

  try {
    const token = await Token.comprobarToken(userToken)
    req.usuario = token
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: "token no valido",
    });
  }

  //   Token.comprobarToken(userToken)
  //     .then((decoded: any) => {
  //       // console.log({ decoded });
  //       req.usuario = decoded.usuario;
  //   next();
  //     })
  //     .catch((err) => {
  //   return res.status(401).json({
  //     ok: false,
  //     mensaje: "token no valido",
  //   });
  //     });
};
