function handleBGColorChange(e) {
  document.documentElement.style.setProperty("--main-bg-color", e.target.value);
}

function handleFontSizeChange(e) {
  console.log(e.target.value);
  document.documentElement.style.setProperty(
    "--main-font-size",
    e.target.value + "rem"
  );
}

export default function Accessibility() {
  return (
    <section>
      <input onChange={handleBGColorChange} type="color" name="" id="" />
      <input
        onChange={handleFontSizeChange}
        type="range"
        min={0.4}
        max={2}
        step={0.1}
        name=""
        id=""
      />
    </section>
  );
}
