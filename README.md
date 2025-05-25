# Color Light Simulator

> An interactive React component to tweak light color (L\*a\*b), intensity, and material roughness in real time using [chroma.js](https://gka.github.io/chroma.js/).

![screenshot](./docs/screenshot.png)

---

## Table of Contents

- [Features](#features)  
- [Demo](#demo)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Styles & Assets](#styles--assets)  
- [Usage](#usage)  
  - [Importing](#importing)  
  - [Props API](#props-api)  
- [Presets](#presets)  
- [Customization](#customization)  
- [Contributing](#contributing)  
- [License](#license)  
- [Keywords](#keywords)  

---

## Features

- 🎨 **Interactive Color Picker**  
  - Swatch-based or hex input for custom tints  
  - Converts hex ↔ L\*a\*b for accurate color math  

- 🔆 **Intensity Control**  
  - Numeric input (0–100%) + slider (0.00–1.00)  
  - Instant feedback on light strength  

- 🗿 **Roughness Simulation**  
  - Presets from glass to rock, plus custom slider  
  - Numeric input + range control  

- 🚀 **Zero Dependencies (besides React & chroma.js)**  
- ⚛️ **Fully TypeScript-typed**  
- 🎛️ **Easy to integrate** into any React-based renderer or demo  

---

## Demo

Try the live demo in your browser (coming soon!) or clone and run the example:

```bash
git clone https://github.com/yourusername/color-light-simulator.git
cd color-light-simulator
npm install
npm start
