function login(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    console.log(email)
    console.log(password)
    $.ajax({
        type:'post',
        url: '/login',
        data: {
            email : email,
            password : password
        },
        dataType: "json",
        success:function(ret){
            ret = JSON.parse(ret)
            if(ret.state == true){
                window.location = ret.url;
            } else{
                alert(ret.message);
            }
        },
        error:function(ret){
            alert("请重新输入");
        }
    }) 
}