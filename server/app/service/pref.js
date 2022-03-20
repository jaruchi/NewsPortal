const db = require("../models");
const { Op, where } = require('sequelize');

/**
 * This function tries to find and object which matches fav 
 * @param {prefObject} param0 
 * @returns dbprefObject
 */
async function get({ email, source = '', likedart = '', savedart = '' }) {
  const [pref] = await db.pref.findAll({ where: { email, source, likedart, savedart } });
  return pref;
}

exports.unmarkfav = async ({ source = '', savedart = '', likedart = '' }, { email }) => {
  console.log(source, email)
  const fav = await get({ email, source, savedart, likedart });

  if (!fav) {
    throw new Error('Faviorite dont exist')
  }
  if (fav) await db.pref.destroy({ where: { id: fav.id } });
  return { success: true };
}

exports.markfav = async ({ source = '', savedart = '', likedart = '' }, { email }) => {
  const fav = await get({ email, source, savedart, likedart });

  if (fav) {
    throw new Error('Faviorite already exist')
  }
  if (!fav) await db.pref.create({ email, source, savedart, likedart });
  return { success: true };
}


exports.getfav = async ({ email }) => {
  const favs = await db.pref.findAll({ where: { email } })
  return favs.map(({ source, likedart, savedart }) => ({ source, likedart, savedart }));
}
