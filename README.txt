Setup

npm install 

Change src/index.js line 9 to what account index you 
want to use as IDP.

Run

Run single IDP
CONFIG_FILE=___directory to config file from verde-ethereum___ \
SERVER_PORT=___web server port___ \
MIN_APPROVE=___min approval to success authen___ \
npm start

To run multiple IDP
Change IDP_ADDR and SERVER_PORT to be different for each idp and 
run the above commands.
