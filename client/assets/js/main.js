(function() {
  // get the input dates
  var createdates = document.getElementsByClassName("create-date");

  var sentdates = document.getElementsByClassName("sent-date");

  for (let i = 0, to = createdates.length; i < to; i++) {
    var Date = moment(createdates[i].innerHTML, "MMMM D, YYYY");
    createdates[i].innerHTML = Date.format("YYYY-M-D");
  }
})();
