import { Request, Response } from "express";


/** Returns a list of all the named save files. */
export function Dummy(req: Request, res: Response) {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(500).send('missing "name" parameter');
  } else {
    res.json(`Hi, ${name}`);
  }
}


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

// Representation of an individual file.
type File = {
  name: string,
  content: string
};

// Map from file name to file contents.
let files: Map<string, File> = new Map();

// Saves a file with the given name and content.
// Returns the file that was saved.
export function saveFile(req: Request, res: Response) { 
  const name = first(req.query.name);
  if (name === undefined || typeof name !== 'string') {
    res.status(500).send('missing "name" parameter');
    return;
  } 

  const content = req.body.content;
  if (content === undefined) {
    res.status(500).send('missing "content" body');
    return;
  }

  const file: File = {
    name: name,
    content: content
  };

  files.set(file.name, file);
  res.send(file);
}

// Returns the file with the given name.
export function loadFile(req: Request, res: Response) {
  const name = first(req.query.name);
  if (name === undefined || typeof name !== 'string') {
    res.status(500).send('missing "name" parameter');
    return;
  } 

  if (!files.has(name)) {
    res.status(400).send(`file with name ${name} doesn't exists`);
    return;
  }

  res.json(files.get(name));
}

// Returns a list of all the named save files.
export function listFile(_: Request, res: Response) {
  const keys = Array.from(files.keys());
  res.send({names: keys});
}
