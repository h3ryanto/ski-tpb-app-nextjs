import { createClient } from 'redis';

const client = createClient({
    password: '',
    socket: {
        host: '',
        port: 0
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();