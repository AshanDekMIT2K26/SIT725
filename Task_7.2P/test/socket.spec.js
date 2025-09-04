// Import Socket.IO client, server, and chai for assertions
const { io: Client } = require('socket.io-client');
const { server } = require('../app');
const { expect } = require('chai');

let httpServer, baseURL;

// Start the server on a random available port before tests run
before((done) => {
    httpServer = server.listen(0, () => {
        const { port } = httpServer.address();
        baseURL = `http://127.0.0.1:${port}`;
        done();
    });
});

// Close the server after all tests finish
after((done) => httpServer.close(done));

// Test 1: Server should broadcast chat messages to all clients with a timestamp
it('broadcasts chat:message with timestamp', (done) => {
    // Connect a new socket client
    const c = new Client(baseURL, { transports: ['websocket'] });

    // When connected, send a chat message
    c.on('connect', () => c.emit('chat:message', { name: 'Tester', text: 'Hi' }));

    // Listen for chat messages from the server
    c.on('chat:message', (m) => {
        try {
            // Check that the message content matches what was sent
            expect(m.name).to.equal('Tester');
            expect(m.text).to.equal('Hi');
            // Ensure a timestamp field exists
            expect(m).to.have.property('ts');

            // Close client and end test
            c.close();
            done();
        } catch (e) {
            done(e);
        }
    });
});

// Test 2: Server should emit a random number every second
it('emits number periodically', (done) => {
    // Connect a new socket client
    const c = new Client(baseURL, { transports: ['websocket'] });
    let got = false;

    // Listen for "number" events
    c.on('number', (n) => {
        try {
            // Number should be between 0 and 9
            expect(n).to.be.within(0, 9);
            got = true;

            // Close client and end test
            c.close();
            done();
        } catch (e) {
            done(e);
        }
    });

    // Fail the test if no number received within 1.6 seconds
    setTimeout(() => !got && done(new Error('no number received')), 1600);
});
