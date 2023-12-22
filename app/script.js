// $.ajax({
//   type: "GET",
//   url: "https://script.google.com/macros/s/AKfycby1knPtkYOLbtFuEsRIKGmIGb6JzfT0dzjQqMOEELCF5YOlCf5UofJWrdIY2DjdpwdGiQ/exec",
//   data: {
//     commentsId: "넣을 데이터",
//     userId: "넣을 데이터",
//     password: "넣을 데이터",
//     content: "",
//     date: "",
//     reply: "",
//   },
//   success: function (response) {
//     alert("입력 완료.");
//   },
// });

const $commentForm = document.querySelector("#submit_comments_form");

const onSubmitComments = (e) => {
  e.preventDefault();
  console.log(e.target.user_id.value);
  console.log(e.target.password.value);
  console.log(e.target.content.value);
};

$commentForm.addEventListener("submit", onSubmitComments);
