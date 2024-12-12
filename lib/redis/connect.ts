import { createClient } from 'redis';

const client = createClient({
    password: 'do6HtzKWVcy6oTrOK2mC0R1IFPXfb9GI',
    socket: {
        host: 'redis-15730.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com',
        port: 15730
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();