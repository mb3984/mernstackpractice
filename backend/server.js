require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const todoModel = require("../backend/models/todoModel");
const app = express();
const PORT = process.env.PORT;

const mongo_uri = process.env.mongo_conn;
app.use(express.json());
app.use(cors());

mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("mognodb connected succesfully");
  })
  .catch((error) => {
    console.log("connection error");
  });

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

//post todo
app.post("/save/todo", async (req, res) => {
  const { text } = req.body;
  todoModel.create({ text }).then((data) => {
    res.status(200).send("todo created succesfully");
    console.log("todo created succesfully");
    console.log(data);
  });
});

//update todo
app.put("/update/todo", async (request, response) => {
  const { _id, text } = request.body;
  todoModel
    .findByIdAndUpdate(_id, { text })
    .then(() => {
      response.status(200).send("Todo updated succesfully");
      console.log("Todo updated succesfully");
      console.log(_id, text);
    })
    .catch((error) => {
      console.log(error);
    });
});

//Get todo
app.get("/get/todos", async (request, response) => {
  const todos = await todoModel.find();
  response.status(200).send(todos);
  console.log("Todos retrieved succesfully");
  console.log(todos);
});

//delete todo
app.delete("/delete/:id", async (request, response) => {
  const { id } = request.params;
  todoModel.findByIdAndDelete(id).then(() => {
    response.status(200).send("todo deleted succesfully");
    console.log("deleted succesfully");
    console.log(id);
  });
});
