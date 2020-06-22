const express = require("express");
let router = express.Router();
let chirpStore = require("../chirpstore");

router.get("/:id?", (req, res) => {
  let id = req.params.id;
  if (id) {
    res.json(chirpStore.GetChirp(id));
  } else {
    res.send(chirpStore.GetChirps());
  }
});

router.post("/", (req, res) => {
  chirpStore.CreateChirp(req.body);
  res.send("created");
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  chirpStore.UpdateChirp(id, req.body);
  res.send("updated");
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  chirpStore.DeleteChirp(id);
  res.send("deleted");
});

module.exports = router;
