require('dotenv/config');
const fs = require('fs');
const path = require('path');

const catalogue = require('./catalogue');

console.log('\n-----------------5gmedia-js-wrapper-----------------\n');

const example = async () => {
  const vnfdList = await catalogue.getVNFDList();
  console.log('---vnf list---');
  console.log(vnfdList);

  const singleVnfd = await catalogue.getVNFD({
    vnfPkgId: '1621907a-1e0c-4d74-a004-ffae8d902e44'
  });
  console.log('---single vnf---');
  console.log(singleVnfd);

  var vnfd = bufferFile('./test/faas_vtranscoder_2_8_4_vnfd.zip');

  const newVnfd = await catalogue.createVNFD({ vnfd });
  console.log('---new vnf---');
  console.log(newVnfd);

  const nsdList = await catalogue.getNSDList();
  console.log('---nsd list---');
  console.log(nsdList);

  const singleNsd = await catalogue.getNSD({
    nsdInfoId: '691a15dc-3419-4e99-aa74-62f43643b4ed'
  });
  console.log('---single nsd---');
  console.log(singleNsd);

  var nsd = bufferFile('./test/faas_vtranscoder_2_8_4_nsd.yaml');

  const newNSD = await catalogue.createNSD({ nsd });
  console.log('---new nsd---');
  console.log(newNSD);
};

function bufferFile(relPath) {
  return fs.createReadStream(path.join(__dirname, relPath));
}

example();
