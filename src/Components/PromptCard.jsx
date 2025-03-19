export default function PromptCard({ prompt, buttons }) {
  return (
    <article id="prompt">
      <section>
        <h2>{prompt}</h2>
      </section>
      <section>
        {buttons.map((btn, i) => (
          <button key={i} onClick={btn.onClick}>
            {btn.content}
          </button>
        ))}
      </section>
    </article>
  );
}
