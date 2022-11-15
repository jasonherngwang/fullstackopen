import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.inputText.value;
    e.target.inputText.value = "";

    await dispatch(createAnecdote(content));
    dispatch(setNotification(`Added anecdote: ${content}`), 2);
  };

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="inputText" type="text" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
