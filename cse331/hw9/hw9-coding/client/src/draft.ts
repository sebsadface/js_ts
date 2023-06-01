export type DraftPick = {
  num: number,
  drafter: string,
  option: string
}

// RI: 0 <= rounds * drafters.length <= options.length
// RI: 0 <= picks.length <= rounds * drafters.length
// A draft is complet if picks.length == rounds * drafters.length
export type Draft = {
  id: number,
  rounds: number,
  drafters: Array<string>,
  options: Array<string>,
  picks: Array<DraftPick>,
  availableOps: Array<string>,
  currentDrafter: string,
  complete: boolean,
  currentRound: number
}
