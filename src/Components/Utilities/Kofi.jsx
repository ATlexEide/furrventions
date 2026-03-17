export default function Kofi() {
  const markup = {
    __html: `
    <iframe id="kofiframe"
    src="https://ko-fi.com/velvetthefurry/?hidefeed=true&widget=true&embed=true&preview=true"
    style="
    border:none;
    min-height:fit-content;
    height:666px;
    width:404px;
    "
    title="velvetthefurry">
    </iframe>`
  };
  // const markup = {
  //   __html: `
  //   <iframe id='kofiframe' src='https://ko-fi.com/velvetthebnuuy/?hidefeed=true&widget=true&embed=true&preview=true' style='border:none;width:100%;padding:40px;background:red;' height='712' title='velvetthebnuuy'></iframe>`
  // };

  return (
    <>
      <div id="kofi-container" dangerouslySetInnerHTML={markup}></div>
    </>
  );
}
