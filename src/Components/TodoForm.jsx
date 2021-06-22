import { TextField } from "@material-ui/core";
import { useState } from "react";

export default function TodoForm(props) {
  const { submitForm } = props;
  const [Task, setTask] = useState('');
  function handleOnChange(e) {
    setTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!Task) return;
    submitForm(Task);
    setTask("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit} noValidate autoComplete="off" width="100%">
        <TextField
          onChange={handleOnChange}
          id="outlined-basic"
          label="Việc cần làm"
          variant="outlined"
          value={Task}
        />
      </form>
    </div>
  );
}
