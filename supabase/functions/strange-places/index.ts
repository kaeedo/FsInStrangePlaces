import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { dotnet } from 'https://nrbugkfcgdkezlaqbbeb.supabase.co/storage/v1/object/public/build/dotnet.js'

export function log (text: string) {
  console.log(text)
}

let diceRolls: Number[] = [];
export function setDiceRolls(rolls: Number []) {
  console.log('setting rolls')
  diceRolls = rolls
}

const { setModuleImports, getAssemblyExports, getConfig } = await dotnet
    .withDiagnosticTracing(false)
    .create();

setModuleImports("index.ts", {
    log: log,
    setDiceRolls: setDiceRolls
})

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);

serve(async (req: Request) => {
  const { name } = await req.json()
  console.log(name);
  const data = {
    message: `naming is hard ${name}!`,
  }

  await exports.Program.RollDice();
  console.log('Rolls performed: ', diceRolls)

  return new Response(
    JSON.stringify(diceRolls),
    { headers: { "Content-Type": "application/json" } },
  )
})
