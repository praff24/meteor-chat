ChatRooms = new Meteor.Collection("chatrooms");
Meteor.subscribe('chatrooms');
Meteor.subscribe("onlusers");

Accounts.ui.config({
   passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Tracker.autorun(function(){
    Meteor.subscribe("chatrooms");
    Meteor.subscribe("onlusers");
});

Template.sidebar.helpers({
    'onlusr':function(){
        return Meteor.users.find({ "status.online": true , _id: {$ne: Meteor.userId()} });
    }
});

Template.sidebar.events({
    'click .user':function(){
        document.getElementById("boxofmessages").style.display = "block";
        Session.set('currentId',this._id);
        var res=ChatRooms.findOne({chatIds:{$all:[this._id,Meteor.userId()]}});
        if(res)
        {
            //already room exists
            Session.set("roomid",res._id);
        }
        else{
            //no room exists
            var newRoom= ChatRooms.insert({chatIds:[this._id , Meteor.userId()],messages:[]});
            Session.set('roomid',newRoom);
        }
    }
});

Template.messages.helpers({
    'msgs':function(){
        var result=ChatRooms.findOne({_id:Session.get('roomid')});
        if(result){
          return result.messages;
        }
    }
});

Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) {
        if (Meteor.user())
        {
              var name = Meteor.user().username;
              var message = document.getElementById('message');

              if (message.value !== '') {
              var res1= /\d/ ;
              var ans1 = res1.test(message.value);
              var res2 = /\d+\s?(?=rs|kg)/;
              var ans2 = res2.test(message.value);
              if(ans2){
                var de=ChatRooms.update({"_id":Session.get("roomid")},{$push:{messages:{
                 name: name,
                 text: message.value,
                 createdAt: Date.now()
                }}});
              }

              else
                if(ans1){
              alert("hidden");}

              else{
                var de=ChatRooms.update({"_id":Session.get("roomid")},{$push:{messages:{
                 name: name,
                 text: message.value,
                 createdAt: Date.now()
                }}});
                document.getElementById('message').value = '';
                message.value = '';}
              }
        }
        else
        {
           alert("login to chat");
        }

    }
  }
}
// Template.messages.events={
// "click .delete-task":function(event){
//   if(confirm('Delete Task?')){
//     Meteor.call('deleteTask',this._id);
//   }
// }
// }


Template.minimize.events={
  "click .minimizebutton" : function(event){
    var e = document.getElementById("boxofmessages");
    if(e.style.display=="block")
      e.style.display="none";
    else {
      e.style.display="block";
    }
  },
  "click .offerbutton" : function(event){
    var o= document.getElementById("offerpopup");
    if(o.style.display=="none")
      o.style.display ="block";
    else{
      o.style.display="none";
    }
  },
  "change #slider1" : function(event) {
    var e = document.getElementById("slider1").value;
    document.getElementById("sliderresult1").value = e;
  },
  "change #slider2" : function(event) {
    var e = document.getElementById("slider2").value;
    document.getElementById("sliderresult2").value = e;
  },
  "click .pushmessage" : function(event) {
    var quant = document.getElementById("slider1").value + " kg";
    var name = Meteor.user().username;
    var de=ChatRooms.update({"_id":Session.get("roomid")},{$push:{messages:{
     name: name,
     text: quant,
     createdAt: Date.now()
    }}})
    var price = "Rs " + document.getElementById("slider2").value;
    var de=ChatRooms.update({"_id":Session.get("roomid")},{$push:{messages:{
     name: name,
     text: price,
     createdAt: Date.now()
    }}})
    document.getElementById("offerpopup").style.display = "none";
  },
  "click .clearchat" : function(event) {
    Session.set('currentId',this._id);
    if(confirm('Delete Task?')){
    Meteor.call('clearchat', Meteor.userId());
    }
  }
}
