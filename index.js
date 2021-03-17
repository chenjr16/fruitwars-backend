const express = require("express");
const app = express();

const cors = require("cors");
const players = require("./leaderboard_db");
const prices = require("./priceDB");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

/*
/ Database connections
*/

/*  player data structure
{
  userName: name,
  money: money,
  days: days,
  inventory: {
    pineapple: pineappleCount,
    apples: appleCount,
    cherries: cherryCount,
    strawberries: strawberryCount,
    keyLimes: keyLimeCount,
    avacadoes: avacadoCount
  }
  location: {
    city: cityName,
    prices: {
      pineapple: pineapplePrice,
      apples: applePrice,
      cherries: cherryPrice,
      strawberries: strawberryPrice,
      keyLimes: keyLimePrice,
      avacadoes: avacadoPrice
    }
  }
}
*/
const users = [];

/*  leaderboard data structue
{
  userName: user,
  days: numDays,
  money: endingWorth,
}
*/
const leaderboard = [
  { userName: "Bob", days: 0, money: 0 },
  { userName: "Tom", days: 0, money: 0 },
  { userName: "Chris", days: 0, money: 0 },
  { userName: "Junru", days: 0, money: 0 },
  { userName: "Danny", days: 0, money: 0 },
];

// Start app
app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}.`);
});

/*
/  Routes--
*/

// Get
app.get("/", (req, res) => {
  res.send(players);
});

app.get("/leaderboard", (req, res) => {
  console.log("Get at /leaderboard directory");
  res.send(leaderboard);
});

app.get("/prices", (req, res) => {
  console.log("sending prices");
  res.send(prices);
});

app.get("/users", (req, res) => {
  console.log("send user info");
  res.send(users);
});

// Post
app.post("/", (req, res) => {
  console.log("Post at root directory");
});

app.post("/addPlayer", (req, res) => {
  console.log("Post at addPlayer directory");
  //.log(req.body);
  const newUser = req.body.playerData.userName;
  //console.log("New user name is: " + newUser);
  let found = false;
  //console.log("Loop of array");
  for (let i = 0; i < users.length; i++) {
    //console.log(users[i]);
    if (newUser === users[i].userName) {
      found = true;
      break;
    }
  }
  if (found) {
    res.sendStatus(500);
  } else {
    users.push(req.body.playerData);
    res.sendStatus(200);
  }
});

app.post("/getPlayer", (req, res) => {
  console.log("Post at getPlayer directory");
  console.log(req.body);
  const newUser = req.body.userName;
  console.log("New user name is: " + newUser);
  let found = false;
  let index = -1;
  //console.log("Loop of array");
  for (let i = 0; i < users.length; i++) {
    //console.log(users[i]);
    if (newUser === users[i].userName) {
      found = true;
      index = i;
      break;
    }
  }
  if (found) {
    res.status(200).send(users[index]);
  } else {
    res.sendStatus(500);
  }
});

// Delete
app.delete("/", (req, res) => {
  console.log("Delete at root directory");
});

// Put
app.put("/", (req, res) => {
  console.log("Put at root directory");
});
