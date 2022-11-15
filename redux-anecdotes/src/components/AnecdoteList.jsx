import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotesToShow = useSelector(({ anecdotes, filter }) => {
    anecdotes = [...anecdotes];
    anecdotes.sort((a, b) => b.votes - a.votes);

    if (filter) {
      return anecdotes.filter((a) =>
        a.content.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return anecdotes;
    }
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote)).then(() => {
      dispatch(setNotification(`You voted for: ${anecdote.content}`, 2));
    });
  };

  return (
    <div>
      {anecdotesToShow.length === 0 ? (
        <p>None found</p>
      ) : (
        anecdotesToShow.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AnecdoteList;
