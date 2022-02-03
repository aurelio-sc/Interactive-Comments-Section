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


let like = [...document.querySelectorAll(".like")]; //Converte em array a NodeList criada pelo querySelectorAll.
let dislike = [...document.querySelectorAll(".dislike")];
let likeDisplay = [...document.querySelectorAll(".likeDisplay")];
let canLike = Array(like.length).fill(true); //Array de "pode dar like".
let canDislike = Array(dislike.length).fill(true); //Array de "pode dar dislike".

//Botões de Like.
like.forEach(function(element){ //Para cada botão de like, ...
  element.addEventListener("click", function(){ //...espera ser clicado e ...    
    const index = like.indexOf(element); //...copia o index desse botão no array de botões para a constante "index".
    if (canLike[index]==true) { //... Se estiver apto a dar like, ...
      likeDisplay[index].textContent = parseInt(likeDisplay[index].textContent) + 1; //...procura o display de mesmo índice a aumenta 1.
      canLike[index]=false; //Se torna inapto a dar like ...
      canDislike[index]=true; //...e apto a dar dislike.
    }
  });
});

//Botões de Dislike.
dislike.forEach(function(element){ //Para cada botão de dislike, ...
  element.addEventListener("click", function(){ //...espera ser clicado e ...
    const index = dislike.indexOf(element); //...copia o index desse botão no array de botões para a constante "index".
    if (canDislike[index]==true) { //... Se estiver apto a dar dislike, ...
      likeDisplay[index].textContent = parseInt(likeDisplay[index].textContent) - 1; //...procura o display de mesmo índice a aumenta 1.
      canLike[index]=true;  //Se torna apto a dar like ...
      canDislike[index]=false; //...e inapto a dar dislike.
    }
  });
});

