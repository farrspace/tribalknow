import React from "react";
import ReactDOM from "react-dom";
import MarkdownEditor from "./markdown_editor/MarkdownEditor.jsx";
import Files from "./markdown_editor/Files.jsx";

const form = document.getElementsByClassName("edit_topic")[0];
const railsTextArea = document.getElementById("topic_content");

form.onsubmit = function () {
  const reactTextArea = document.getElementsByClassName("markdown_editor__editor")[0];
  railsTextArea.value = reactTextArea.value;
};

railsTextArea.style.cssText = "display: none;";

const editorMountPoint = document.getElementById("markdown-editor-mount");
ReactDOM.render(<MarkdownEditor />, editorMountPoint);

const filesMountPoint = document.getElementById("editor-files-mount");
ReactDOM.render(<Files />, filesMountPoint);
