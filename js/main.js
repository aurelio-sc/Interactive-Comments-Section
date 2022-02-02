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
  userName;
  userAvatar;

  increaseScore(){
    this.score +=1;
  }

  decreaseScore(){
    this.score -=1;
  }
}

//const trial = new Comment();
//
//console.log(trial.score);
//trial.increaseScore();
//console.log(trial.score);
////console.log(data);
//
//
//function load() {
//	var mydata = JSON.stringify(data);
//  console.log(mydata)
//  mydata = JSON.parse(mydata);
//	console.log(mydata);
//}
//
//load();


//Bloco para constuir comentário. Tem que inserir isso em uma função que percorre o data.js em busca de "id" de "comments" e fazer um comentário para cada id encontrado.
//const newComment = document.createElement('div');
//newComment.setAttribute('class', 'comment');
//newComment.innerHTML = `
//<div class="commentHeader">
//<div class="profile">
//  <img src="../../Cursos Alura/Alura Challenge Front End Dez-2021/img/profilepic.png">
//  <p class="name">NOME</p>
//</div>
//<p class="date">TEMPO_ENVIO</p>
//</div>
//
//<div class="commentContent">
//<p class="commentText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis semper dolor quis ultricies. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget sapien lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer dapibus vel turpis vel gravida. Aenean facilisis eleifend urna non fringilla. Nulla ut felis quis tortor condimentum maximus.</p>
//</div>
//
//<div class="commentActions">
//<div class="reaction">
//  <button type="button" class="like"><img src="./images/icon-plus.svg"></button>
//  <p class="likeDisplay">0</p>
//  <button type="button" class="dislike"><img src="./images/icon-minus.svg"></button>
//</div>
//
//  <div class="actionType">
//    <button type="button" class="reply"><img src="./images/icon-reply.svg"> Reply</button>
//    <button type="button" class="delete"><img src="./images/icon-delete.svg"> Delete</button>
//    <button type="button" class="edit"><img src="./images/icon-edit.svg"> Edit</button>            
//  </div>
//</div>
//`;
//
//document.querySelector('.flexContainer').appendChild(newComment);

//Fim do bloco para construir comentário.


const dataArray = data[0];
dataArray.comments.forEach(function(element) {
  const newComment = document.createElement('div');
  newComment.setAttribute('class', 'comment');
  newComment.innerHTML = `
  <div class="commentHeader">
  <div class="profile">
    <img src = ${element.user.image.png}>
    <p class="name">${element.user.username}</p>
  </div>
  <p class="date">${element.createdAt}</p>
  </div>

  <div class="commentContent">
  <p class="commentText">${element.content}</p>
  </div>

  <div class="commentActions">
  <div class="reaction">
    <button type="button" class="like"><img src="./images/icon-plus.svg"></button>
    <p class="likeDisplay">${element.score}</p>
    <button type="button" class="dislike"><img src="./images/icon-minus.svg"></button>
  </div>

    <div class="actionType">
      <button type="button" class="reply"><img src="./images/icon-reply.svg"> Reply</button>
      <button type="button" class="delete"><img src="./images/icon-delete.svg"> Delete</button>
      <button type="button" class="edit"><img src="./images/icon-edit.svg"> Edit</button>            
    </div>
  </div>
  `;

  //newComment.innerHTML.getElementById("avatar").src = element.img.png;
  console.log(element.user)
  document.querySelector('.flexContainer').appendChild(newComment);
});
