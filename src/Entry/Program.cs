using System.Threading.Tasks;
using System.Runtime.InteropServices.JavaScript;
using Microsoft.FSharp.Core;

public partial class Program
{
    [JSExport]
    internal static async Task<string> Say(string name)
    {
        var hello = await StrangePlaces.Library.hello(name);

        return $"{hello}";
    }
    
    [JSExport]
    public static async Task RollDice()
    {
        var logger = FuncConvert.FromAction(new Action<string>(Log));
        var rolls = await StrangePlaces.Library.rollDice(logger);
        
        SetDiceRolls(rolls);
    }
    
    [JSImport("log", "index.ts")]
    internal static partial void Log(string stuff);
    
    [JSImport("setDiceRolls", "index.ts")]
    internal static partial void SetDiceRolls([JSMarshalAs<JSType.Array<JSType.Number>>]int[] rolls);
    // https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/import-export-interop?view=aspnetcore-7.0#call-javascript-from-net
    
    public static async Task Main(string[] args)
    {
        var hello = await StrangePlaces.Library.hello("wefwefwef");
        Console.WriteLine(hello);
    }
}
