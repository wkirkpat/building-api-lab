const express = require("express");
let router = express.Router();
let chirpStore = require("../chirpstore")

router.get("/", (req, res) => {
    res.send(chirpStore.GetChirps());
});

router.post("/", (req, res) => {
    let chirp = JSON.stringify({ name: req.body.name, text: req.body.text});
    chirpStore.CreateChirp(chirp);
    res.send("Success!")
});

router.put("/" , (req, res) => {
    let id = req.body.id;
    let chirp = JSON.stringify({ name: req.body.name, text: req.body.text});
    chirpStore.UpdateChirp(id, chirp);
    res.send(id)
});

router.delete("/", (req, res) => {
    let id = JSON.stringify(req.body.id);
    chirpStore.DeleteChirp(id);
    res.send("deleted")
});

module.exports = router;