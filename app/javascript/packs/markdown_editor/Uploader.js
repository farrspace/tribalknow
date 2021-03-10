import axios from "axios";

export default function Uploader({ file, url, progressCallback, loadCallback }) {
  progressCallback = progressCallback || (() => {});
  loadCallback = progressCallback || (() => {});

  let formData = new FormData();
  formData.append("file", file);

  axios({
    method: "post",
    url: url,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
    },
    onUploadProgress: progressCallback
  })
    .then(() => {
      console.log("success");
    })
    .catch(e => {
      console.log("fail", e);
    });

  // const xhr = new XMLHttpRequest();

  // this.xhr.upload.addEventListener("progress", function(e) {
  //   if (e.lengthComputable) {
  //     const percentage = Math.round((e.loaded * 100) / e.total);
  //     progressCallback(percentage)
  //   }
  // }, false);

  // xhr.upload.addEventListener("load", function(e){
  //   progressCallback(100);
  //   loadCallback(e)
  // }, false);

  // xhr.open("POST", url);
  // xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
  // reader.readAsBinaryString(file);
}
