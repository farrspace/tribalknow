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
    .then((response) => {
       if (response.data) {

       }
    })
    .catch(e => {
      console.log("fail", e);
    });
}
