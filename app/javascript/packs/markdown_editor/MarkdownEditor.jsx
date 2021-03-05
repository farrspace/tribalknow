import React, { useState, useCallback } from "react";
import Showdown from "showdown";
import classNames from "classnames";
import Toolbar from "./Toolbar";

const converter = new Showdown.Converter({
  ghCodeBlocks: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tables: true,
  tasklists: true,
  openLinksInNewWindow: true
});

converter.setFlavor("github");

const previewHTML = markdown => {
  return converter.makeHtml(markdown);
};

const getText = () => {
  return document.getElementById("topic_content").value;
};

const scrollPreview = (e, previewRef) => {
  const proportion = e.currentTarget.scrollTop / e.currentTarget.scrollHeight;
  previewRef.current.scrollTop = proportion * previewRef.current.scrollHeight;
};

export default function MarkdownEditor() {
  const [value, setValue] = React.useState(getText());

  const [currentView, setCurrentView] = React.useState("editor");
  const [fontStyle, setFontStyle] = React.useState("normal");
  const [autoScroll, setAutoScroll] = React.useState(true);

  const handleChange = useCallback(event => setValue(event.target.value), [setValue, previewHTML]);
  const showHidePreview = useCallback(() => setShowPreview(!showPreview));

  let showBoth = currentView == "both";
  const showEditor = currentView == "editor" || showBoth;
  const showPreview = currentView == "preview" || showBoth;

  const previewRef = React.useRef(null);

  const attachToEditorScroll = showBoth && autoScroll;
  const onEditorScroll =
    (attachToEditorScroll &&
      (e => {
        scrollPreview(e, previewRef);
      })) ||
    null;

  return (
    <div className="markdown_editor">
      <Toolbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
      />
      <div className={classNames("markdown_editor__editor_windows", { "columns-editor-layout": showBoth })}>
        {showEditor && (
          <textarea
            name="topic[content]"
            className={classNames("markdown_editor__editor", "form-control", { monospace: fontStyle == "monospace" })}
            value={value}
            onChange={event => setValue(event.target.value)}
            onScroll={onEditorScroll}
          />
        )}
        {showPreview && (
          <div className="markdown_editor__preview">
            <div
              ref={previewRef}
              className="markdown_editor__preview_content border border-secondary"
              dangerouslySetInnerHTML={{ __html: previewHTML(value) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
