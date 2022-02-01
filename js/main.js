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
  score;
  createdAt;

  increaseScore(){
    this.score +=1;
  }

  decreaseScore(){
    this.score -=1;
  }
}

const trial = new User();
