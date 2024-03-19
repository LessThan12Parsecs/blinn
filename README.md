```
                            ██████╗ ██╗     ██╗███╗   ██╗███╗   ██╗
                            ██╔══██╗██║     ██║████╗  ██║████╗  ██║
                            ██████╔╝██║     ██║██╔██╗ ██║██╔██╗ ██║
                            ██╔══██╗██║     ██║██║╚██╗██║██║╚██╗██║
                            ██████╔╝███████╗██║██║ ╚████║██║ ╚████║
                            ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝
```

# Blinn: Explore Shaders with LLMs

Welcome to **Blinn**, a tool to play around with fragment shaders, with live changes and AI prompting.

The name **Blinn** is in recognition of Jim Blinn, a pioneering computer scientist whose work has significantly influenced the field of computer graphics. His contributions to the development of texture mapping and the Blinn-Phong shading model have laid foundational principles that continue to shape how we render and perceive digital imagery today.


## Features Checklist

- [x] **Real-time Shader Editing**: Blinn provides a real-time editing environment for fragment shaders, allowing you to see the effects of your code as you type.

<p align="center">
  <img src="public/editing.gif" alt="Real-time Shader Editing">
</p>

- [x] **AI Assistance**: Leverage the capabilities of Claude through the [blinn-api](https://github.com/lessthan12parsecs/blinn-api) to generate shader code, optimize performance, and get creative suggestions.
- [x] **Three.js Integration**: Built on top of Three.js, Blinn offers a seamless experience for those familiar with the library and those new to 3D web development.
- [ ] **Vertex Shaders**: Write and explore vertex shaders applied to geometric primitives. (Possibly add your meshes later).
- [ ] **Preloaded Examples**: Jump straight into shader development with preloaded examples showcasing what's possible with Blinn and Three.js. 
- [ ] **Explain**: Ask questions about specific parts of the shader.
- [ ] **Record**: Record shader and download it in video/gif format.

## Configuration

Before running Blinn, you need to set up an environment variable to connect with the Blinn API. Create a `.env` file in the root of your project and add the following line:
```
VITE_BLINN_API_ENDPOINT="YOUR_API_ENDPOINT_HERE"
```

## Getting Started

To get started with Blinn, clone the repository and install the dependencies:
```bash
git clone https://github.com/lessthan12parsecs/blinn.git
cd blinn
npm install
npm run dev
```

## License

Blinn is open-sourced software licensed under the MIT license. See [LICENSE.md](LICENSE.md) for more details.


## Author

- **Emanuel Ramirez** - *Initial author* - [LessThan12Parsecs](https://github.com/LessThan12Parsecs)
