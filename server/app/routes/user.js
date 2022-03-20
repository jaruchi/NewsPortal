const svc = require("../service/user");
const { requestHandler } = require("./baseController");

const router = require("express").Router();

const create = requestHandler(svc.create);
const login = requestHandler(svc.login);
const update = requestHandler(svc.update);

router.patch('/:email', update);
router.post('/login', login);
router.post('/', create);

module.exports = router;