var data = new Object();

d3.json("http://ast.firebaseio.com/.json", function(err, parsedJSON) {
  if (err) {
    console.log(err);
    return err;
  } else {
    data = parsedJSON;
  }
});