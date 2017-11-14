(function(){
  $(document).ready(initialize);

  // Initialize Firebase
 var config = {
   apiKey: "AIzaSyC5hHwlavgY0A6FQQniMwR3oqu3RzvSjmc",
   authDomain: "gg-firebase-88ea4.firebaseapp.com",
   databaseURL: "https://gg-firebase-88ea4.firebaseio.com",
   projectId: "gg-firebase-88ea4",
   storageBucket: "gg-firebase-88ea4.appspot.com",
   messagingSenderId: "948663184798"
 };

function initialize(){
firebase.initializeApp(config);
loadData();
}

function loadData() {
  firebase.database().ref('Entry/').on('value',function(snapshot) {
    var entries = snapshot.val();
    //Load the text - this works
    for(var i in entries){
      var scopeWrapper = function (_i) {
        firebase.storage().ref().child('Entry/'+_i).getDownloadURL().then(function(url){
          var fname = entries[_i].first_name;
          var gname = entries[_i].game_name;
          var story = entries[_i].story;
          var genre = entries[_i].genre;
          var likeCount = entries[_i].likeCount;

          $('body').append(
            '<br>'+
            '<div class="coloures">'+
              '<br>'+
              '<div class="row">'+
                '<div class="col s1 chip" class="name">'+fname+'</div>'+
                '<div class="col s1 offset-s2 bubble">'+
                  '<h6 class="genre">'+genre+'</h6>'+
                '</div>'+
              '</div>'+
              '<div class="row" class="likebox">'+
                '<h6 class="gname" class="col s1 gname">'+gname+'</h6>'+
                '<div class="col s1 offset-s9">'+
                  '<img src="8bitlove.png" style="width:50px;height:50px;" class="like" class="like">'+likeCount+
                '</div>'+
                '<div class="col s1"> <h6 class="count" class="count"></h6></div>'+
              '</div>'+
              '<div class="row">'+
                '<div class="col s2.5 postimage"><img class="gameImage" src="'+url+'" style="width:284px;height:160px;"></div>'+
                '<div class="col s8 textu" class="story"><h6>'+story+'</h6></div>'+
              '</div>'+
              '<br>'+
            '</div>'
          );
        }).catch(function(error){
          console.log(error)
        });
      };
      scopeWrapper(i);
    }
  $('.like').click(add);
  });
}

function add(){
  console.log("click");
  var id = $(this).attr('id').replace(/like/,'');
  var likeCount = $("#count"+id).html();
  likeCount = parseInt(likeCount);

  var obj = $("#count" + id);
  if( obj.data('liked') ){
      obj.data('liked', false);
      likeCount = likeCount - 1;
  }
  else{
      obj.data('liked', true);
      likeCount = likeCount + 1;
  }
  $("#count"+id).empty();
  $("#count"+id).append(likeCount);
}


})();
