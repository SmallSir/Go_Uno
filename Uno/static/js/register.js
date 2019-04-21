function check(thisBtn) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    var obj = document.getElementById("email"); //要验证的对象
    var username = document.getElementById("username").value.length
    if (username > 15){
        alert("用户名太长")
        return false
    }
    
    if (obj.value === "") { //输入不能为空
        alert("输入不能为空!");
        return false;
    } else if (!reg.test(obj.value)) { //正则验证不通过，格式不对
        alert("验证不通过!");
        return false;
    } else {
        var pas = document.getElementById("password").value
        if(pas.length < 7){
            alert("密码长度必须大于7")
            return false
        }
        var repas = document.getElementById("repassword").value
        if (pas != repas) {
            alert("两次密码输入不正确");
            return false;
        }
        emailCheck(thisBtn)
        //发送信息给后端生成验证码
        $.ajax({
            type:'post',
            url: '/emailyzm',
            data: {
                email : obj.value,
            },
            dataType: "json",
            success:function(ret){
                ret = JSON.parse(ret)
                if(ret.state == false)
                    alert(ret.message)
                else
                    alert("已发送，请前往邮箱查看")
            },
            error:function(ret){
                alert("请重新输入");
            }
        }) 
        return true;
    }
}


function emailCheck(thisBtn) {
    var clock = '';
    var nums = 60;
    btn = thisBtn;
    btn.disabled = true; //将按钮置为不可点击
    btn.value = nums + '秒后可重新获取';
    clock = setInterval(doLoop, 1000); //一秒执行一次
    function doLoop() {
        console.log()
        nums--;
        if (nums > 0) {
            btn.value = nums + '秒后可重新获取';
        } else {
            clearInterval(clock); //清除js定时器
            btn.disabled = false;
            btn.value = '点击发送验证码';
            nums = 60; //重置时间
        }
    }
}


function registeruser(){
    var mail = document.getElementById("email").value; 
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    var veri = document.getElementById("veri").value;
    
    //信息验证
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if (username > 15){
        alert("用户名太长")
        return false
    }
    if (mail === "") { //输入不能为空
        alert("输入不能为空!");
        return false;
    } else if (!reg.test(mail)) { //正则验证不通过，格式不对
        alert("验证不通过!");
        return false;
    } else {
        if(password.length < 7){
            alert("密码长度必须大于7")
            return false
        }
        var repas = document.getElementById("repassword").value
        if (password != repas) {
            alert("两次密码输入不正确");
            return false;
        }
    }

    $.ajax({
        type:'post',
        url: '/register',
        data: {
            username : username,
            password : password,
            yzm : veri,
            email: mail,
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

