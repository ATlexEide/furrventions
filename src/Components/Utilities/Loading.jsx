export default function Loading({ text }) {
  return (
    <div id="loading">
      <div className="loader"></div>
      <div className="loader-text">{text}</div>
    </div>
  );
}
