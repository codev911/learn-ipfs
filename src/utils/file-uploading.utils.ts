import * as path from 'path';
import * as fs from 'fs';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = path.extname(file.originalname);
  const randomName = Array(8)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const generatePath = (req, file, callback) => {
  let today = new Date().toISOString();
  let randomName = Array(8)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  fs.mkdir(path.join(__dirname,`../../files/${today}-${randomName}`), {recursive: true}, (err) => {
    if (err) {
        return console.error(err);
    }
    callback(null, `./files/${today}-${randomName}`);
  });
};