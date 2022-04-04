import { getDatabase } from "@utils/database";
import withObjectId from "@utils/with-object-id";

import type { ObjectId } from "mongodb";

type userProps = {
  username: string;
  email: string;
  password: string;
  accessLvl: "admin" | "user";
};

const User = (function () {
  const db = getDatabase();
  const collection = db.collection("users");

  function createUser(user: userProps) {
    return collection.insertOne(user);
  }

  function findById(_id: ObjectId) {
    return collection.find({ _id }).next();
  }

  function findByUserInfo(userInfo: Partial<userProps>) {
    return collection.find(userInfo).next();
  }

  return {
    createUser: createUser,
    findByUserInfo: findByUserInfo,
    findById: withObjectId<ReturnType<typeof findById>>(findById),
  };
})();

export default User;
