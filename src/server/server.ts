import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import calendarRoutes from "../routes/calendarRoutes";
import authroutes from "../routes/auth";

export default class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    // this.port = Number(process.env.PORT) || 3500;
  }

  async start(port: number, callback?: any) {
    this.app.listen(port, callback);
    console.log(`Servidor en puerto ${port}`);
    this.startRoutes();
  }

  startRoutes() {
    this.app.use("/api/events", calendarRoutes);
    this.app.use("/api/auth", authroutes);

    // manejar demas rutas q no consiga node, cualquier ruta q no este definida se ataja en este get
    // this.app.get('*', (req, res) => {
    //   // console.log(path.resolve(__dirname,'../../public/index.html'))
    //   // console.log(path.resolve(__dirname))
    //   res.sendFile(path.resolve(__dirname,'../../public/index.html'))
    // })
    // console.log(object)
  }
}
