# SDK 5GMedia Javascript Wrapper

## Prerequisites

- Add axios as dependency and dotenv as devDependencies.
- Add .env file to your project if you don't have.
- Add below enviroment variables to your .env file according to your requirment.

###### MONITORING_IP
###### MONITORING_PORT
###### PROMETHEUS_IP
###### PROMETHEUS_PORT
###### C_ADVISOR_IP
###### C_ADVISOR_PORT
###### OSM_IP
###### OSM_PORT
###### OSM_NBI_PORT
###### SERVERLESS_IP
###### SERVERLESS_PORT
###### VIM_EMU_IP
###### VIM_EMU_PORT
###### CNO_IP
###### CNO_PORT

## Usage
- Add .js file which you want to use that interface (osm.js,monitorung.js etc..).
- require files top of your .js file.
- call function asynchronously in your file.

## Example 

```javascript
require('dotenv/config');
var vimEmu = require('./vimEmu.js');

const example = async () => {
  const res = await vimEmu.listDatacenters();
  console.log(res);
};

example();
```