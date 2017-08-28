import { Neo4jDB } from 'meteor/ostrio:neo4jdriver';
ChatRooms = new Meteor.Collection("chatrooms");

// Meteor.methods({
//   clearchat: function (userId){
//   // alert("deleting");
//   ChatRooms.remove({chatIds:[this._id , Meteor.userId()]});
// }
// });
