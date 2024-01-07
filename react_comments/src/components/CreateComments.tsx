import { useEffect, useReducer } from "react";
//댓글 작성폼, 데이터 스프레드시트로 보내기

function reducer(state: any, action: any) {
  switch (action.type) {
    case "ONCHANGE_FORM":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "ONSUBMIT_FORM":
      const getCommentsId = Math.floor(Math.random() * 10000000000000);
      const getCommentsDate = new Date().toLocaleString();

      return {
        ...state,
        commentsId: getCommentsId,
        date: getCommentsDate,
      };
  }
}

function CreateComments() {
  const [formState, dispatch] = useReducer(reducer, {
    commentsId: 0,
    nickname: "",
    password: "",
    content: "",
    date: "",
    reply: {},
  });

  let { nickname, password, content } = formState;

  const handleChangeForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "ONCHANGE_FORM",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      nickname === "" &&
      formState.password === "" &&
      formState.content === ""
    ) {
      return alert("작성되지않은 빈칸이 존재합니다.");
    }
    dispatch({ type: "ONSUBMIT_FORM" });
    console.log(formState);
    fetch(
      "https://script.google.com/macros/s/AKfycbwrycsxPh3pRMnFBf_kZ62Kx_jBwMbZurkSsdpGkaBXS5TONVQDWBnUxDqm6JL4EtqA/exec",
      {
        method: "POST",
        body: JSON.stringify(formState),
      }
      // {
      //   headers: {
      //     "Content-Type": "text/plain;charset=utf-8",
      //   },
      // },
      // formState
    )
      .then((res) => {
        alert("입력 완료.");
        console.log(res);
        // isLoading(false);
        // $commentForm.reset();
      })
      .catch((error) => {
        console.log(error);
        alert("에러");
        // isLoading(false);
      });
  };
  // useEffect(() => {
  //   // 비동기 작업이 완료된 후에 로그 출력
  //   console.log(formState);
  // }, [formState]);

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        name="nickname"
        type="text"
        value={nickname}
        onChange={handleChangeForm}
        maxLength={20}
      />
      <input
        name="password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={handleChangeForm}
      />
      <textarea
        name="content"
        value={content}
        onChange={handleChangeForm}
      ></textarea>
      <button name="submit_btn">Submit</button>
    </form>
  );
}

export default CreateComments;
