![SVG Spirit logo](img/logo.svg)

# SVG Spirit - SVG spritesheet generator

SVG Spirit is a browser based application for creating SVG icon spritesheets. It
takes a set of SVG files and outputs a single SVG file containing symbols that
can be referenced by id and embedded into an HTML page.

## Features

- Support for Figma, Illustrator, Affinity Design files
- Real-time preview
- Assign CSS variables for specific colors and stroke widths
- Dark mode

## How to use?

Go to [svgspirit.dev](https://svgspirit.dev/) to use the officially released
version.

## Installation

The application can be installed in supported browsers (Chrome, Chrome-based,
Safari), which adds a desktop icon and runs the application in its own window.

Once installed, the app will automatically update on its own in the background.

## Local development

Prepare the development environment:

- Install NodeJS (LTS)
- Install dependencies: `npm install`

To bring the local server up use the following command:

```shell
npm run dev
```

To compile the production build:

```shell
npm run build
```

## Architecture notes

### Needs

- Companion to online and offline desktop applications
- Likely used on adequately powered computers that can support design software
- Likely used on larger screens typical of designer setups
- May also be needed on a tablet computer
- May be needed offline sometimes
- May be needed for long-term projects that span multiple days

### High-level requirements

- Offline-capable - function without an Internet connection
- Resumable - be able to retain the state across reloads
- Installable - be installable as a standalone desktop app
- Desktop-first - be fully functional on a desktop computer or a laptop, mobile
  devices are secondary

## Design notes

File organization is as follows:

- `data` contains modules that define initial states and constants
- `features` contains modules that implement features
- `howto` contains module that provide application-specific functionality 
  that is shared by multiple features
- `lib` contains more general-purpose code

Features planned for later should include a single `TODO` comment.

Application state is entirely contained in the global shared state called 
"application context". This object is created in the `index.app.js` module 
and is shared with all features. Feature modules will pass the context 
information to other modules as needed.

Icons are serialized into SVG and deserialized into proper SVG nodes. These 
nodes are used as application state. Prior to rendering, a new SVG document 
is created and all icons are added to this document. The document is further 
processed based on the user-specified configuration and then converted to an 
object URL.

Local storage is used to store user preferences and the serialized copy of 
the current project.

## License

This code base is made available to you under the terms of the MIT license. 
See the `LICENSE` file for details.
