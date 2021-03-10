import React, { useState } from "react";
import classNames from "classnames";
import { FileDrop } from "react-file-drop";

import Uploader from './Uploader'

const getFiles = () => {
  const filesElement = document.getElementById("topic-files-json");
  return JSON.parse(filesElement.textContent);
};

const onDrop = (files, event) => {
  let file, i;
  for (i = 0; i < files.length; i++) {
    file = files.item(i);
    console.log(file);
    console.trace();
    Uploader({file: file, url: "/topics/my-testing-topic/topic_files"})
  }
};

export default function Files(props) {
  const files = getFiles();

  return (
    <div className="files">
      {files.map((file, index) => {
        return (
          <div key={index} className="file">
            {file.file_name}
          </div>
        );
      })}

      <FileDrop onDrop={onDrop}>FileDrop</FileDrop>
    </div>
  );
}
