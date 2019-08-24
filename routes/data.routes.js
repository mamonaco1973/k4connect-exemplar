module.exports = (app) => {
    const data = require('../controllers/data.controller.js');

    // Create a new data object.
    app.post('/data', data.create);

    // Retrieve all data object.
    app.get('/data', data.findAll);
    
    // Initialize all objects from original store.
    
    app.put('/init', data.init);

    // Retrieve a single object by the internal _id.
    app.get('/data/:dataId', data.findOne);

    // Update a single object by the internal _id.
    app.put('/data/:dataId', data.update);

    // Delete a single object by the internal _id.
    app.delete('/data/:dataId', data.delete);
}
