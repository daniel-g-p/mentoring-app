import dotenv from "dotenv";

dotenv.config();

export const tryCatch = (controllerFunction) => {
  return async (req, res, next) => {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

export const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
  return res.redirect("/");
};
