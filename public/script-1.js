function handleSubmit(e) {
  e.preventDefault();
  var xhttp = new XMLHttpRequest();
  var number = document.getElementsByTagName("input")[0].value;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      document.getElementsByClassName("content")[0].innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/api/matrix/" + number, true);
  xhttp.send();
}

