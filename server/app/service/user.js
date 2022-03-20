const db = require("../models");
const { Op, where } = require('sequelize');


exports.create = async ({ }, { }, user) => {
  const { email, name, password } = user;
  if (!email || !name || !password) throw new Error('Can not create user. Missing fields');
  const existingUser = await get(email);
  if (existingUser) throw new Error('User already exists');

  let newUser = {
    email, name, password
  };
  await db.user.create(newUser);
  return { email, name };
}

async function get(email) {
  const [user] = await db.user.findAll({ where: { email } });
  return user;
}

exports.update = async ({ email }, { }, { password }) => {
  const curUser = await get(email);
  if (!curUser) throw new Error('User do not exists');
  await db.user.update({ ...curUser, password }, { where: { email } })
  return { success: true };
}


exports.login = async ({ }, { }, { email, password }) => {
  const curUser = await get(email);
  if (!curUser) throw new Error('User do not exists');
  return { success: curUser.password === password };
}
