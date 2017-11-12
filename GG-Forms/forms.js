(function(){
  $(document).ready(init);
  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC5hHwlavgY0A6FQQniMwR3oqu3RzvSjmc",
      authDomain: "gg-firebase-88ea4.firebaseapp.com",
      databaseURL: "https://gg-firebase-88ea4.firebaseio.com",
      projectId: "gg-firebase-88ea4",
      storageBucket: "gg-firebase-88ea4.appspot.com",
      messagingSenderId: "948663184798"
    };
 function init() {
   $('select').material_select();
   firebase.initializeApp(config);
   $('#sub').click(saveData);
   loadData();
 }
 function loadData() {
   firebase.database().ref('Entry/').on('value',function(snapshot) {
     var entries = snapshot.val();
     console.log(entries);
     for (var i in entries){
       var fname = entries[i].first_name
       var gname = entries[i].game_name
       var story = entries[i].story
       var genre = entries[i].genre
       $('#entries').append(
         "<h3>"+fname+"</h3>"+
         "<h4>"+gname+"</h4>"+
         "<h4>"+story+"</h4>"

       )
     }
});}

function saveData() {
var fname = $('#first_name').val();
var gname = $('#game_name').val();
var story = $('#story').val();
var genre = $('#genre').val();
var entry = {
  first_name : fname,
  game_name : gname,
  story : story,
  genre : genre
}


var newentrykey = firebase.database().ref().child('Entry').push().key;
var updates ={};
updates['/Entry/' + newentrykey] = entry;
firebase.database().ref().update(updates);
firebase.storage().ref().child('Entry/'+ newentrykey).put($('#srcshot')[0].files[0]);
console.log(entry);



}
})();
