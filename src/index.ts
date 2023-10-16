import dgram from 'dgram';

const address = '239.255.255.250'; // * multicast address
const port = 1982;

const client = dgram.createSocket('udp4');

client.on('message', (msg, rinfo) => {
  console.log(`Response from: ${rinfo.address}:${rinfo.port}`);
  console.log(msg.toString());
});

const buffer = Buffer.from(
  [
    'M-SEARCH * HTTP/1.1',
    `HOST: ${address}:${port}`,
    'MAN: "ssdp:discover"',
    'ST: wifi_bulb',
  ].join('\r\n'),
);

client.send(buffer, port, address, (err) => {
  if (err) {
    console.log('Failed to send:', err);
  }
});
