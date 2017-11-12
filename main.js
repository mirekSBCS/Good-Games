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
    //load the text - this works
    var num = 1;
    for (var i in entries){

      var fname = entries[i].first_name;
      var gname = entries[i].game_name;
      var story = entries[i].story;
      var genre = entries[i].genre;
      var likeCount = entries[i].likeCount;

      $('.topPost').append(
      '<br><br> <div class="row"> <div class="col s1 chip" id="name'+ num +'"></div> <div class="col s1 offset-s2 bubble"> <h6 id="genre'+num+'"></h6> </div> </div> <div class="row" class="likebox"> <h6 id="gname'+num+'" class="col s1 gname"></h6> <div class="col s1 offset-s9"> <img src="8bitlove.png" style="width:50px;height:50px;" class="like" id="like'+num+'"> </div> <div class="col s1"> <h6 class="count" id="count'+num+'"></h6> </div> </div> <div class="row"> <div class="col s2.5" id="postimage'+num+'">0</div> <div class="col s8 textu" id="story'+num+'"> <h6></h6> </div> <br>'
      );
      $('#name' + num).empty();
      $('#story' + num).empty();
      $('#gname' + num).empty();
      $('#genre' + num).empty();
      $('#count' + num).empty();

      $('#name' + num).append(fname);
      $('#story' + num).append(story);
      $('#gname' + num).append(gname);
      $('#genre' + num).append(genre);
      $('#count' + num).append(likeCount);

      num++;
    }
    //load the pictures - photos load in random order
    var photonum = 1;
    photoentries = Object.keys(entries);
    for (i = 0; i < photoentries.length; i++){
        postID = photoentries[i];
        console.log(postID); //logs correct postIDs
        firebase.storage().ref().child('Entry/'+postID).getDownloadURL().then(function(url){
        var postimage = '<img src='+url+'alt="Post_Photo" style="width:284px;height:160px;">';
        console.log(url); //URLs in seemingly random order
        $('#postimage' + photonum).empty();
        $('#postimage' + photonum).append(postimage);
        photonum++;
      });
    }
  //activates carousel and like button
  $('.carousel').carousel();
  $('.like').click(add);
  });
}

function add(){
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
