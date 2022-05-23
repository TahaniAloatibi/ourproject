const express = require("express");
const app = express();
var FastText = require("node-fasttext");
const cors = require("cors");

// const data = [
//   {
//     text: "tea",
//     label: " __label__dehydrating Make lemon balm tea",
//     value: "1.953126549381068-8",
//   },
//   { text: "tea", label: " __label__food-safety", value: "1.953126549381068-8" },
//   {
//     text: "tea",
//     label: "__label__tea Why is my green tea foaming too?",
//     value: "1.953126549381068-8",
//   },
// ];

let config = {
  dim: 100,
  input: "train.txt",
  output: "model",
};

FastText.train("supervised", config, function (success, error) {
  if (error) {
    console.log(error);
    return;
  }

  console.log(success);
});

app.use(cors());

app.get("/", (req, res) => {
  res.sendfile("index.html");
});

app.get("/fasttext/", function (req, res) {
  var statement = req.param("statement");
  res.send(getFastTextResults(statement));
});

function getFastTextResults(statement) {
  let labels = null;
  // predict returns an array with the input and predictions for best cateogires
  FastText.predict("model.bin", 3, [statement], function (success, error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log(success);
    labels = success;
    //   document.getElementById("labels").insertAdjacentText("beforeend", labels);
  });
  labels = data;
  // document.getElementById("labels").insertAdjacentText("beforeend", labels);
  return labels;
}

app.listen(8000, () => {
  console.log("Listening on port 8000!");
});
