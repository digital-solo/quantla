var userID;
//Get the user id of the current user
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    userID = user.uid;
    console.log("User id: " + userID);
    console.log("User email: " + user.email);
    //buildShoppingList();
  } else {
    console.log("no one is signed in");
    (self.location.href = "invite.html"), event.preventDefault();
  }
});
grabproposedtradedata();

setInterval(function () {
  grabproposedtradedata();
  console.log("test");
}, 30000);

function grabproposedtradedata() {

  $.getJSON("./assets/AIDecision.json", function (fileData) {
    // console.log(fileData[fileData.length - 1]);
    // console.log(fileData[fileData.length - 1].CurrentPrice);
    // console.log(fileData[fileData.length - 1].AIDecision);

    $('#curr_price').text(
      (Math.round(fileData[fileData.length - 1].CurrentPrice * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    );

    $('#bif_price').text(
      (Math.round(fileData[fileData.length - 1].BuyIfPrice * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    );
    $('#sif_price').text(
      (Math.round(fileData[fileData.length - 1].SellIfPrice * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    );

    $('#indication').text(fileData[fileData.length - 1].AIDecision);

    if (fileData[fileData.length - 1].AIDecision == "Buy") {
      $("#indication_img").attr('class', 'fas fa-arrow-circle-up');
      $("#indication_img").css("color", "greenyellow");
      $("#indication").css("color", "greenyellow");
    }
    else if (fileData[fileData.length - 1].AIDecision == "Sell") {
      $("#indication_img").attr('class', 'fas fa-arrow-circle-down');
      $("#indication_img").css("color", "red");
      $("#indication").css("color", "red");
    }
    else {
      $("#indication_img").attr('class', 'fas fa-exchange-alt');
      $("#indication_img").css("color", "yellow");
      $("#indication").css("color", "yellow");
    }

  });
}