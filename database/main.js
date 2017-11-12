  (function(){

    $(document).ready(init);
    var config = {
        apiKey: "AIzaSyD6szqFi-qwVL-11b7xsGkxmeUHCXmXxCY",
        authDomain: "pizza-8ca28.firebaseapp.com",
        databaseURL: "https://pizza-8ca28.firebaseio.com",
        projectId: "pizza-8ca28",
        storageBucket: "",
        messagingSenderId: "461425861339"
      };
  function init(){
    firebase.initializeApp(config);
    $('#submitButton').click(saveData);
    loadData();
  }

function loadData(){
  firebase.database().ref('Entry/').on('value' ,function(snapshot){
    var entries = snapshot.val();

    for(var i in entries){

    var first = entries[i].first;
    var last = entries [i].last;
    var email = entries [i].email;
    $('#entries').append(
      "<h3>"+first+"</h3>"+
      "<h4>"+last+"</h4>"+
      "<h4>"+email+"</h4>"
   )
}

  });
}


  function saveData(){
  var first = $('#first').val();
  var last = $('#last').val();
  var email = $('#email').val();

  var entry = {
    first : first,
     last : last,
    email : email,
  }


var newEntryKey = firebase.database().ref().child('Entry').push().key;
var updates = {};
updates['/Entry' + newEntryKey] = entry;
firebase.database().ref().update(updates)


  console.log(first);
}

})();
