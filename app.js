const express = require("express");
const mongoose = require("mongoose");
const { validationResult, check, checkSchema } = require("express-validator");

const DB_LINK = "mongodb://127.0.0.1:27017/xharktank";

const Pitch = mongoose.model("Pitches", {
  entrepreneur: { type: String },
  pitchTitle: { type: String },
  pitchIdea: { type: String },
  askAmount: { type: Number },
  equity: { type: Number },
  createdAt: { type: Number },
  offers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offers",
    },
  ],
});

const Offer = mongoose.model("Offers", {
  investor: { type: String },
  amount: { type: Number },
  equity: { type: Number },
  comment: { type: String },
});

const app = express();
app.use(express.json());

// complete ho gya
app.post("/pitches/:id/makeOffer", async (req, res) => {
  await check("investor").isString().run(req);
  await check("amount").isFloat().run(req);
  await check("equity").isFloat().run(req);
  await check("comment").isString().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ status: 400, errors: result.array() });
  }

  const { id } = req.params;
  const { investor, amount, equity, comment } = req.body;

  const offer = new Offer({
    investor,
    amount,
    equity,
    comment,
  });

  offer.save();

  Pitch.findByIdAndUpdate({ _id: id }, { $push: { offers: offer.id } })
    .then(() => {
      return res.status(201).json({
        id: offer.id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        status: 404,
        message: "Pitch not found.",
      });
    });
});

// complete ho gya
app.post("/pitches", async (req, res) => {
  await check("entrepreneur").isString().run(req);
  await check("pitchTitle").isString().run(req);
  await check("pitchIdea").isString().run(req);
  await check("askAmount").isFloat().run(req);
  await check("equity").isFloat().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ status: 400, errors: result.array() });
  }

  const { entrepreneur, pitchTitle, pitchIdea, askAmount, equity } = req.body;

  const pitch = new Pitch({
    entrepreneur,
    pitchTitle,
    pitchIdea,
    askAmount,
    equity,
    createdAt: new Date().valueOf(),
  });

  pitch
    .save()
    .then(() => {
      return res.status(201).json({ id: pitch.id });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ status: 400 });
    });
});

app.get("/pitches/:id", (req, res) => {
  const { id } = req.params;
  Pitch.findOne({ _id: id })
    .populate("offers", "-__v")
    .select("-createdAt -__v")
    .then((pitch) => {
      return res.status(200).json(pitch);
    })
    .catch((err) => {
      return res.status(404).json({
        status: 404,
        message: "Pitch not found.",
      });
    });
});

// complete ho gya
app.get("/pitches", (req, res) => {
  Pitch.find()
    .populate("offers", "-__v -_id")
    .sort({ createdAt: -1 })
    .select("-createdAt -__v -_id")
    .then((result) => {
      return res.status(200).json(result);
    });
});

// complete ho gya
app.listen(8081, () => {
  console.log("app started");
  mongoose.connect(DB_LINK).then(function (db) {
    console.log("db connected");
  });
});
