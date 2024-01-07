import React, { useState } from "react";

export default function MyForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const { name, description } = form;

  const onChange = (e: React.ChangeEventHandler<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEventHandler<HTMLFormElement>) => {};

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
    </form>
  );
}
