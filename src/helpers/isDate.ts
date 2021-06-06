import moment from "moment";

// const isDate = (value: any, rest: any) => {
const isDate = (value: any, rest: any) => {
  if (!value) {
    return false;
  }
  // console.log({value})
  // console.log({rest})
  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

export { isDate };
