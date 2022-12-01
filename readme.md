# F# in strange places

Compiling F# to WebAssembly so that an F# lib may be used from a Deno runtime, such as Supabase edge functions.

This is the accompanying blog post for the [F# Advent Calendar 2022](https://sergeytihon.com/2022/10/28/f-advent-calendar-in-english-2022/)
https://hashset.dev/article/19_f_in_strange_places_supabase_edge_functions

## Requirements

- dotnet v7
- `dotnet workload install wasm-tools`
- supabase cli