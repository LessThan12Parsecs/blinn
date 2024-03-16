import React from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';

const Editor = ({ initialCode, onChange }) => {

  return (
    <CodeEditor
      value={initialCode}
      language="glsl"
      placeholder="Please enter JS code."
      onChange={(evn) => onChange(evn.target.value)}
      padding={15}
      style={{
        backgroundColor: "#39384B",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        fontSize: '16px', // Increased font size
        height: '100%', 
        width: '100%'
      }}
    />

  );
};

export default Editor;
