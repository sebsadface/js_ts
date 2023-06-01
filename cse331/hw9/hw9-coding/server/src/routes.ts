import { Request, Response } from "express";

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
  picks: Array<DraftPick>,
  availableOps: Array<string>,
  currentDrafter: string,
  complete: boolean,
  currentRound: number
}

// a map from draft id to drafts
const drafts: Map<number, Draft> = new Map();

/**
 * Process a list draft request and send a respond with a draft with the given id.
 * @param req  the request with the id parameter
 * @param res the draft with the given id, or Bad Request if no such draft exists
 * @requires req.query.id is not undefined, is a string, and is a valid draft id.
 * @effects res is sent with the draft with the given id, or Bad Request if no such draft exists
 */
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

/**
 * Process a pick in draft request and send a respond with the updated draft with the given id.
 * @param req the request with the id, drafter, and option parameters
 * @param res the updated draft with the given id, or Bad Request if no such draft exists
 * @requires req.query.id is not undefined, is a string, and is a valid draft id.
 * @requires req.query.drafter is not undefined, is a string, and is a valid drafter.
 * @requires req.query.option is not undefined, is a string, and is a valid option.
 * @effects res is sent with the updated draft with the given id, or Bad Request if no such draft exists
 */
export function pickInDraft(req: Request, res: Response) {
  const id = first(req.query.id);
  if (id === undefined || typeof id !== 'string') {
    res.status(400).send('missing "id" parameter');
    return;
  }

  const draft = drafts.get(Number(id));
  if (draft === undefined) {
    res.status(404).send(`draft with id ${id} not found`);
    return;
  } 

  if (draft.complete) {
    res.status(400).send(`draft with id ${id} is already complete`);
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
  };

  draft.picks.push(pick);
  draft.availableOps.splice(draft.availableOps.indexOf(option), 1);

  if (draft.availableOps.length === 0) {
    draft.complete = true;
  } else if (draft.currentDrafter === draft.drafters[draft.drafters.length - 1]) {
    if (draft.currentRound + 1 > draft.rounds) {
      draft.complete = true;
    } else {
      draft.currentRound += 1;
      draft.currentDrafter = draft.drafters[0];
    }
  } else {
    draft.currentDrafter = draft.drafters[draft.drafters.indexOf(drafter) + 1];
  }

  res.send(draft);
}

/**
 * Process a create draft request and send a respond with the created draft.
 * @param req the request with the rounds, drafters, and options parameters
 * @param res the created draft, or Bad Request if the request is invalid
 * @requires req.query.rounds is not undefined, is a string, and is a valid number of rounds
 * @requires req.body.drafters is not undefined, is a string, and is a string of drafters seperated by newlines '\n'
 * @requires req.body.options is not undefined, is a string, and is a string of options seperated by newlines '\n'
 * @effects res is sent with the created draft, or Bad Request if the request is invalid
 */
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
    picks: new Array<DraftPick>,
    availableOps: options.trim().split("\n"),
    currentDrafter: drafters.trim().split("\n")[0],
    complete: false,
    currentRound: 1
  };
  drafts.set(draft.id, draft);
  res.send(draft);
}

/**
 * Process a check id request and send a respond with whether the draft with the given id exists.
 * @param req the request with the id parameter
 * @param res whether the draft with the given id exists
 * @requires req.query.id is not undefined, is a string, and is a valid draft id.
 * @effects res is sent with whether the draft with the given id exists
 */ 
export function checkId(req: Request, res: Response) {
  const id = first(req.query.id);
  if (id === undefined || typeof id !== 'string') {
    res.status(400).send('missing "id" parameter');
    return;
  }

  const draft = drafts.get(Number(id));
  if (draft === undefined) {
    res.send(false);
  } else {
    res.send(true);
  }
}

/**
 * Generate a unique id for a draft.
 * @returns a unique id for a draft
 */
function idGenerator(): number {
  return drafts.size;
}