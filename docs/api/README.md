bedrock-development / [Exports](modules.md)

# Bedrock-Development

An API for generating and modifying files used in Minecraft Bedrock Addon development. Includes a CLI for accessing certain features from the command line

## Requirements

Node.js. If you haven't already installed it, download it [here](https://nodejs.org/en/).

## Usage

This package includes both an API and a CLI. The API exposes many functions and classes that can be used to automate file generation and modification in your Bedrock project, while the CLI allows quick use of some of the more common API features directly from the terminal.

### Working With Addons

Addons require specific subfolder and namespace structures that cannot always be inferred at runtime. To resolve this, you can specify the addon's namespace which will be automatically prefixed to identifiers and used to generate nested subfolders in the relevant paths. You can specify the namespace with a few methods:

1. Using a `bedrock.config.json` file in the root of your project. Note that when used with the API, you will also need to call the function [impementConfig](docs/api/modules.md#implementconfig), the CLI performs this automatically. The file contents should be as follows, ideally with only one underscore seperating the team name from the project name and no spaces:

```json
{
	"addon_namespace": "<team>_<project>"
}
```

This can generated with the command:

```
bed format addon <team>_<project>
```

2. Using the `--addon <name>` argument in the CLI, this will set the addon values for that specific command.

3. Using the [setAddonName](docs/api/modules.md#setaddonname) function when working with the API. This should be done at the beginning of execution.

### The API

Working with the API directly involves adding this project as an npm dependency with the command:

```
npm i bedrock-development@latest
```

You can then create JS/TS files at the root of your project and import the `bedrock-development` module. Eventually, examples will be included to demonstrate some uses of the API and how the environment should be configured.

You can view the API documentation [here](docs/api/modules.md).

### The CLI

You can install the CLI globally on your machine with the command:

```
npm i bedrock-development@latest -g
```

Check that it has installed with:

```
bed --version
```

**Make sure you are in the root of your project when using the CLI**. You can view the full list of available commands [here](docs/commands/commands.md).

## Changelog

View the changelog [here](docs/changelog.md).
