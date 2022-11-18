namespace StrangePlaces

open System
open Pholly
open Retry

module Library =
    let rollDice (logger: string -> unit) =
        task {
            let mutable rolls: int list = []
            let random = Random((DateTime.UtcNow.Ticks % (Int32.MaxValue |> int64)) |> int32)
            let rollDice () =
                let roll = random.Next(1,7)
                rolls <- rolls @ [roll]
                roll
            let isSuccessfulDiceRoll diceRoll = if diceRoll >= 5 then diceRoll |> Ok else "Out of range" |> Error
            
            let retryPolicy = Policy.retry [
                retry (upto 10<times>)
                beforeEachRetry (fun _ retryAttempt _ -> $"Retrying attempt %d{retryAttempt}" |> logger)
            ]
            
            match (rollDice >> isSuccessfulDiceRoll) |> retryPolicy with
            | Ok value -> $"Success - returned %d{value}" |> logger
            | Error error -> $"ERROR: %s{error}" |> logger
            
            return rolls |> List.toArray
        }
        
    let hello name =
        task {
            let hello = $"Hello %s{name}"
            printfn $"%s{hello}"
            return hello
        }
        
        