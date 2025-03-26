export default function Kofi() {
  const markup = {
    __html: `
    <iframe id="kofiframe"
    src="https://ko-fi.com/velvetthefurry/?hidefeed=true&widget=true&embed=true&preview=true"
    style="
    border:none;
    width:100
    padding:4px;
    " 
    height="100%"
    width="100%"
    title="velvetthefurry">
    </iframe>`
  };

  return (
    <>
      <div id="kofi-container" dangerouslySetInnerHTML={markup}></div>;
    </>
  );
}
