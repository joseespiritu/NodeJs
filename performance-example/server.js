const express = require('express');

const app = express();

const delay = (duration) => {
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {
        // event loop is blocked
    }
}

app.get('/', (req, res) => {
    res.send('Performance example');
});

app.get('/timer', (req, res) => {
    // Delay time
    delay(9000);
    res.send('Ding');
});

app.listen(3000);