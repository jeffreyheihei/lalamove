#!/usr/bin/env node

const yargs = require("yargs");
const fs = require('fs')
async function list_orders() {
  fs.readFile("./bin/database.json", 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = JSON.parse(data)
    if (data.length ==0){
      console.log("empty database");
      return;
    }
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      if (obj.taken == false) {
        console.log(obj.id + "," + obj.from + "," + obj.to);
      }
    }
  });
}

async function create_order(from, to) {
  var nextid = 0;
  var database = []
  fs.readFile("./bin/database.json", 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = JSON.parse(data)
    // find max id
    for (var i = 0; i < data.length; i++) {
      database.push(data[i])
      if (data[i].id > nextid) {
        nextid = data[i].id
      }
    }
    nextid++;
    //
    jsonobj = {
      "id": nextid,
      "from": from,
      "to": to,
      "taken": false
    }
    database.push(jsonobj) //uppdata database

    fs.writeFile('./bin/database.json', JSON.stringify(database), function (err) {
      if (err) throw err;
      console.log(nextid);
    });
  });
};

async function take_order(order_id) {
  fs.readFile("./bin/database.json", 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = JSON.parse(data)
    var found = false;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == order_id) {
        found = true;
        if (data[i].taken == true) {
          console.log("order already taken")
        } else {
          data[i].taken = true
        }
      }
    }
    if (found == false) {
      console.log("order does not exist");
      return
    }
    fs.writeFile('./bin/database.json', JSON.stringify(data), function (err) {
      if (err) throw err;
    });
  });
}


const argument = yargs.argv._[0]


if (argument == "create_order") {
  var from = yargs.argv._[1]
  var to = yargs.argv._[2]
  create_order(from, to).catch(console.dir);
} else if (argument == "list_orders") {
  list_orders().catch(console.dir);
} else if (argument == "take_order") {
  take_order(yargs.argv._[1]).catch(console.dir);
} else {
  console.log("no such command")
}
