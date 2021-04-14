import React, { useState } from "react";
import classNames from "classnames";
import { FileDrop } from "react-file-drop";

import Uploader from './Uploader'

const getFiles = () => {
  const filesElement = document.getElementById("topic-files-json");
  return JSON.parse(filesElement.textContent).topic_files;
};

const onDrop = (files, event) => {
  let file, i;
  for (i = 0; i < files.length; i++) {
    file = files.item(i);
    console.log(file);
    Uploader({file: file, url: "/topics/my-testing-topic/topic_files"})
  }
};

export default function Files(props) {
  const files = getFiles();

  return (
    <div className="files markdown_editor__files">
      {files.map((file, index) => {
        return (
          <div key={index} className="file markdown_editor__file">
            <span className="markdown_editor__file_preview">
              <img src={file.preview_url} />
            </span>
            {file.file_name}
          </div>
        );
      })}

      <FileDrop onDrop={onDrop}>FileDrop</FileDrop>
    </div>
  );
}
