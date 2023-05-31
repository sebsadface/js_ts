import { Request, Response } from "express";


/** Returns a list of all the named save files. */
// export function Dummy(req: Request, res: Response) {
//   const name = first(req.query.name);
//   if (name === undefined) {
//     res.status(400).send('missing "name" parameter');
//   } else {
//     res.json(`Hi, ${name}`);
//   }
// }


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
function first(param: any): string|undefined {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
}

type DraftPick = {
  num: number,
  drafter: string,
  option: string
}

// RI: 0 <= rounds * drafters.length <= options.length
// RI: 0 <= picks.length <= rounds * drafters.length
// A draft is complet if picks.length == rounds * drafters.length
type Draft = {
  id: number,
  rounds: number,
  drafters: Array<string>,
  options: Array<string>,
  picks: Array<DraftPick>
}

const drafts: Map<number, Draft> = new Map();

export function listDraft(req: Request, res: Response) {
  const id = first(req.query.id);
  if (id === undefined || typeof id !== 'string') {
    res.status(400).send('missing "id" parameter');
    return;
  }

  const draft = drafts.get(Number(id));
  if (draft === undefined) {
    res.status(400).send(`draft with id ${id} not found`);
    return;
  } 

  res.send(draft);
}

export function pickInDraft(req: Request, res: Response) {
  const id = first(req.query.id);
  if (id === undefined || typeof id !== 'string') {
    res.status(400).send('missing "id" parameter');
    return;
  }

  const draft = drafts.get(Number(id));
  if (draft === undefined) {
    res.status(400).send(`draft with id ${id} not found`);
    return;
  } 

  const drafter = first(req.query.drafter);
  if (drafter === undefined || typeof drafter !== 'string') {
    res.status(400).send('missing "drafter" parameter');
    return;
  }

  const option = first(req.query.option);
  if (option === undefined || typeof option !== 'string') {
    res.status(400).send('missing "option" parameter');
    return;
  }
  const pick: DraftPick = {
    num: draft.picks.length + 1,
    drafter: drafter,
    option: option
  }

  draft.picks.push(pick);
  res.send(draft);
}

export function createDraft(req: Request, res: Response) {
  const rounds = first(req.query.rounds);
  if (rounds === undefined || typeof rounds !== 'string') {
    res.status(400).send('missing "rounds" parameter');
    return;
  }

  const drafters = first(req.body.drafters);
  if (drafters === undefined || typeof drafters !== 'string') {
    res.status(400).send('missing "drafters" body');
    return;
  }

  const options = first(req.body.options);
  if (options === undefined || typeof options !== 'string') {
    res.status(400).send('missing "options" body');
    return;
  }

  const draft: Draft = {
    id: idGenerator(),
    rounds: Number(rounds),
    drafters: drafters.trim().split("\n"),
    options: options.trim().split("\n"),
    picks: new Array<DraftPick>
  };
  drafts.set(draft.id, draft);
  res.send(draft);
}

function idGenerator(): number {
  return drafts.size;
}