import { User } from "../models/userModel";
import HttpError from "../utils/HttpError";

interface registrationData {
  userData: {
    name: string;
    email: string;
    password: string;
  };
}

const checkUserEmailExists = async (email: string) => {
  const emailExists = await User.exists({ email });

  if (emailExists) throw new HttpError(409, "Email in use");
};

const registration = async (data: registrationData) => {
  const newUserData = {
    ...data,
  };

  const newUser = await User.create(newUserData);

  newUser.password = "";

  return {
    user: newUser,
  };
};

export default {
  checkUserEmailExists,
  registration,
};
