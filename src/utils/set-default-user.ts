import User from "@models/user";

async function setDefaultUser() {
  try {
    const adminUser = await User.findByUserInfo({ accessLvl: "admin" });
    let userId;

    if (!adminUser) {
      const createdUser = await User.createUser({
        username: "admin",
        email: "some@some",
        password: "1234",
        accessLvl: "admin",
        cart: { items: [] },
        orders: [],
      });
      userId = createdUser.insertedId;
    } else {
      userId = adminUser._id;
    }

    User.defaultUserId = userId;

    return Promise.resolve();
  } catch {
    console.log("could not find or create admin user");

    return Promise.reject();
  }
}

export default setDefaultUser;
