grabtabulatordata();
setInterval(function() {
  grabtabulatordata();
  console.log("test");
}, 30000);

function grabtabulatordata() {
  var TradeData = [];
  var newsTableData = [];
  var pricesTableData = [];
  var fundamentalsTableData = [];

  $.getJSON("./assets/AIDecision.json", function(json) {
    //console.log(json); // this will show the info it in firebug console
    json.forEach(function(entry) {
      console.log(entry[0]);

      TradeData.push(buildDecisionTable(entry));
    });

    createTable(
      "#trade-table",
      orderTable(TradeData).slice(0, 30),
      TradeConfigData
    );
  });

  $.getJSON("/assets/data.json", function(json) {
    //console.log(json); // this will show the info it in firebug console
    json.forEach(function(entry) {
      // console.log(entry[0]);

      pricesTableData.push(buildPriceTable(entry[0]));
      fundamentalsTableData.push(buildFundamentalsTable(entry[1]));
      newsTableData.push(buildNewsTable(entry[2]));
    });

    createTable(
      "#prices-table",
      orderTable(pricesTableData).slice(0, 30),
      PricesConfigData
    );
    createTable(
      "#fund-table",
      orderTable(fundamentalsTableData).slice(0, 30),
      FundConfigData
    );
    createTable(
      "#news-table",
      orderTable(newsTableData).slice(0, 30),
      NewsConfigData
    );
  });
}

function orderTable(data) {
  var ordered = [];
  for (i = 0; i < data.length; i++) {
    ordered[i] = data[data.length - 1 - i];
  }
  return ordered;
}

function buildPriceTable(price) {
  // console.log(price);
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(price.dateCreated));
  var pricesTableRow = {
    time: d,
    currPrice: price.currentPriceAsks,
    Spread: price.currentPriceAsks - price.currentPriceBids,
    "10PriceVar": Math.round(price.tenMinPriceVariation * 10000) / 10000,
    volume: price.currentVolume
  };

  return pricesTableRow;
}

function buildDecisionTable(AIdata) {
  // console.log(price);
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(AIdata.dateCreated * 1));
  var AITableRow = {
    time: d,
    currprice: AIdata.CurrentPrice,
    indication: AIdata.AIDecision,
    BPrice: AIdata.BuyIfPrice,
    SPrice: AIdata.SellIfPrice
  };

  return AITableRow;
}

function buildFundamentalsTable(fundamental) {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(fundamental.dateCreated));

  var fundamentalsTableRow = {
    time: d,
    hash: fundamental.hashRate,
    hashVar: Math.round(fundamental.hashrateVariation * 10000) / 10000,
    trans: fundamental.transactionFee,
    transVar: Math.round(fundamental.transactionFeeVariation * 10000) / 10000,
    costT: fundamental.costPerTransaction,
    costTVar:
      Math.round(fundamental.costPerTransactionVariation * 10000) / 10000
  };
  return fundamentalsTableRow;
}

function buildNewsTable(news) {
  // console.log(news);
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(parseInt(news.dateCreated));
  var bitcoinScore = news.bitcoinScore;
  news;
  var newsTableRow = {
    time: d,
    "doc-score": news.documentScore,
    "bitcoin-score": news.bitcoinScore,
    "btc-score": news.btcScore
  };
  return newsTableRow;
}

// $.get("api/news", function(data) {
//   var newsTableData = [];
//   var articles = data[0].articles;

//   articles.forEach(function(article) {
//     var newsTableRow = {
//       time: article.date,
//       "news title": article.title,
//       link: article.url,
//       "score-link": article.score
//     };
//     newsTableData.push(newsTableRow);
//   });
//   createTable("#news-table", newsTableData, NewsConfigData);
// });

// $.get("api/prices", function(data) {
//   var pricesTableData = [];
//   var prices = data;

//   prices.forEach(function(price) {
//     console.log(price.currentPrice);
//     var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
//     d.setUTCSeconds(parseInt(price.timestamp));

//     var pricesTableRow = {
//       time: d,
//       currPrice: price.currentPrice,
//       PriceVar: "~",
//       "10PriceVar": price.tenMinPriceVariation
//     };
//     pricesTableData.push(pricesTableRow);
//   });
//   createTable("#prices-table", pricesTableData, PricesConfigData);
// });

// $.get("api/fundamentals", function(data) {
//   var fundamentalsTableData = [];
//   var fundamentals = data;

//   fundamentals.forEach(function(fundamental) {
//     var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
//     d.setUTCSeconds(parseInt(fundamental.timestamp));

//     var fundamentalsTableRow = {
//       time: d,
//       hash: fundamental.hashrate,
//       hashVar: fundamental.hashrateVariation,
//       trans: fundamental.transactionFee,
//       transVar: fundamental.transactionFeeVariation,
//       costT: fundamental.costPerTransaction,
//       costTVar: fundamental.costPerTransactionVariation
//     };
//     fundamentalsTableData.push(fundamentalsTableRow);
//   });
//   createTable("#fund-table", fundamentalsTableData, FundConfigData);
// });

function createTable(tableName, tableData, configData) {
  var table = new Tabulator(tableName, {
    height: 0,
    tooltips: true,
    responsiveLayout: "hide",
    movableRows: false,
    resizableColumns: false,
    persistentSort: false,
    layout: "fitColumns",
    columns: configData
  });

  table.setData(tableData);
}

//generate box plot
