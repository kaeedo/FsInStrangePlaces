import { dotnet } from './dotnet.js'

export function log (text) {
    console.log(text)
}

let diceRolls = [];
export function setDiceRolls(rolls) {
    console.log('setting rolls')
    diceRolls = rolls
}

const { setModuleImports, getAssemblyExports, getConfig } = await dotnet
    .withDiagnosticTracing(false)
    .create();

setModuleImports("main.mjs", {
    log: log,
    setDiceRolls: setDiceRolls
})

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);

await exports.Program.RollDice();

console.log('Rolls performed: ', diceRolls)

Deno.exit(0);