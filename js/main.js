//data = require("../data.json");

//import data from "../data.json" assert {type:"json"};

//import("../data.json", {assert:{type:"json"}}).then((mode)=>{
//  console.log(mode);
//});

const commentArea = document.querySelector(".commentArea");
const placeholder = commentArea.getAttribute("placeholder");

commentArea.onfocus = function(){
  this.setAttribute("placeholder", "");
}

commentArea.onblur = function(){
  this.setAttribute("placeholder", placeholder);
}

class User {
  name;
  avatar;
}

class Comment {
  id;
  content;
  score=0;
  createdAt;

  increaseScore(){
    this.score +=1;
  }

  decreaseScore(){
    this.score -=1;
  }
}

const trial = new Comment();

console.log(trial.score);
trial.increaseScore();
console.log(trial.score);
//console.log(data);


function load() {
	var mydata = JSON.stringify(data);
  console.log(mydata)
  mydata = JSON.parse(mydata);
	console.log(mydata)
}

load();

