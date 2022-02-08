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

dataArray.comments.forEach(function(element) {
  const newComment = document.createElement('div');
  newComment.setAttribute('class', 'comment');
  newComment.classList.add('commentBox');
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
  const elementReply = element.replies;
  if(elementReply.length !== 0) { //Esse if verifica se tamanho de 'replies' é zero. se NÃO for, ele aciona.
    elementReply.reverse().forEach(function(reply){ //inverte e percorre cada elemento do array 'replies' e adiciona uma nova div.
      const newReply = document.createElement('div');
      newReply.setAttribute('class', 'newReply');
      newReply.classList.add('commentBox');
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
    if (canLike[index]==true & canDislike[index]==false) { //Se estiver apto a dar like e inapto para dar dislike, ...
      likeDisplay[index].textContent = parseInt(likeDisplay[index].textContent) + 1; //...procura o display de mesmo índice a aumenta 1.
      canLike[index]=true; //Se mantém apto a dar like ...
      canDislike[index]=true; //...e se torna apto a dar dislike.
    }else if (canLike[index]==true & canDislike[index]==true) { //... Se estiver apto a dar like e apto a dar dislike ...
      likeDisplay[index].textContent = parseInt(likeDisplay[index].textContent) + 1; //...procura o display de mesmo índice a aumenta 1.
      canLike[index]=false; //... se torna inapto a dar like ...
      canDislike[index]=true; //...e apto a dar dislike.
    }
  });
});

//Botões de Dislike.
dislike.forEach(function(element){ //Para cada botão de dislike, ...
  element.addEventListener("click", function(){ //...espera ser clicado e ...
    const index = dislike.indexOf(element); //...copia o index desse botão no array de botões para a constante "index".
    if (canDislike[index]==true & canLike[index]==false) { //Se estiver apto a dar dislike e inapto a dar like, ...
      likeDisplay[index].textContent = parseInt(likeDisplay[index].textContent) - 1; //...procura o display de mesmo índice a aumenta 1.
      canLike[index]=true;  //Se torna apto a dar like ...
      canDislike[index]=true; //...e se mantém apto a dar dislike.
    }else if (canDislike[index]==true & canLike[index]==true) { //... Se estiver apto a dar dislike, ...
      likeDisplay[index].textContent = parseInt(likeDisplay[index].textContent) - 1; //...procura o display de mesmo índice a aumenta 1.
      canLike[index]=true;  //Se torna apto a dar like ...
      canDislike[index]=false; //...e inapto a dar dislike.
    }
  });
});


//Botões de Delete.
function deleteUpdate(){
  let deleteArray = [...document.querySelectorAll(".delete")]; //Converte em array a NodeList criada pelo querySelectorAll.
  deleteArray.forEach(function(element){ //Para cada botão de delete, ...
    element.addEventListener("click", function(){ //...espera ser clicado, ...
      function confirmDelete(){//...confirma se quer mesmo deletar e, caso sim, ...
        let confirmDelete = confirm("This action will delete your comment. Do you want to proceed with it?");
        if (confirmDelete) {
          element.parentNode.parentNode.parentNode.parentNode.setAttribute('class', 'deleted');//...coloca a classe "deleted", que tem a propriedade "display:none", na div do comentário.
        }
      }
      confirmDelete();   
    });
  });
  }
deleteUpdate();

//Botões de Edit.
function editUpdate(){
  let editArray = [...document.querySelectorAll(".edit")];
  editArray.forEach(function(element){ //Para cada botão de edit, ...
    element.addEventListener("click", function(){ //...espera ser clicado, ...
      document.querySelector(".commentArea").value = element.parentNode.parentNode.previousElementSibling.children[0].textContent;//... colocar o conteúdo do comentário na commentArea para ser editado, ...
      document.querySelector(".addComment").style.display = "flex"; //...faz a commentArea aparecer, ...
      document.querySelector(".send").addEventListener("click", function(){ //... espera o botão send ser clicado, ...
        element.parentNode.parentNode.previousElementSibling.children[0].textContent = document.querySelector(".commentArea").value; //...atualiza o conteúdo do comentário com o que estiver escrito na commentArea e ...
        document.querySelector(".addComment").style.display = "none"; //... esconde a toda a div addComment e ...
        document.querySelector(".commentArea").value = "";//...apaga o conteúdo da commentArea.
      })
    });
  });
}
editUpdate();

//Botões Reply.
let replyArray = [...document.querySelectorAll(".reply")]; //Converte em array a NodeList criada pelo querySelectorAll.
let commentBoxArray = [...document.querySelectorAll(".commentBox")];
replyArray.forEach(function(element){ //Para cada botão de edit, ...
  const index = replyArray.indexOf(element);
  element.addEventListener("click", function(){ //...espera ser clicado, ...
    document.querySelector(".addComment").style.display = "flex"; //...faz a commentArea aparecer, ...
    document.querySelector(".send").addEventListener("click", function(){ //... espera o botão send ser clicado, ...
     
     
      /*AQUI ENTRA A CRIAÇÃO DO COMENTÁRIO. - PRECISA SER REVISTO: 
      1. BOTAO REPLY: SE CLICAR MAIS DE UMA VEZ ELE ADICIONA VÁRIOS COMENTÁRIOS IGUAIS!;
      2. BOTÃO EDIT: EDITA, MAS ADICIONA UMA CÓPIA DO COMENTÁRIO (DUPLICA)
      
      ACHO QUE OS PROBLEMAS 1 E 2 ESTÃO RELACIONADOS. ALGO COM O EVENTLISTENER
      PODE SER PORQUE O INDEX FOI CRIADO DENTRO DE CADA EVENTLISTENER. ACHO Q SE TORNAR O INDEX UMA
      VARIÁVEL GLOBAL NULL OU UNDEFINED E 1) ALTERAR O SEU VALOR DENTRO DO EVENTLISTENER E 
      2) RESETAR ELA PRA NULL OU UNDEFINED QND ACABAR DE USAR
      IRÁ RESOLVER.*/
      

      const newReply = document.createElement('div');
      newReply.setAttribute('class', 'newReply');
      newReply.classList.add('commentBox');
  
      newReply.innerHTML = `
      <div class="replyContent">
        <div class="commentHeader">
        <div class="profile">
          <img src = ${dataArray.currentUser.image.png}>
          <p class="name">${dataArray.currentUser.username}</p>
        </div>
          <p class="date">just now</p>
      </div>

      <div class="commentContent">
        <p class="commentText">${document.querySelector(".commentArea").value}</p>
      </div>

      <div class="commentActions">
        <div class="reaction">
          <button type="button" class="like"><img src="./images/icon-plus.svg"></button>
          <p class="likeDisplay">0</p>
          <button type="button" class="dislike"><img src="./images/icon-minus.svg"></button>
        </div>

        <div class="actionType">
          <button type="button" class="reply"><img src="./images/icon-reply.svg"> Reply</button>
                
        </div>
      </div>
      `;

      //document.querySelector('.commentBox').appendChild(newReply); //consertar aqui
      commentBoxArray[index].insertAdjacentElement('afterend',newReply);


      document.querySelector(".addComment").style.display = "none"; //... esconde a toda a div addComment.
      document.querySelector(".commentArea").value = "";//...apaga o conteúdo da commentArea.


      //Aqui adiciona os botões delete e edit - EDIT TÁ QUEBRADO! TÁ CRIANDO NOVOS COMENTÁRIOS!
      const newDelete = document.createElement('button');
      newDelete.setAttribute('class', 'delete');
      newDelete.innerHTML = "<img src='./images/icon-delete.svg'> Delete";
      
  
      const newEdit = document.createElement('button');
      newEdit.setAttribute('class', 'edit');
      newEdit.innerHTML = "<img src='./images/icon-edit.svg'> Edit";
  
      newReply.querySelector('.actionType').appendChild(newDelete);
      newReply.querySelector('.actionType').appendChild(newEdit);
  
      deleteUpdate();
      editUpdate();

    })
  });
});