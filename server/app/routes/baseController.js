
exports.requestHandler = (cb) => {
    async function retVal(req, res) {
        try {
            let ret = await cb(req.params, req.query, req.body);
            res.json(ret)
        }
        catch (ex) {
            res.status(500).json({
                message:
                    ex.message || "Unknown error"

            })
        }
    }
    return retVal;
}