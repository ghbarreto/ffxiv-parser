const express = require('express');
const app = express();

require('./routes/characters/character')(app);
require('./routes/fc/standings')(app);

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
});
