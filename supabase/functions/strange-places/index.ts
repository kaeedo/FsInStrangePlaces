// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { dotnet } from 'https://nrbugkfcgdkezlaqbbeb.supabase.co/storage/v1/object/public/build/dotnet.js'
import { log, setDiceRolls, getDiceRolls } from 'https://nrbugkfcgdkezlaqbbeb.supabase.co/storage/v1/object/public/build/main.mjs?t=2022-11-17T14%3A34%3A27.149Z';

console.log("Hello from Functions!")

const { setModuleImports, getAssemblyExports, getConfig } = await dotnet
    .withDiagnosticTracing(false)
    .create();

setModuleImports("main.mjs", {
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
  console.log('Rolls performed: ', getDiceRolls())

  return new Response(
    JSON.stringify(getDiceRolls()),
    { headers: { "Content-Type": "application/json" } },
  )
})
