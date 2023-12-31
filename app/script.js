const $commentForm = document.querySelector("#submit_comments_form");
const $submitBtn = document.querySelector("#submit_btn");
const $commentsList = document.querySelector("#comments_list");
const commentsId = Math.floor(Math.random() * 10000000000);
const getTime = new Date().toLocaleString();

const isLoading = (status) => {
  if (status) {
    $submitBtn.disabled = true;
  } else {
    $submitBtn.disabled = false;
  }
};

//스프레드시트 작성 함수
const onSubmitComments = (e) => {
  e.preventDefault();
  const userId = e.target.user_id.value;
  const password = e.target.password.value;
  const content = e.target.content.value;

  console.log(e.target.user_id.value);
  console.log(e.target.password.value);
  console.log(e.target.content.value);

  // input 공백확인
  if (userId.length === 0 || password.length === 0 || content.length === 0) {
    alert("공백이 존재합니다.");
    return;
  }
  isLoading(true);
  const objComment = {
    commentsId: commentsId,
    userId: userId,
    password: password,
    content: content,
    date: getTime,
    reply: "",
  };

  //구글시트 전송함수.
  axios
    .post(
      "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec",
      objComment,
      {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    )

    .then((res) => {
      alert("입력 완료.");
      console.log(res);
      isLoading(false);
      $commentForm.reset();
    })
    .catch((error) => {
      console.log(error);
      alert("에러");
      isLoading(false);
    });
};

//시트 데이터 가져오기
function fetchComments() {
  axios
    .get(
      "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec"
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

//작성된 리스트 필요.(스프레드시트와 연결하는 방법)
//리플 기능은 어떻게 하지
//삭제기능
//기본적으로 어떻게 통신하는지 보자
// 현재 페이지 기준으로 댓글 시트 생성

window.onload = fetchComments;
$commentForm.addEventListener("submit", onSubmitComments);
