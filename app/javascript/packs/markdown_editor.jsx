import React from "react";
import ReactDOM from "react-dom";
import MarkdownEditor from "./markdown_editor/MarkdownEditor.jsx";

const form = document.getElementsByClassName("edit_topic")[0];
const railsTextArea = document.getElementById("topic_content");

form.onsubmit = function () {
  const reactTextArea = document.getElementsByClassName("markdown_editor__editor")[0];
  railsTextArea.value = reactTextArea.value;
};

railsTextArea.style.cssText = "display: none;";

const mountPoint = document.getElementById("react-markdown-editor");
ReactDOM.render(<MarkdownEditor />, mountPoint);
