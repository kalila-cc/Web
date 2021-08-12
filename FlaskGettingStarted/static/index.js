function login() {
  var usr = document.getElementById("usr");
  var pwd = document.getElementById("pwd");
  if (!usr.value.length)
    alert('请输入用户名')
  if (!pwd.value.length)
    alert('请输入密码')
  $.ajax({
    type: "POST",
    url: "/login",
    data: {
      usr: usr.value,
      pwd: pwd.value
    }
  }).then(res => {
    if (res.errCode == 0) {
      location.href = `/user/${usr.value}`;
    } else {
      alert(res.errMsg);
    }
  });
  return false;
}

function register() {
  location.href = "/register";
  return true;
}