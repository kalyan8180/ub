/*
let express = require('express');
let app = express();
const path = require('path');
let rootPath = path.normaize(__dirname + '/dist/')
let port = process.env.PORT || 4200;

let fs = require('fs');
let filename = rootPath + 'assets/appconfig.json'
let file = require(filename);
file.serviceBaseUrl = process.env.BUILDER_API_URL || '';
fs.writeFile()
*/

import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core'
import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

const PORT = 8084;

enableProdMode();

const app = express();

app.get('*.*', express.static(join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});