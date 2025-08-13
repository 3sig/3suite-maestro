import config from '3lib-config';
import orchestrator from '3lib-orchestrator';
import { execa } from 'execa';
import fs from 'fs';

config.init();
console.log(config.get());

// Get orchestrator config file name from maestro config
const orchestratorConfigFile = config.get("orchestratorConfigFile", "config.json5");

// Download and setup all dependencies (including 3suite-orchestrator)
await orchestrator.setupDev(orchestratorConfigFile);

// Read deps.json to get the actual orchestrator filename
const devDependenciesLocation = config.get("devDependenciesLocation", ".");
const depsPath = `${devDependenciesLocation}/deps.json`;
const deps = JSON.parse(fs.readFileSync(depsPath, 'utf8'));
const orchestratorFilename = deps["3sig/3suite-orchestrator"].filename;
const orchestratorExec = `${devDependenciesLocation}/${orchestratorFilename}`;
// const configFile = `${devDependenciesLocation}/config.json5`;

console.log("Starting 3suite-orchestrator...");
console.log(orchestratorExec, orchestratorFilename);
const orchestratorProcess = execa("./" + orchestratorFilename, ["-f", "config.json5"], {cwd: devDependenciesLocation});

// Stream output
for await (const result of orchestratorProcess) {
  console.log(result);
}
