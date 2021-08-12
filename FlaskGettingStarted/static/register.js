function register() {
  var usr = document.getElementById("usr");
  var pwd = document.getElementById("pwd");
  $.ajax({ 
    type: "POST",
    url: "/register",
    data: {
      usr: usr.value,
      pwd: pwd.value
    }
  }).then(res => {
    if (res.errCode == 0) {
      alert(res.errMsg);
      location.href = "/";
    } else {
      alert(res.errMsg);
      if (res.errCode == 1 || res.errCode == 3 || res.errCode == 5) {
        usr.setAttribute("value", "");
        usr.value = "";
      } else {
        pwd.setAttribute("value", "");
        pwd.value = "";
      }
    }
    return false;
  });
  return false;
}