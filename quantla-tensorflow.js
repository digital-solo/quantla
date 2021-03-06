// npm install @tensorflow/tfjs
const fs = require("fs");
var tf = require("@tensorflow/tfjs");

require("./controller/controller.js")();

var Controller = require("./controller/tensorController.js");
var runCount = 0;

setTimeout(function () {
  var controller = new Controller();
  controller.getData.then(function (result) {
    runTensorFlowAnalysis(result);
  });
}, 10000);

// // this timeout was added to avoid quantla to save data after tensorflow analysis.
setTimeout(function () {
  setInterval(function () {
    var controller = new Controller();
    controller.getData.then(function (result) {
      runTensorFlowAnalysis(result);
    });
  }, 300000);
}, 10000);

var model;
var xs;
var ys;
var xsPredict;
var ysPredict;
var inner;
var hidden;
var output;

function runTensorFlowAnalysis(dataLoad) {
  console.log("tensorflow prediction is running...");
  console.log("Tensors memory check: " + tf.memory().numTensors);

  var jsonData = JSON.parse(dataLoad);
  // console.log(jsonData[jsonData.length - 1]);
  //console.log(jsonData);

  // TODO: change the data creation to make it generict if we add a new data source for the model.
  var xdata = [];
  var ydata = [];
  var origin = [];
  var x01 = [];
  var x02 = [];
  var x03 = [];
  var x1 = [];
  var x2 = [];
  var x3 = [];
  var x4 = [];
  var x5 = [];
  var x6 = [];
  var x7 = [];
  var x8 = [];
  var x9 = [];
  var x10 = [];
  var y0 = [];
  var t0 = [];

  jsonData.forEach(function (entry) {
    //console.log(entry[2].articles[0].score);
    x01.push(entry[2].documentScore);
    x02.push(entry[2].bitcoinScore);
    x03.push(entry[2].btcScore);
    x1.push(entry[0].currentPriceAsks);
    x2.push(entry[0].currentPriceAsks - entry[0].currentPriceBids);
    x3.push(entry[0].tenMinPriceVariation);
    x4.push(entry[0].currentVolume);
    x5.push(entry[1].hashRate);
    x6.push(entry[1].hashrateVariation);
    x7.push(entry[1].transactionFee);
    x8.push(entry[1].transactionFeeVariation);
    x9.push(entry[1].costPerTransaction);
    x10.push(entry[1].costPerTransactionVariation);
    y0.push(entry[0].tenMinPriceVariation);
    t0.push(entry[0].dateCreated);
  });

  // console.log(Math.max.apply(Math, x0));
  // console.log(Math.min.apply(Math, x0));

  var dateCreated1 = 0;
  var CurrentPrice = 0;
  var BuySignal = 0;
  var SellSignal = 0;
  var BuySignalPredict = 0;
  var SellSignalPredict = 0;

  BuySignal = y0.sort()[y0.length - Math.floor(y0.length / 3)];
  SellSignal = y0.sort()[Math.floor(y0.length / 3)];

  console.log("BuySignal: ", BuySignal);
  console.log("SellSignal: ", SellSignal);

  // TODO: a better way to find out the Buy and Sell predict line would be to look 
  // at the market depth order book and see large BTC walls in there.
  // for now, this hardcode above combining Buy and Sell signal and limiting it to at least +/- 0.01/3 is fine...
  BuySignalPredict = Math.max(BuySignal, Math.abs(SellSignal), 0.01 / 3);
  SellSignalPredict = Math.min(SellSignal, -Math.abs(BuySignal), -0.01 / 3);

  console.log("BuySignalPredict: ", BuySignalPredict);
  console.log("SellSignalPredict: ", SellSignalPredict);

  CurrentPrice = x1[x1.length - 1] * 1;
  dateCreated1 = t0[t0.length - 1] * 1;
  console.log("tensorflow date created: ", dateCreated1);
  // console.log(tf.memory().numTensors);
  // console.log(y0.sort());
  // console.log(SellSignal);
  // console.log(BuySignal);

  jsonData.forEach(function (entry) {
    // console.log(entry[0]);
    // xdata.push(entry[1]);
    // xdata.push(entry[2].articles[0].score);

    xdata.push([
      (entry[2].documentScore - Math.min.apply(Math, x01)) /
      (Math.max.apply(Math, x01) - Math.min.apply(Math, x01) * 0.99999999999),
      (entry[2].bitcoinScore - Math.min.apply(Math, x02)) /
      (Math.max.apply(Math, x02) - Math.min.apply(Math, x02) * 0.99999999999),
      (entry[2].btcScore - Math.min.apply(Math, x03)) /
      (Math.max.apply(Math, x03) - Math.min.apply(Math, x03) * 0.99999999999),
      (entry[0].currentPriceAsks - Math.min.apply(Math, x1)) /
      (Math.max.apply(Math, x1) - Math.min.apply(Math, x1) * 0.99999999999),
      (entry[0].currentPriceAsks -
        entry[0].currentPriceBids -
        Math.min.apply(Math, x2)) /
      (Math.max.apply(Math, x2) - Math.min.apply(Math, x2) * 0.99999999999),
      (entry[0].tenMinPriceVariation - Math.min.apply(Math, x3)) /
      (Math.max.apply(Math, x3) - Math.min.apply(Math, x3) * 0.99999999999),
      (entry[0].currentVolume - Math.min.apply(Math, x4)) /
      (Math.max.apply(Math, x4) - Math.min.apply(Math, x4) * 0.99999999999),
      (entry[1].hashRate - Math.min.apply(Math, x5)) /
      (Math.max.apply(Math, x5) - Math.min.apply(Math, x5) * 0.99999999999),
      (entry[1].hashrateVariation - Math.min.apply(Math, x6)) /
      (Math.max.apply(Math, x6) - Math.min.apply(Math, x6) * 0.99999999999),
      (entry[1].transactionFee - Math.min.apply(Math, x7)) /
      (Math.max.apply(Math, x7) - Math.min.apply(Math, x7) * 0.99999999999),
      (entry[1].transactionFeeVariation - Math.min.apply(Math, x8)) /
      (Math.max.apply(Math, x8) - Math.min.apply(Math, x8) * 0.99999999999),
      (entry[1].costPerTransaction - Math.min.apply(Math, x9)) /
      (Math.max.apply(Math, x9) - Math.min.apply(Math, x9) * 0.99999999999),
      (entry[1].costPerTransactionVariation - Math.min.apply(Math, x10)) /
      (Math.max.apply(Math, x10) - Math.min.apply(Math, x10) * 0.99999999999)
    ]);

    origin.push([
      (entry[2].documentScore - Math.min.apply(Math, x01)) /
      (Math.max.apply(Math, x01) - Math.min.apply(Math, x01) * 0.99999999999),
      (entry[2].bitcoinScore - Math.min.apply(Math, x02)) /
      (Math.max.apply(Math, x02) - Math.min.apply(Math, x02) * 0.99999999999),
      (entry[2].btcScore - Math.min.apply(Math, x03)) /
      (Math.max.apply(Math, x03) - Math.min.apply(Math, x03) * 0.99999999999),
      (entry[0].currentPriceAsks - Math.min.apply(Math, x1)) /
      (Math.max.apply(Math, x1) - Math.min.apply(Math, x1) * 0.99999999999),
      (entry[0].currentPriceAsks -
        entry[0].currentPriceBids -
        Math.min.apply(Math, x2)) /
      (Math.max.apply(Math, x2) - Math.min.apply(Math, x2) * 0.99999999999),
      (entry[0].tenMinPriceVariation - Math.min.apply(Math, x3)) /
      (Math.max.apply(Math, x3) - Math.min.apply(Math, x3) * 0.99999999999),
      (entry[0].currentVolume - Math.min.apply(Math, x4)) /
      (Math.max.apply(Math, x4) - Math.min.apply(Math, x4) * 0.99999999999),
      (entry[1].hashRate - Math.min.apply(Math, x5)) /
      (Math.max.apply(Math, x5) - Math.min.apply(Math, x5) * 0.99999999999),
      (entry[1].hashrateVariation - Math.min.apply(Math, x6)) /
      (Math.max.apply(Math, x6) - Math.min.apply(Math, x6) * 0.99999999999),
      (entry[1].transactionFee - Math.min.apply(Math, x7)) /
      (Math.max.apply(Math, x7) - Math.min.apply(Math, x7) * 0.99999999999),
      (entry[1].transactionFeeVariation - Math.min.apply(Math, x8)) /
      (Math.max.apply(Math, x8) - Math.min.apply(Math, x8) * 0.99999999999),
      (entry[1].costPerTransaction - Math.min.apply(Math, x9)) /
      (Math.max.apply(Math, x9) - Math.min.apply(Math, x9) * 0.99999999999),
      (entry[1].costPerTransactionVariation - Math.min.apply(Math, x10)) /
      (Math.max.apply(Math, x10) - Math.min.apply(Math, x10) * 0.99999999999)
    ]);

    if (entry[0].tenMinPriceVariation >= BuySignal) {
      ydata.push([1, 0, 0]);
      // ydata.push("Buy");
    } else if (entry[0].tenMinPriceVariation <= SellSignal) {
      ydata.push([0, 0, 1]);
      // ydata.push("Sell");
    } else {
      ydata.push([0, 1, 0]);
      // ydata.push("Hold");
    }
  });

  // shift remove beginning
  ydata.shift();
  ydata.shift();

  // pop remove final
  xdata.pop();
  xdata.pop();

  // console.log(xdata[xdata.length - 1]);
  // xdata[xdata.length - 0 - 1].push(200);
  // xdata[xdata.length - 0 - 1].push(200);

  var mergedata = 10;

  xdata = MergeHistoricData(xdata, mergedata);

  // console.log(xdata[xdata.length - 1].length);

  for (i = 0; i < mergedata; i++) {
    ydata.shift();
    xdata.shift();
  }
  if (runCount === 0) {
    console.log("initial training");
    trainData(xdata, ydata);
  }

  // prediction...
  origin = MergeHistoricData(origin, mergedata);
  // console.log("model", model);

  xsPredict = tf.tensor2d([origin[origin.length - 1]]);
  //console.log("xspredict", xsPredict);
  //console.log("model", model);

  ysPredict = model.predict(xsPredict);

  var PredictResults = [];

  PredictResults = {
    BuyProb: (Math.round(ysPredict.dataSync()[0] * 1000) * 100) / 1000,
    HoldProb: (Math.round(ysPredict.dataSync()[1] * 1000) * 100) / 1000,
    SellProb: (Math.round(ysPredict.dataSync()[2] * 1000) * 100) / 1000
  };

  var AIDecision = Math.max(
    PredictResults.BuyProb,
    PredictResults.HoldProb,
    PredictResults.SellProb
  );
  PredictResults["dateCreated"] = dateCreated1;
  PredictResults["CurrentPrice"] = CurrentPrice;

  if (AIDecision === PredictResults.BuyProb) {

    console.log("It's time to buy");
    PredictResults["AIDecision"] = "Buy";
    PredictResults["SellIfPrice"] = CurrentPrice * (1 + BuySignalPredict);
    PredictResults["BuyIfPrice"] = CurrentPrice;

  } else if (AIDecision === PredictResults.HoldProb) {

    console.log("It's time to Hold");
    PredictResults["AIDecision"] = "Hold";
    PredictResults["SellIfPrice"] = CurrentPrice * (1 + BuySignalPredict);
    PredictResults["BuyIfPrice"] = CurrentPrice * (1 + SellSignalPredict);

  } else {

    console.log("It's time to Sell");
    PredictResults["AIDecision"] = "Sell";
    PredictResults["SellIfPrice"] = CurrentPrice;
    PredictResults["BuyIfPrice"] = CurrentPrice * (1 + SellSignalPredict);

  }

  console.log("PredictResults SellIfPrice:", PredictResults["SellIfPrice"]);
  console.log("PredictResults BuyIfPrice:", PredictResults["BuyIfPrice"]);

  console.log(PredictResults);

  addDecisionsToDB(PredictResults);

  console.log("Run Count ", runCount);

  tf.dispose(xsPredict);
  tf.dispose(ysPredict);

  if (runCount % 12 === 0 && runCount != 0) {
    //Remove tensors first, then
    console.log("disposing tensors...");
    tf.dispose(xs);
    tf.dispose(ys);
    tf.dispose(inner);
    tf.dispose(hidden);
    tf.dispose(output);
    tf.dispose(model);
    //tf.disposeVariables();

    console.log("training the model");
    //Train the modle
    trainData(xdata, ydata);
  }
  console.log();

  runCount += 1;
}

function trainData(xdt, ydt) {
  xs = tf.tensor2d(xdt);
  ys = tf.tensor2d(ydt);

  //console.log(xs.shape);

  model = tf.sequential();

  hidden = tf.layers.dense({
    units: 64, //number 1st column of hidden layers
    activation: "sigmoid",
    inputDim: 143 //data that is comming in...
  });

  inner = tf.layers.dense({
    units: 32, //number 1st column of hidden layers
    activation: "sigmoid",
    inputDim: 64 //data that is comming in...
  });

  output = tf.layers.dense({
    units: 3, // data that is comming out...
    activation: "softmax"
  });

  // console.log(tf.memory().numTensors); // 2

  model.add(hidden);
  model.add(inner);
  model.add(output);

  // console.log(tf.memory().numTensors); // 8

  // // we need also an optimizer...
  const learningRate = 0.2;
  const optimization = tf.train.sgd(learningRate);

  // console.log(tf.memory().numTensors); // 9

  // // and then we need to compile the model
  model.compile({
    optimizer: optimization,
    // loss: 'meanSquaredError'
    // this is the entropy - measure of messed things
    loss: "categoricalCrossentropy"
  });

  // // console.log(model);

  const options = {
    epochs: 1000
    // validationSplit: 0.1, // If I want to use only
    // shuffle: true, // If I want to use only
  };

  model.fit(xs, ys, options).then(function (results) {
    // console.dir(results.history.loss, { 'maxArrayLength': null });

    console.log("start loss: " + results.history.loss[0]);
    console.log(
      "final loss: " + results.history.loss[results.history.loss.length - 1]
    );
    console.log("trainning is complete");

    // tf.dispose(model);

    // ysPredict.print();
  });
  // console.log('numTensors (out tidy): ' + tf.memory().numTensors);
}

function MergeHistoricData(data, mergecutoff) {
  for (i = 0; i < data.length - mergecutoff; i++) {
    for (j = 0; j < mergecutoff; j++) {
      for (k = 0; k < data[data.length - i - 1 - j - 1].length; k++) {
        data[data.length - i - 1].push(data[data.length - i - 1 - j - 1][k]);
      }
    }
  }
  return data;
}
