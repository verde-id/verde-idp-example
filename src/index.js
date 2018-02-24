import fs from 'fs'

if(!process.env.CONFIG_FILE) throw 'Please specify config file';
let config = JSON.parse(fs.readFileSync(process.env.CONFIG_FILE).toString());
process.env.REQUESTS_CONTRACT_ADDR = config.contractAddress.request; 
process.env.DIRECTORY_CONTRACT_ADDR = config.contractAddress.directory;

//change these if you want more than one IDP
process.env.IDP_ADDR = config.partyAddress[0];
if(!process.env.SERVER_PORT) process.env.SERVER_PORT = 8181;
if(!process.env.MIN_APPROVE) process.env.MIN_APPROVE = 1;

require('source-map-support/register');

require('./greenBoxApi');
require('./web/server');
