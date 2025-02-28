let comments = [];

// Cargar los comentarios guardados cuando la página se abre
function loadComments() {
    let savedComments = localStorage.getItem("comments");
    if (savedComments) {
        comments = JSON.parse(savedComments); // Convertir de texto a array
        comments.forEach((comment, index) => addCommentToList(comment.text, comment.date, comment.username, index)); // Mostrar comentarios guardados
    }
}

// Agregar un nuevo comentario
function addComment() {
    var commentInput = document.getElementById("commentInput");
    var usernameInput = document.getElementById("usernameInput");
    var commentText = commentInput.value.trim();
    var username = usernameInput.value.trim() || "Anónimo"; // Si no se ingresa nombre, se pone "Anónimo"
    var currentDate = new Date().toLocaleString(); // Obtener la fecha y hora actual

    if (commentText !== "") {
        // Guardar el comentario con la fecha y el nombre de usuario
        var comment = {
            text: commentText,
            date: currentDate,
            username: username
        };

        comments.push(comment);
        localStorage.setItem("comments", JSON.stringify(comments)); // Guardar en LocalStorage
        
        addCommentToList(commentText, currentDate, username, comments.length - 1); // Mostrar en la lista visual
        console.log("Lista de comentarios:", comments);
        commentInput.value = "";
        usernameInput.value = "";
    } else {
        alert("Por favor, escribe una sugerencia antes de agregarla.");
    }
}

// Agregar un comentario a la lista en la interfaz
function addCommentToList(commentText, currentDate, username, index) {
    var commentList = document.getElementById("commentList");
    var newComment = document.createElement("li");
    newComment.classList.add("comment-item");

    // Crear el contenido del comentario
    newComment.innerHTML = `
        <p><strong>${username}</strong> - <em>${currentDate}</em></p>
        <p>${commentText}</p>
    `;

    // Crear el botón de eliminar
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = function() {
        deleteComment(index); // Llamar a la función para eliminar el comentario
    };

    newComment.appendChild(deleteButton);
    commentList.appendChild(newComment);
}

// Borrar un comentario específico
function deleteComment(index) {
    comments.splice(index, 1); // Eliminar el comentario del array
    localStorage.setItem("comments", JSON.stringify(comments)); // Actualizar en localStorage

    // Volver a cargar la lista de comentarios para reflejar el cambio
    updateCommentList();
}

// Actualizar la lista visual después de eliminar un comentario
function updateCommentList() {
    var commentList = document.getElementById("commentList");
    commentList.innerHTML = ""; // Limpiar la lista

    // Volver a agregar todos los comentarios restantes a la interfaz
    comments.forEach((comment, index) => addCommentToList(comment.text, comment.date, comment.username, index));
}

// Borrar todos los comentarios
function deleteAllComments() {
    comments = [];  // Vaciar el array de comentarios
    localStorage.removeItem("comments");  // Eliminar los comentarios guardados en localStorage

    // Vaciar la lista visual
    var commentList = document.getElementById("commentList");
    commentList.innerHTML = "";  // Eliminar todos los elementos de la lista
}

// Cargar los comentarios guardados cuando la página carga
document.addEventListener("DOMContentLoaded", loadComments);

// Imprimir la lista de comentarios en la consola cada 5 segundos
setInterval(() => {
    console.log("Lista de comentarios actualizada:", comments);
}, 5000);
