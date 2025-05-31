import express from 'express';

const app = express();

app.use('/', (req, res) => {
    return res
        .status(200)
        .json({ status: 'success', message: 'Server is running Fine' });
});

app.listen(5000, () => {
    console.log('Running on port 5000');
});
