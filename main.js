const $ = document.querySelector.bind(document);



function createButton(txt) {
    var btn = document.createElement('button');
    btn.innerText = txt;
    $('#button').appendChild(btn);
    btn.onclick = breed;

}



function createComment(commentDoc) {
    var div = document.createElement('div');
    div.innerText = commentDoc.comment;
    $('#ChatRooms').appendChild(div);
    div.className = 'ChatRooms';
}


window.onload = function () {

    // check if user is logged in
     onLogin(user => {
        if (user) {
           //  user just logged in$
           
             //added thursday
             $('#ChatRooms').style.visibility='visible'
             $('#addComment').style.display = 'block';
             $('#login').style.display = 'none';
             $('#signup').style.display = 'none';
             
           

         } else {
          //   user just logged out
          $('#ChatRooms').style.visibility ='collapse';
             $('#login').style.display = 'block';
             $('#addComment').style.display = 'none';
         }
     });



    //show comments
    forEachComment(createComment);

    ////////////////////////////////
    // button and link functionality
    $('#loginLink').onclick = function () {
        $('#login').style.display = 'block';
        $('#signup').style.display = 'none';
    }

    $('#signupLink').onclick = function () {
        $('#login').style.display = 'none';
        $('#signup').style.display = 'block';
    }

    $('#slattbratha').onclick = function () {
        logout();
    }

    $('#loginBtn').onclick = function () {
        login($('#email').value, $('#password').value)
            .catch(err => $('.error').innerText = err.message);
    }

    $('#registerBtn').onclick = function () {
        signup($('#emailReg').value, $('#passwordReg').value),$('#users-name').value
            .catch(err => $('.error').innerText = err.message);

    }

    $('#addCommentBtn').onclick = function () {
        addComment($('#newComment').value)
            .then(() => {
                createComment({ comment: $('#newComment').value });
                $('#newComment').value = '';
            })
            .catch(err => $('.error').innerText = err.message)
    }
    
    $('#inputfile').onchange = function(e){
        uploadFile( this.files[0].name, this.files[0] );
        // of course you can change this.files[0].name to any filename
    }

    $('#myimage').src = getURL( 'image0.jpg' );

    $('#ChatRooms').addEventListener("click",pressingDown,false) = function(){
        deleteDoc($('#newComment').value)
        .then(()=> {
            createComment({ comment: "" });
            $('#newComment').value = '';
        })
        .catch(err => $('.error').innerText = err.message)
    }


}