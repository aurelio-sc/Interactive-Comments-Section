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
document.getElementById("userAvatar").src = dataArray.currentUser.image.png;
let currentUserName = dataArray.currentUser.username;
console.log(currentUserName);

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
         
    </div>
  </div>
  
  `;

  console.log(element.user.username);
  document.querySelector('.commentsContainer').appendChild(newComment);

  if (element.user.username == currentUserName) { //Para aparecerem os botões EDIT e DELETE se os nomes dos usuários coincidirem.

    const newDelete = document.createElement('button');
    newDelete.setAttribute('class', 'delete');
    newDelete.innerHTML = "<img src='./images/icon-delete.svg'> Delete";
    

    const newEdit = document.createElement('button');
    newEdit.setAttribute('class', 'edit');
    newEdit.innerHTML = "<img src='./images/icon-edit.svg'> Edit";

    newComment.querySelector('.actionType').appendChild(newDelete);
    newComment.querySelector('.actionType').appendChild(newEdit);

  }

  //Colocando os replies nos seus respectivos comentários.
  console.log(element["replies"].length);
  const elementReply = element.replies;
  console.log("this is the 'replies' inside the element " + elementReply);
  if(elementReply.length !== 0) { //Esse if verifica se tamanho de 'replies' é zero. se NÃO for, ele aciona.
    elementReply.reverse().forEach(function(reply){ //inverte e percorre cada elemento do array 'replies' e adiciona uma nova div.
      const newReply = document.createElement('div');
      newReply.setAttribute('class', 'newReply')
      newReply.innerHTML = `
      <div class="replyContent">
        <div class="commentHeader">
        <div class="profile">
          <img src = ${reply.user.image.png}>
          <p class="name">${reply.user.username}</p>
        </div>
          <p class="date">${reply.createdAt}</p>
      </div>

      <div class="commentContent">
        <p class="commentText">${reply.content}</p>
      </div>

      <div class="commentActions">
        <div class="reaction">
          <button type="button" class="like"><img src="./images/icon-plus.svg"></button>
          <p class="likeDisplay">${reply.score}</p>
          <button type="button" class="dislike"><img src="./images/icon-minus.svg"></button>
        </div>

        <div class="actionType">
          <button type="button" class="reply"><img src="./images/icon-reply.svg"> Reply</button>
                
        </div>
      </div>
      `;

      document.querySelector('.commentsContainer').appendChild(newReply);
     
     
      if (reply.user.username == currentUserName) { //Para aparecerem os botões EDIT e DELETE se os nomes dos usuários coincidirem.

        const newDelete = document.createElement('button');
        newDelete.setAttribute('class', 'delete');
        newDelete.innerHTML = "<img src='./images/icon-delete.svg'> Delete";
        
    
        const newEdit = document.createElement('button');
        newEdit.setAttribute('class', 'edit');
        newEdit.innerHTML = "<img src='./images/icon-edit.svg'> Edit";
    
        newReply.querySelector('.actionType').appendChild(newDelete);
        newReply.querySelector('.actionType').appendChild(newEdit);
    
      }
    });

  }


});


