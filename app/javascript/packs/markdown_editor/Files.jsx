import React, { useState } from "react";
import classNames from "classnames";

const getFiles = () => {
  const filesElement = document.getElementById("topic-files-json");
  return JSON.parse(filesElement.textContent);
};

export default function Files(props) {
  const files = getFiles();

  return (
    <div className="files">
      {files.map((file, index) => {
        return <div key={index} className="file">{file.file_name}</div>;
      })}
    </div>
  );
}
