import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import Viewer from "./Viewer";
import Input from "./Input";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../public/logo.png";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const App = () => {
  const [editorContent, setEditorContent] = useState(`
  uniform float u_time;
  varying vec2 vUv;

  #define PI 3.14159265359

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  vec2 rotate(vec2 v, float a) {
      float s = sin(a);
      float c = cos(a);
      mat2 m = mat2(c, -s, s, c);
      return m * v;
  }

  void main() {
      vec2 st = vUv * 2.0 - 1.0;
      vec3 color = vec3(0.0);

      for (int i = 0; i < 8; i++) {
          float t = u_time * 0.1 + float(i) * 0.05;
          st = rotate(st, t);
          float radius = length(st);
          float angle = atan(st.y, st.x);
          float f = sin(angle * float(i + 3) + t) * 0.5 + 0.5;
          vec3 layerColor = vec3(0.0);
          if (i == 0) layerColor = vec3(0.1, 0.3, 0.8);
          else if (i == 1) layerColor = vec3(0.2, 0.6, 0.4);
          else if (i == 2) layerColor = vec3(0.8, 0.2, 0.5);
          else if (i == 3) layerColor = vec3(0.5, 0.8, 0.2);
          else if (i == 4) layerColor = vec3(0.3, 0.1, 0.7);
          else if (i == 5) layerColor = vec3(0.7, 0.5, 0.1);
          else if (i == 6) layerColor = vec3(0.1, 0.7, 0.6);
          else if (i == 7) layerColor = vec3(0.9, 0.1, 0.2);

          color += layerColor * f * smoothstep(0.2, 0.5, radius) * random(st + t);
      }
      float t = u_time * 0.2;
      float evolutionFactor = sin(t) * 0.5 + 0.5;
      vec2 evolutionSt = rotate(st, t);
      float evolutionRadius = length(evolutionSt);
      float evolutionAngle = atan(evolutionSt.y, evolutionSt.x);
      float f = sin(evolutionAngle * 10.0 + t) * 0.5 + 0.5;
      vec3 evolutionColor = vec3(1.0, 0.8, 0.2) * f * smoothstep(0.3, 0.6, evolutionRadius) * random(evolutionSt + t);
      color = mix(color, evolutionColor, evolutionFactor);
      gl_FragColor = vec4(color, 1.0);

  }`);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [aiModel, setAiModel] = useState("gpt4"); // State to manage AI model selection
  ``;
  const getEditorContent = () => editorContent;

  const handleModelChange = (event, newModel) => {
    if (newModel !== null) {
      setAiModel(newModel);
    }
  };

const handleSubmit = async (data) => {
  setIsLoading(true); // Set loading to true when the request starts
  // Remove "uniform float time" and "uniform vec2 resolution" before encoding
  let contentToEncode = data.editorContent.replace(
    /uniform float u_time;\nvarying vec2 vUv;\n?/,
    ""
  );
  const encodedFragmentShader = btoa(contentToEncode);
  const encodedData = {
    fragment_shader: encodedFragmentShader,
    instruction: data.inputValue,
    ai_model: aiModel,
  };
  const apiEndpoint = import.meta.env.VITE_BLINN_API_ENDPOINT;
  const url = `${apiEndpoint}/fragment-shader-change`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(encodedData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    // Assuming the API returns the new shader content in base64
    let newEditorContent = atob(result.result);
    // Ensure "varying vec2 vUv; uniform float u_time;" is at the beginning and only once
    newEditorContent = `varying vec2 vUv;\nuniform float u_time;\n${newEditorContent.replace(/varying vec2 vUv;\n|uniform float u_time;\n/g, "")}`;
    setEditorContent(newEditorContent);
  } catch (error) {
    console.error("Error sending data to API:", error);
  } finally {
    setIsLoading(false); // Set loading to false when the request completes
  }
};

  const resetEditorContent = () => {
    setEditorContent(`uniform float u_time;
varying vec2 vUv;

void main() {
    vec3 color = vec3(1.0,1.0,1.0);
    gl_FragColor = vec4(color, 1.0);
}`);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "gray" }}>
      <img
        src={logo}
        alt="Logo"
        style={{
          position: "absolute",
          top: "2%",
          right: "46%",
          width: "200px",
          height: "auto",
          zIndex: 1000,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "#000000",
        }}
      >
        {isLoading ? (
          <CircularProgress
            size={60}
            thickness={4.5}
            style={{ color: "#BDEBF4" }}
          />
        ) : (
          <>
            <div
              style={{
                height: "85%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
              }}
            >
              <Editor initialCode={editorContent} onChange={setEditorContent} />
            </div>
            <div
              style={{
                height: "15%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#161616",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Input
                  getEditorContent={getEditorContent}
                  onSubmit={handleSubmit}
                />
                <IconButton
                  onClick={resetEditorContent}
                  style={{ marginLeft: "10px", color: "white" }}
                  aria-label="reset"
                >
                  <RefreshIcon />
                </IconButton>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ToggleButtonGroup
                  color="primary"
                  value={aiModel}
                  exclusive
                  onChange={handleModelChange}
                  aria-label="AI Model Selection"
                  style={{ color: "white", boxShadow: "0 0 1px #999" }}
                >
                  <ToggleButton
                    value="claude-opus"
                    style={{
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    Claude-Opus
                  </ToggleButton>
                  <ToggleButton
                    value="gpt4"
                    style={{
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    GPT-4o
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Viewer fragmentShader={editorContent} />
      </div>
    </div>
  );
};

export default App;
