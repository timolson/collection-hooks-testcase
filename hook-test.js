var docs = new Meteor.Collection('doc');


if (Meteor.isClient) {
  Template.test.helpers({
    doc: function () {
      return JSON.stringify(docs.findOne());
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

      console.log("creating hook");
      docs.after.findOne( function(userId, selector, options, doc) {
          console.log("modifying document "+JSON.stringify(doc));
          doc['real-data'] = 'WORKS';
          delete doc['data'];
          console.log("modified document is "+JSON.stringify(doc));
          return doc;
      });

      console.log("inserting document");
      docs.insert({ data: 'BROKEN document not modified by hook' });

      console.log("fetching document server-side:",JSON.stringify(docs.findOne()));
  });
}
