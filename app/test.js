let inputs = $('input[type="text"]');
let googleSubmitBtn = document.getElementById("google-submit");
let snackbar = document.getElementById("snackbar");

let inputName = document.getElementById("name");
let inputAge = document.getElementById("age");
let inputArea = document.getElementById("area");

function isLoading(status){
  if(status){
    $('html, body').classList.add("wait");
    googleSubmitBtn.attr('disabled', true).innerHTML = '입력중...';
  } else {
    $('html, body').classList.remove("wait");
    googleSubmitBtn.attr('disabled', false).innerHTML = '입력';
  }
}

function checkInput(){
  let isEmpty = false;
  inputs.forEach(function(element, index){
	if (element.value === '') {
      alert('빈 칸이 있어요.');
      isEmpty = true;
      return false;
    }
});
  return isEmpty;
}
//버튼 클릭시 이벤트
document.getElementById("google-submit").click(function () {
  if (checkInput()) { return; }

      isLoading(true);

      let request = new XMLHttpRequest();
    request.open("GET", "", true);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        let response = this.response;
        isLoading(false);

        //일력완료 후 알림
        snackbar.innerHTML = '입력이 완료됐습니다.'.classList.add("show");
          setTimeout(function () {
            snackbar.classList.remove("show");
      },3000)
    }
    request.onerror = function(request, status, error) {
      isLoading(false);
          console.log("code:" + request.status + "\n" + "error:" + error);
          console.log(request.responseText);
    };
    request.send( );

})

  
      