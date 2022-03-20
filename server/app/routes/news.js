const svc = require("../service/news");
const { requestHandler } = require("./baseController");

const router = require("express").Router();

const getAll = requestHandler(svc.getAll);
const get = requestHandler(svc.get);
const destroy = requestHandler(svc.destroy);
const create = requestHandler(svc.create);
const update = requestHandler(svc.update);

router.get('/', getAll);

router.get('/:id', get);

router.delete('/:id', destroy);

router.patch('/:id', update);

router.post('/', create);

module.exports = router;