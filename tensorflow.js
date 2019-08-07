// npm install @tensorflow/tfjs
const fs = require("fs");
var tf = require('@tensorflow/tfjs');


runTensorFlowAnalysis();
setInterval(runTensorFlowAnalysis, 300000);

function runTensorFlowAnalysis() {
    // TODO: ther eis a bug when loading the json file ... 
    // for some reason the prediction is running multiple times with the same data

    console.log("tensorflow prediction is running...");
    let jsonData = require('./public/assets/data.json');
    // TODO: change the data creation to make it generict if we add a new data source for the model.
    var xdata = [];
    var ydata = [];
    var origin = [];
    var x0 = [];
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
        x0.push(entry[2].articles[0].score);
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
        t0.push(entry[0].dateCreated)
    });

    // console.log(Math.max.apply(Math, x0));
    // console.log(Math.min.apply(Math, x0));

    var dateCreated = 0;
    var CurrentPrice = 0;
    var BuySignal = 0;
    var SellSignal = 0;

    BuySignal = y0.sort()[y0.length - Math.floor((y0.length / 3))];
    SellSignal = y0.sort()[Math.floor((y0.length / 3))];
    CurrentPrice = x1[x1.length - 1] * 1;
    dateCreated = t0[t0.length - 1] * 1;
    console.log(dateCreated);
    // console.log(y0.sort());
    // console.log(SellSignal);
    // console.log(BuySignal);

    jsonData.forEach(function (entry) {
        // console.log(entry[0]);
        // xdata.push(entry[1]);
        // xdata.push(entry[2].articles[0].score);

        xdata.push(
            [
                (entry[2].articles[0].score - Math.min.apply(Math, x0)) / (Math.max.apply(Math, x0) - Math.min.apply(Math, x0) * 0.99999999999),
                (entry[0].currentPriceAsks - Math.min.apply(Math, x1)) / (Math.max.apply(Math, x1) - Math.min.apply(Math, x1) * 0.99999999999),
                (entry[0].currentPriceAsks - entry[0].currentPriceBids - Math.min.apply(Math, x2)) / (Math.max.apply(Math, x2) - Math.min.apply(Math, x2) * 0.99999999999),
                (entry[0].tenMinPriceVariation - Math.min.apply(Math, x3)) / (Math.max.apply(Math, x3) - Math.min.apply(Math, x3) * 0.99999999999),
                (entry[0].currentVolume - Math.min.apply(Math, x4)) / (Math.max.apply(Math, x4) - Math.min.apply(Math, x4) * 0.99999999999),
                (entry[1].hashRate - Math.min.apply(Math, x5)) / (Math.max.apply(Math, x5) - Math.min.apply(Math, x5) * 0.99999999999),
                (entry[1].hashrateVariation - Math.min.apply(Math, x6)) / (Math.max.apply(Math, x6) - Math.min.apply(Math, x6) * 0.99999999999),
                (entry[1].transactionFee - Math.min.apply(Math, x7)) / (Math.max.apply(Math, x7) - Math.min.apply(Math, x7) * 0.99999999999),
                (entry[1].transactionFeeVariation - Math.min.apply(Math, x8)) / (Math.max.apply(Math, x8) - Math.min.apply(Math, x8) * 0.99999999999),
                (entry[1].costPerTransaction - Math.min.apply(Math, x9)) / (Math.max.apply(Math, x9) - Math.min.apply(Math, x9) * 0.99999999999),
                (entry[1].costPerTransactionVariation - Math.min.apply(Math, x10)) / (Math.max.apply(Math, x10) - Math.min.apply(Math, x10) * 0.99999999999)
            ]
        );

        origin.push(
            [
                (entry[2].articles[0].score - Math.min.apply(Math, x0)) / (Math.max.apply(Math, x0) - Math.min.apply(Math, x0) * 0.99999999999),
                (entry[0].currentPriceAsks - Math.min.apply(Math, x1)) / (Math.max.apply(Math, x1) - Math.min.apply(Math, x1) * 0.99999999999),
                (entry[0].currentPriceAsks - entry[0].currentPriceBids - Math.min.apply(Math, x2)) / (Math.max.apply(Math, x2) - Math.min.apply(Math, x2) * 0.99999999999),
                (entry[0].tenMinPriceVariation - Math.min.apply(Math, x3)) / (Math.max.apply(Math, x3) - Math.min.apply(Math, x3) * 0.99999999999),
                (entry[0].currentVolume - Math.min.apply(Math, x4)) / (Math.max.apply(Math, x4) - Math.min.apply(Math, x4) * 0.99999999999),
                (entry[1].hashRate - Math.min.apply(Math, x5)) / (Math.max.apply(Math, x5) - Math.min.apply(Math, x5) * 0.99999999999),
                (entry[1].hashrateVariation - Math.min.apply(Math, x6)) / (Math.max.apply(Math, x6) - Math.min.apply(Math, x6) * 0.99999999999),
                (entry[1].transactionFee - Math.min.apply(Math, x7)) / (Math.max.apply(Math, x7) - Math.min.apply(Math, x7) * 0.99999999999),
                (entry[1].transactionFeeVariation - Math.min.apply(Math, x8)) / (Math.max.apply(Math, x8) - Math.min.apply(Math, x8) * 0.99999999999),
                (entry[1].costPerTransaction - Math.min.apply(Math, x9)) / (Math.max.apply(Math, x9) - Math.min.apply(Math, x9) * 0.99999999999),
                (entry[1].costPerTransactionVariation - Math.min.apply(Math, x10)) / (Math.max.apply(Math, x10) - Math.min.apply(Math, x10) * 0.99999999999)
            ]
        );

        if (entry[0].tenMinPriceVariation >= BuySignal) {
            ydata.push([1, 0, 0]);
            // ydata.push("Buy");
        }
        else if (entry[0].tenMinPriceVariation <= SellSignal) {
            ydata.push([0, 0, 1]);
            // ydata.push("Sell");
        }
        else {
            ydata.push([0, 1, 0]);
            // ydata.push("Hold");
        }

        // fundamentalsTableData.push(buildFundamentalsTable(entry[1]));
        // newsTableData.push(buildNewsTable(entry[2]));
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


    // console.log(xdata[0]);
    // console.log(xdata[xdata.length-1]);
    // console.log(ydata[ydata.length-1]);

    let model;

    // console.log(labelsTensor.print());

    xs = tf.tensor2d(xdata);
    ys = tf.tensor2d(ydata);

    // labelsTensor.dispose();

    console.log(xs.shape);
    // console.log(ys.shape);

    // console.log(xs.print());
    // console.log(ys.print());

    // setting up the model... input >> hidden >> output
    model = tf.sequential();

    let hidden = tf.layers.dense({
        units: 64, //number 1st column of hidden layers
        activation: "sigmoid",
        inputDim: 121 //data that is comming in...
    });

    let inner = tf.layers.dense({
        units: 32, //number 1st column of hidden layers
        activation: "sigmoid",
        inputDim: 64 //data that is comming in...
    });

    let output = tf.layers.dense({
        units: 3,     // data that is comming out...
        activation: "softmax"
    });


    model.add(hidden);
    model.add(inner);
    model.add(output);


    // // we need also an optimizer...
    const learningRate = 0.2;
    const optimization = tf.train.sgd(learningRate);

    // // and then we need to compile the model
    model.compile({
        optimizer: optimization,
        // loss: 'meanSquaredError'
        // this is the entropy - measure of messed things
        loss: 'categoricalCrossentropy'
    })

    // // console.log(model);

    const options = {
        epochs: 1000,
        // validationSplit: 0.1, // If I want to use only 
        // shuffle: true, // If I want to use only 
    }


    trainData();
    async function trainData() {
        model.fit(xs, ys, options).then(function (results) {
            // console.dir(results.history.loss, { 'maxArrayLength': null });
            console.log("start loss: " + results.history.loss[0]);
            console.log("final loss: " + results.history.loss[results.history.loss.length - 1]);
            console.log("trainning is complete");


            // prediction...
            origin = MergeHistoricData(origin, mergedata);

            const xsPredict = tf.tensor2d([
                origin[origin.length - 1]
            ]);

            let ysPredict = model.predict(xsPredict)

            // ysPredict.print();

            PredictResults = {
                BuyProb: Math.round(ysPredict.dataSync()[0] * 1000) * 100 / 1000,
                HoldProb: Math.round(ysPredict.dataSync()[1] * 1000) * 100 / 1000,
                SellProb: Math.round(ysPredict.dataSync()[2] * 1000) * 100 / 1000,
            }




            var AIDecision = Math.max(PredictResults.BuyProb, PredictResults.HoldProb, PredictResults.SellProb);
            PredictResults["dateCreated"] = dateCreated;
            PredictResults["CurrentPrice"] = CurrentPrice;


            if (AIDecision === PredictResults.BuyProb) {
                console.log("It's time to buy");
                PredictResults["AIDecision"] = "Buy";
                PredictResults["SellIfPrice"] = CurrentPrice * (1 + BuySignal);
                PredictResults["BuyIfPrice"] = CurrentPrice;


            }
            else if (AIDecision === PredictResults.HoldProb) {
                console.log("It's time to Hold");
                PredictResults["AIDecision"] = "Hold";
                PredictResults["SellIfPrice"] = CurrentPrice * (1 + BuySignal);
                PredictResults["BuyIfPrice"] = CurrentPrice * (1 + SellSignal);
            }
            else {
                console.log("It's time to Sell");
                PredictResults["AIDecision"] = "Sell";
                PredictResults["SellIfPrice"] = CurrentPrice;
                PredictResults["BuyIfPrice"] = CurrentPrice * (1 + SellSignal);
            }

            console.log(PredictResults);

            fs.readFile("./public/assets/AIDecision.json", function (err, fileData) {
                var json = JSON.parse(fileData);
                json.push(PredictResults);
                var jsonContent = JSON.stringify(json);
                fs.writeFile("./public/assets/AIDecision.json", jsonContent, err => {
                    if (err) throw err;
                    console.log("data written to file");
                });
            });

            // console.log(ysPredict.data().then(function (results) {
            //     console.log(results);
            // }));

        });
    }

    console.log(tf.memory().numTensors);
};
// console.log(xdata[xdata.length-1].length);
// console.log(origin[origin.length - 1].length);



function MergeHistoricData(data, mergecutoff) {
    for (i = 0; i < data.length - mergecutoff; i++) {
        for (j = 0; j < mergecutoff; j++) {
            for (k = 0; k < data[data.length - i - 1 - j - 1].length; k++) {
                data[data.length - i - 1].push(data[data.length - i - 1 - j - 1][k]);
            }
        }
    }
    return data
}