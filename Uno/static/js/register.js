function check(thisBtn) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    var obj = document.getElementById("email"); //要验证的对象
    var username = document.getElementById("username").value.length
    console.log(username)
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


