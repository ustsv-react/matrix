function handleSubmit(e) {
  e.preventDefault();
  var value = document.getElementsByTagName('input')[0].value;
  window.location = `/matrix/${value}`;
}

