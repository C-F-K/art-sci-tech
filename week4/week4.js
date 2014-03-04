var data = new Object();

d3.json("http://ast.firebaseio.com/.json", function(err, parsedJSON) {
  if (err) {
    alert(err);
    return err;
  } else {
    data = parsedJSON;
  }
});

