// Interface for player
interface Player{
    id: number;
    name: string;
    wins: number;
    losses: number;
    totalScore: number;
}

export const players: Player[] = [
    {id: 1, name: "ShadowStrike", wins: 15, losses: 5, totalScore: 28500},
    {id: 2, name: "NoobMaster", wins: 3, losses: 12, totalScore: 4200},
    {id: 3, name: "ProGamer99", wins: 0, losses: 0, totalScore: 0},
];

export function Rating(player: Player): string {
   const totalGames = player.wins + player.losses;
   if (totalGames === 0) {
       return "0.00";
   }
   return ((player.wins/totalGames) * 100 + (player.totalScore / totalGames)).toFixed(2);
};