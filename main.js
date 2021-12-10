const $ = document.querySelector.bind(document);

function createButton(txt) {
  var btn = document.createElement("button");
  btn.innerText = txt;
  $("#button").appendChild(btn);
  btn.onclick = breed;
}

function createComment(commentDoc) {
  var div = document.createElement("div");
  div.innerText = commentDoc.data().comment;
  $("#ChatRooms").appendChild(div);
  div.className = "ChatRooms";
  div.id = commentDoc.id;


   div.onmousedown = function (e) {
     const timeToHoldForDelete = Date.now();
     div.onmouseup = function (e) {
       if (Date.now() > timeToHoldForDelete + 1500) {
        
         div.remove();
         deleteDoc(div.id);
          alert("Deleted");
       }
       else{
        var msg = prompt("are you sure u want to edit it");
        if(msg){
           edit(div.id, msg);
           div.innerHTML = `${msg}`;
        }
       }
     }
   }

  // div.addEventListener("mouseup", () => {
  //   var msg = prompt("are you sure u want to change");
  //   if(msg){
  //      edit(div.id, msg);
  //      div.innerHTML = `${msg}`;
  //   }
   
  // });
}

window.onload = function () {
  // check if user is logged in
  onLogin((user) => {
    if (user) {
      //  user just logged in$
      //added thursday
      $("#ChatRooms").style.visibility = "visible";
      $("#addComment").style.display = "block";
      $("#login").style.display = "none";
      $("#signup").style.display = "none";
    } else {
      //   user just logged out
      $("#ChatRooms").style.visibility = "collapse";
      $("#login").style.display = "block";
      $("#addComment").style.display = "none";
    }
  });

  //show comments
  forEachComment(createComment);

  ////////////////////////////////
  // button and link functionality
  $("#loginLink").onclick = function () {
    $("#login").style.display = "block";
    $("#signup").style.display = "none";
  };

  $("#signupLink").onclick = function () {
    $("#login").style.display = "none";
    $("#signup").style.display = "block";
  };

  $("#slattbratha").onclick = function () {
    logout();
  };

  $("#loginBtn").onclick = function () {
    login($("#email").value, $("#password").value).catch(
      (err) => ($(".error").innerText = err.message)
    );
  };

  $("#registerBtn").onclick = function () {
    signup($("#emailReg").value, $("#passwordReg").value),
      $("#users-name").value.catch(
        (err) => ($(".error").innerText = err.message)
      );
  };

  $("#addCommentBtn").onclick = function () {
    addComment($("#newComment").value)
      .then(() => {
        createComment({ comment: $("#newComment").value });
        $("#newComment").value = "";
      })
      .catch((err) => ($(".error").innerText = err.message));
  };

  $("#inputfile").onchange = function (e) {
    uploadFile(this.files[0].name, this.files[0]);
    // of course you can change this.files[0].name to any filename
  };

  $("#images").innerHTML = getURL("image0.jpg");
  getURL("image0.jpg").then((url) => {
    $("#images").innerHTML = `<img src ="${url}">`;
  });

  addDiscussionEvent(createComment);


}
