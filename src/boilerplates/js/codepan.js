let counter = document.getElementById("counter")

function up() { 
  const old = parseInt(counter.innerHTML);
  counter.innerHTML = old + 1;
}

function down() { 
  const old = parseInt(counter.innerHTML);
  counter.innerHTML = old - 1;
}