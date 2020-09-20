$(document).ready(function () {
  $.getJSON("/api/todos").then(addTodos);
  $("#todoInput").keypress(function (event) {
    if (event.which === 13) {
      createTodo();
    }
  });
});

function formatTodo(t) {
  let newTodo = $(
    "<li class='task'>" + t.name + "<span class='span'>X</span>" + "</li>"
  );
  newTodo.data("id", t._id);
  newTodo.data("isCompleted", t.completed);
  $(".list").append(newTodo);
  if (t.completed) {
    newTodo.addClass("done");
  }
}

function addTodos(todos) {
  todos.forEach((t) => {
    formatTodo(t);
  });
}

function createTodo() {
  $.post("/api/todos", { name: $("#todoInput").val() })
    .then(function (newTodo) {
      formatTodo(newTodo);
      $("#todoInput").val(" ");
    })
    .catch(function (err) {
      console.log(err);
    });
}

$(".list").on("click", ".span", function () {
  // console.log($(this).parent().data().id);
  $.ajax({
    url: "/api/todos/" + $(this).parent().data().id,
    type: "DELETE",
    success: function (result) {
      console.log("deleted");
    },
  });
  $(this).parent().remove();
});

$(".list").on("click", "li", function (evt) {
  let data = $(this).data();
  let sentData = { completed: data.isCompleted };
  sentData.completed = !sentData.completed;
  $.ajax({
    method: "PUT",
    url: "/api/todos/" + $(this).data().id,
    data: sentData,
  }).then(function (todo) {
    console.log();
    $(evt.target).toggleClass("done");
  });
});
