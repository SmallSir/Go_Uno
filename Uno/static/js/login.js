function login(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    var data = {}
    data["email"] = email
    data["password"] = password
    $.ajax({
        type:'post',
        url: '/login',
        data: JSON.stringify(data),
        contentType: "application/json",
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

function register(){
    window.location = "/register"
}