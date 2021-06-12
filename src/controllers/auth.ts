import { Request, Response } from "express";
import { UsuarioModel } from "../models/User.model";
import bcrypt from "bcrypt";
import Token from "../helpers/Token";

const createUser = async (req: any, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // verificar si no existe un correo igual
    const usuario = await UsuarioModel.findOne({ email: email }).exec();
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese correo",
      });
    }

    const salt = bcrypt.genSaltSync();
    const user: any = {
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    };

    const userCreated = new UsuarioModel(user);
    await userCreated.save();

    delete user.password;
    delete user.email;
    user.uid = userCreated.id;
    const token = await Token.generateJwtToken(user);

    return res.status(201).json({
      ok: true,
      msg: "registro",
      uid: userCreated.id,
      name: userCreated.name,
      userCreated,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno, hable con el administrador",
    });
  }
};

const login = async (req: any, res: Response) => {
  const { email, password } = req.body;
  try {
    const userLogin = await UsuarioModel.findOne({ email: email }).exec();
    if (userLogin) {
      if (userLogin.compararClave(password)) {
        const payload = {
          uid: userLogin._id,
          name: userLogin.name,
          email: userLogin.email,
        };
        // token
        const token = await Token.generateJwtToken(payload);
        return res.status(200).json({
          ok: true,
          uid: userLogin.id,
          name: userLogin.name,
          userLogin,
          token,
        });
      } else if (password == "" || userLogin.password == "") {
        return res.status(400).json({
          ok: false,
          mensaje: "Campo vacio",
          errors: { message: "El campo no puede estar vacio" },
        });
      } else if (password !== userLogin.password) {
        return res.status(400).json({
          ok: false,
          mensaje: "Clave incorrecta",
          errors: { message: "Clave incorrecta" },
        });
      }
    } else {
      return res.status(400).json({
        ok: false,
        mensaje: "Credenciales no son correctas",
        errors: { message: "Credenciales no son correctas" },
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "login",
      email,
      password,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno",
    });
  }
};

const renewToken = async (req: any, res: Response) => {
  const { usuario } = req;
  const { uid,name} = usuario.usuario;
  console.log(uid,name)
  try {
   
    const token = await Token.generateJwtToken(usuario);
    return res.status(200).json({
      ok: true,
      msg: "renew token",
      uid: uid,
      name: name,
      usuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno",
    });
  }
};

const test = async (req: any, res: Response) => {
  return res.status(200).json({
    ok: true,
  });
};

export { createUser, login, renewToken, test };
