# 3suite-maestro

3suite-maestro is a standalone orchestrator that combines the downloading capabilities of 3lib-orchestrator with the process management of 3suite-orchestrator.

## How it works

1. Uses 3lib-orchestrator to download and set up 3suite components from GitHub releases
2. Runs the downloaded 3suite-orchestrator instance to manage the processes

## Configuration

The `config.json5` file contains configuration for both 3suite-maestro and the orchestrator processes:

- `orchestratorConfigFile`: Which config file to pass to 3lib-orchestrator (defaults to "config.json5")
- `devDependenciesLocation`: Where to download dependencies (defaults to "orchestrator-deps")
- `processes`: Array of processes for 3lib-orchestrator to download and manage
- `configs`: Named configurations that processes can reference via `loadConfig`

## Usage

Run with:
```
bun main.js
```

Or with custom config:
```
bun main.js -f custom-config.json5
```

## Creating a Release

Create a tag:
```
git tag -a v1.0.0 -m "release v1.0.0"
```

Push the tag:
```
git push origin tag v1.0.0
```

### macOS builds

For macOS builds, flag as safe for gatekeeper:
```
xattr -c <path_to_mac_executable>
```
