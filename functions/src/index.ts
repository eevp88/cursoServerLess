import {setGlobalOptions} from "firebase-functions/v2";
import {onRequest} from "firebase-functions/v2/https";

// import * as logger from "firebase-functions/logger";

import express from "express";
import cors from "cors";

import {conectarDB} from "./db";
import {petsModel} from "./pets";

setGlobalOptions({maxInstances: 10});
export const app = express();
app.use(express.json());
app.use(cors({origin: true}));

let pets: ReturnType<typeof petsModel> | undefined;

const initPetsModel = async () => {
  if (!pets) {
    const conn = await conectarDB();
    pets = petsModel(conn);
  }
  // return pets;
};

app.get("/pets", async (req, res) => {
  try {
    await initPetsModel();
    const result = await pets?.find().exec();
    res.status(200).send(result);
  } catch (_err) {
    console.error("Error fetching pets:", _err);
    res.status(500).send({error: "Failed to fetch pets"});
  }
});

app.post("/pets", async (req, res) => {
  try {
    const {body} = req;
    const newPet = await pets?.create(body);
    await newPet?.save();
    res.sendStatus(201);
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).send({error: "Failed to create pet"});
  }
});

app.get("/pets/:id/daralta", async (req, res) => {
  try {
    const id = req.params.id;
    await pets?.deleteOne({_id: id});
    res.sendStatus(204);
  } catch (error) {
    console.error("Error fetching pet by ID:", error);
    res.status(500).send({error: "Failed to fetch pet by ID"});
  }
});

export const api = onRequest(app);
