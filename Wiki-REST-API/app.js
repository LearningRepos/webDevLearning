//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

const wikiSchema = {
  title: String,
  content: String
};

const Wiki = mongoose.model("Article", wikiSchema);

app.route("/articles").get(function(req, res) {
    Wiki.find(function(err, found) {
      if (err) {
        res.send(err);
      } else {
        res.send(found);
      }
    });
  })

  .post(function(req, res) {
    const newWiki = new Wiki({
      title: req.body.title,
      content: req.body.content
    });

    newWiki.save(function(err) {
      if (err) {
        res.send(err)
      } else {
        res.send("Success")
      }
    });
  })

  .delete(function(req, res) {
    Wiki.deleteMany(function(err) {
      if (!err) {
        res.send("Success deleting")
      } else {
        res.send(err);
      }
    });
  });

app.route("/articles/:articleTitle")

  .get(function(req, res) {
    Wiki.findOne({
      title: req.params.articleTitle
    }, function(err, found) {
      if (found) {
        res.send(found)
      } else {
        res.send("No article found");
      }
    });
  })

  .put(function(req, res) {
    Wiki.update({
        title: req.params.articleTitle
      }, {
        title: req.body.title,
        content: req.body.content
      }, {
        overwrite: true
      },
      function(err, result) {
        if (!err) {
          res.send(req.body.title + " " + req.body.content);
        }
      });
  })

  .patch(function(req, res) {

    Wiki.update({
        title: req.params.articleTitle
      }, {
        $set: req.body
      },
      function(err) {
        if (!err) {
          res.send("Success Updating");
        }
        else{
          res.send(err);
        }
      }

    );
  })

  .delete(function(req,res){
    Wiki.deleteOne({title: req.params.articleTitle}, function(err){
      if(!err){
        res.send("Success Deleting");
      }
      else{
        res.send(err);
      }
    });
  });
