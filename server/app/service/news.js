const db = require("../models");
const { Op, where } = require('sequelize');

exports.getAll = async (_, { title }) => {
  let condition = null;
  if (title) {
    condition = {
      title: {
        [Op.iLike]: `%${title}%`
      }
    }
  }
  const news = await db.news.findAll({ where: condition });
  return news;
}

exports.create = async ({ }, { }, news) => {
  const { title, description = '-', author = "-author-" } = news;
  if (!title) throw new Error('No title provided to create new')
  let newNews = {
    title, description, author
  };
  const news1 = await db.news.create(newNews);
  return news1;
}

async function get({ id }) {
  const [news] = await db.news.findAll({ where: { id } });
  return news;
}
exports.get = get;

exports.update = async ({ id }, { }, news) => {
  const curNews = await get({ id });
  const updatedNews = {
    title: news.title || curNews.title,
    description: news.description || curNews.description,
    author: news.author || curNews.author
  }
  const changedNews = await db.news.update(updatedNews, { where: { id } })
  return await get({ id });
}

exports.destroy = async ({ id }) => {
  const news = get({ id });
  await db.news.destroy({ where: { id } });
  return news;
} 
