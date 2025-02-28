let comments = [];


function loadComments() {
    let savedComments = localStorage.getItem("comments");
    if (savedComments) {
        comments = JSON.parse(savedComments); 
        comments.forEach((comment, index) => addCommentToList(comment.text, comment.date, comment.username, index)); 
    }
}


function addComment() {
    var commentInput = document.getElementById("commentInput");
    var usernameInput = document.getElementById("usernameInput");
    var commentText = commentInput.value.trim();
    var username = usernameInput.value.trim() || "Anónimo"; 
    var currentDate = new Date().toLocaleString(); 

    if (commentText !== "") {
        var comment = {
            text: commentText,
            date: currentDate,
            username: username
        };

        comments.push(comment);
        localStorage.setItem("comments", JSON.stringify(comments)); 
        
        addCommentToList(commentText, currentDate, username, comments.length - 1); 
        console.log("Lista de comentarios:", comments);
        commentInput.value = "";
        usernameInput.value = "";
    } else {
        alert("Por favor, escribe una sugerencia antes de agregarla.");
    }
}


function addCommentToList(commentText, currentDate, username, index) {
    var commentList = document.getElementById("commentList");
    var newComment = document.createElement("li");
    newComment.classList.add("comment-item");


    newComment.innerHTML = `
        <p><strong>${username}</strong> - <em>${currentDate}</em></p>
        <p>${commentText}</p>
    `;


    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = function() {
        deleteComment(index); 
    };

    newComment.appendChild(deleteButton);
    commentList.appendChild(newComment);
}


function deleteComment(index) {
    comments.splice(index, 1); 
    localStorage.setItem("comments", JSON.stringify(comments)); 


    updateCommentList();
}


function updateCommentList() {
    var commentList = document.getElementById("commentList");
    commentList.innerHTML = ""; // Limpiar la lista


    comments.forEach((comment, index) => addCommentToList(comment.text, comment.date, comment.username, index));
}


function deleteAllComments() {
    comments = []; 
    localStorage.removeItem("comments");  


    var commentList = document.getElementById("commentList");
    commentList.innerHTML = ""; 
}


document.addEventListener("DOMContentLoaded", loadComments);


setInterval(() => {
    console.log("Lista de comentarios actualizada:", comments);
}, 5000);
