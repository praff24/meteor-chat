

Meteor.startup(function(){

   ChatRooms.allow({
        'insert':function(userId,doc){
            return true;
        },
        'update':function(userId,doc,fieldNames, modifier){
            return true;
        },
        'remove':function(userId,doc){
            return true;
        }
    });
    var mysql      = require('mysql');
    var wrapper = require('node-mysql-wrapper');

     var mysqlStringConnection = 	"mysql://root:12345678@127.0.0.1/chatroom debug=false&charset=utf8";
  //  //
     var db = Mysql.connect(mysqlStringConnection);
  // //  //"posts" -> a table name inside your database.
    ChatRooms = db.meteorCollection("t1", "chatrooms");
    var db = wrapper.wrap(connection);
   //End of changes, that's it!

//publish the collection as you used to do with Mongo.Collection
    // Meteor.publish("allPosts", function(){
    //            return Posts.find();
    // });

    Meteor.methods({
      clearchat: function (userId){
      // alert("deleting");
      console.log("deleting");
      ChatRooms.remove({chatIds:[userId , Meteor.userId()]});
      console.log("deleted");
    }
    });

});
