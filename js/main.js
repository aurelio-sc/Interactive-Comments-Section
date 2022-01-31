const commentArea = document.querySelector(".commentArea");
const placeholder = commentArea.getAttribute("placeholder");

commentArea.onfocus = function(){
    this.setAttribute("placeholder", "");
}

commentArea.onblur = function(){
    this.setAttribute("placeholder", placeholder);
}