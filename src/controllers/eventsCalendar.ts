import { Request, Response } from "express";
import { EventModel } from "../models/Events";

const getEventos = async (req: any, res: Response) => {
  try {
    const events = await EventModel.find({}).populate("user", "name").exec();
    return res.status(200).json({
      ok: true,
      msg: "Get eventos",
      events,
    });
  } catch (error) {
    return res.status(500).json({
      ok: true,
      msg: "Hable con el administrador",
    });
  }
};

const crearEvent = async (req: any, res: Response) => {
  try {
    const { body } = req;
    console.log(req.usuario.usuario);
    // { name: 'Adrian jose 11', uid: '60bbf506c4266d3fe462dbc5' }
    const event: any = new EventModel(body);
    event.user = req.usuario.usuario.uid;
    const eventSaved = await event.save();
    return res.status(200).json({
      ok: true,
      msg: "Create eventos",
      eventSaved,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: true,
      msg: "Hable con el administrador",
    });
  }
};

// con findByIdAndUpdate
// const updateEvent = async (req: any, res: Response) => {
//   const { id } = req.params;
//   try {
//     const { body } = req;

//     let eventUpdated: any = await EventModel.findById(id).exec();
//     if (eventUpdated) {
//       // console.log({eventUpdated})
//       // console.log({user: req?.usuario})
//       // eventUpdated.user = req.usuario.usuario?.uid;
//       if (eventUpdated.user.toString() != req?.usuario?.usuario?.uid) {
//         console.log(eventUpdated.user, req?.usuario?.usuario?.uid);
//         return res.status(401).json({
//           ok: false,
//           msg: "No tiene privilegio de editar este evento",
//         });
//       }
//       const newEvent = {
//         ...body,
//         user: eventUpdated.user,
//       };

//       const eventUpdate: any = await EventModel.findByIdAndUpdate(
//         id,
//         newEvent,
//         { new: true }
//       );

//       return res.status(200).json({
//         ok: true,
//         msg: "Update eventos",
//         eventUpdate,
//       });
//     } else {
//       return res.status(400).json({
//         ok: true,
//         msg: "El evento con el id " + id + " no existe",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       ok: false,
//       msg: "Hable con el administrador",
//     });
//   }
// };

// sin findByIdAndUpdate
const updateEvent = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const { title, start, end, notes } = req.body;

    const eventUpdated: any = await EventModel.findById(id).exec();
    if (eventUpdated) {
      if (eventUpdated.user.toString() != req?.usuario?.usuario?.uid) {
        console.log(eventUpdated.user, req?.usuario?.usuario?.uid);
        return res.status(401).json({
          ok: false,
          msg: "No tiene privilegio de editar este evento",
        });
      }

      eventUpdated.title = title || "";
      eventUpdated.start = start || "";
      eventUpdated.end = end || "";
      eventUpdated.notes = notes || "";
      const eventUpdatedeSave = await eventUpdated.save();

      return res.status(200).json({
        ok: true,
        msg: "Update eventos",
        eventUpdatedeSave
      });
    } else {
      return res.status(400).json({
        ok: true,
        msg: "El evento con el id " + id + " no existe",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteEvent = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const eventDeleted: any = await EventModel.findById(id).exec();
    if (eventDeleted) {
      if (eventDeleted.user.toString() != req?.usuario?.usuario?.uid) {
        return res.status(401).json({
          ok: false,
          msg: "No tiene privilegio de eliminar este evento",
        });
      }

      const deletedEvent = await EventModel.findByIdAndDelete(id);
      return res.status(200).json({
        ok: true,
        msg: "Delete eventos",
        deletedEvent,
      });
    } else {
      return res.status(400).json({
        ok: true,
        msg: "El evento con el id " + id + " no existe",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

export { getEventos, crearEvent, updateEvent, deleteEvent };
