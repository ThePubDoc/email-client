const List = require("../models/list");
const log = require("../../utils").log;
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const csv = require('csv-parser');
const csvtojson = require("csvtojson");

async function createList(req, res) {
  try {
    const file_url = req.file.path;
    const { name } = req.body;
    let list_instance = new List({ name, file_url });
    console.log(list_instance)
    const new_file_url = path.join(__dirname ,"../../" , list_instance.file_url);
    let emails = [];
    const users = await csvtojson().fromFile(new_file_url);
    // console.log(array);
    for(user in users){
      emails.push(users[user].Email);
    }
    const contacts = emails.length;
    list_instance = new List({name, file_url, contacts, emails});
    list_instance.save();
    log.info("saved");
    res.redirect("/lists");
    // fs.createReadStream(new_file_url)
    //   .pipe(csv())
    //   .on('data', (data) => results.push(data))
    //   .on('end', () => {
    //     const contacts = results.length;
    //     list_instance = new List({name, file_url, contacts})
    //     list_instance.save();
    //     log.info("saved");
    //     res.redirect("/lists");
    //   });    
  } catch (err) {
    log.info(err);
  }
}

async function edit_list(req, res) {
  const id = req.query.id;
  const file_url = req.file.path;
  const { name } = req.body;
  let list_instance = new List({ name, file_url });
  const new_file_url = path.join(__dirname ,"../../" , list_instance.file_url);
  let emails = [];
  const users = await csvtojson().fromFile(new_file_url);
  // console.log(array);
  for(user in users){
    emails.push(users[user].Email);
  }
  const contacts = emails.length;
  List.findOneAndUpdate(
    { _id: id },
    { name, file_url, contacts, emails },
    { upsert: false },
    (err, doc) => {
      if (err) {
        console.log("error in updating");
      } else {
        res.redirect("/lists");
      }
    }
  );
  // list_instance = new List({name, file_url, contacts, emails});
  // list_instance.save();
  // log.info("saved");
  // fs.createReadStream(new_file_url)
  //     .pipe(csv())
  //     .on('data', (data) => results.push(data))
  //     .on('end', () => {
  //       const contacts = results.length;
  //       List.findOneAndUpdate(
  //         { _id: id },
  //         { name, file_url, contacts },
  //         { upsert: false },
  //         (err, doc) => {
  //           if (err) {
  //             console.log("error in updating");
  //           } else {
  //             res.redirect("/lists");
  //           }
  //         }
  //       );
  //     });
}

module.exports = {
  createList,
  edit_list
};
