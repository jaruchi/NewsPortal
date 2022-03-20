const req = require("express/lib/request");
const res = require("express/lib/response");
const svc = require("../service/pref");
const { requestHandler } = require("./baseController");

const router = require("express").Router();

const markFavorite = requestHandler(svc.markfav);
const unmarkFavorite = requestHandler(svc.unmarkfav);
const getAllFavorite = requestHandler(svc.getfav);

router.get('/mark/source/:source', markFavorite);
router.get('/unmark/source/:source', unmarkFavorite);

router.get('/like/:likedart', markFavorite);
router.get('/unlike/:likedart', unmarkFavorite);

router.get('/save/:savedart', markFavorite);
router.get('/unsave/:savedart', unmarkFavorite);

router.get('/:email', getAllFavorite);

module.exports = router;