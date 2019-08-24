const Data = require('../models/data.model.js');

var request = require("request");

const mongoose = require('mongoose');

// Create and Save a new object
exports.create = (req, res) => 
{
	/**
	 * Insure client doesn't cache a service call.
	 */
	 
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    
	console.log(req.body);
	
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "object content can not be empty"
        });
    }

	var uuid = require('uuid');
	
    // Create a Data object
    const data = new Data({
        firstname: req.body.firstname || "",
        lastname: req.body.lastname || "",
        address: req.body.address || "",
        zip: req.body.zip || "",
        email: req.body.email || "",
        bio: req.body.bio || "",
        hobbies: req.body.hobbies || "",
		guid:  uuid.v4() 
    });


    // Save Object in the database
    data.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the data record."
        });
    });
    
};

// Retrieve and return all objects from the database.
exports.findAll = (req, res) => 
{
	
	/**
	 * Insure client doesn't cache a service call.
	 */
	 
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    
	 Data.find()
    .then(data => {
//		console.log(data.length);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving objects."
        });
    });
};

// Initialize data object from original store.
// Start with a completely clean slate - delete all current
// data objects.

exports.init = (req, res) => 
{
	
	/**
	 * Insure client doesn't cache a service call.
	 */
	 
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    
	 Data.find()
    .then(data => 
    {
		console.log("Need to delete " + data.length + " existing objects.");
		
		/**
		 * First delete all existing object.
		 **/
		 
		for(i=0;i<data.length;i++)
		{
			Data.findByIdAndRemove(data[i]._id)
			.then(data => {
					//	res.send(data);
					});
		}
		
		/**
		 * Read the objects from
		 * https://jsonblob.com/api/jsonBlob/43cf4ff8-91ec-11e9-a889-c16b785cfd4b
		 * 
		 * URL and convert to objects in the model.
		 */
		  
		request("https://jsonblob.com/api/jsonBlob/43cf4ff8-91ec-11e9-a889-c16b785cfd4b",
				function(error,response,body)
		{
//			console.log(response);
			if (response.statusCode==200)
			{
				var dataBlob=JSON.parse(body);
				for(i=0;i<dataBlob.length;i++)
				{
					var blob=dataBlob[i];
					  // Create a Data object
					const data = new Data({
						firstname: blob.firstname,
						lastname: blob.lastname,
						address: blob.address,
						zip: blob.zip,
						email: blob.email,
						bio: blob.bio,
						hobbies: blob.hobbies,
						guid:  blob.guid 
						});
				
//					console.log(data); 
					
					 data.save()
					.then(data => {
					//	res.send(data);
					});
				}
			}
		});
		
		 res.status(200).send({
            message: "Object clean and initialization successful."
        });
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving objects."
        });
    });
     
};

// Find a single Object id with the id in the request url
exports.findOne = (req, res) => 
{
	/**
	 * Insure client doesn't cache a service call.
	 */
	 
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    
	Data.findById(req.params.dataId)
    .then(data => {
 //       console.log(data);
        if(!data) {
            return res.status(404).send({
                message: "Object not found with id " + req.params.dataId
            });            
        }
        res.send(data);
    }).catch(err => {
		console.log(err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ObjectId not found with id " + req.params.dataId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving object with id " + req.params.dataId
        });
    });

};

// Update an object identified by the dataId in the request url
exports.update = (req, res) => 
{
	
	/**
	 * Insure client doesn't cache a service call.
	 */
	 
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    
    console.log(req.body);
    
	// Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Object content can not be empty"
        });
    }
    
    // Find object and update it with the request body
    Data.findByIdAndUpdate(req.params.dataId, {
        firstname: req.body.firstname || "",
        lastname: req.body.lastname || "",
        address: req.body.address || "",
        zip: req.body.zip || "",
        email: req.body.email || "",
        bio: req.body.bio || "",
        hobbies: req.body.hobbies || ""
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Object not found with id " + req.params.dataId
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Object not found with id " + req.params.dataId
            });                
        }
        return res.status(500).send({
            message: "Error updating object with id " + req.params.dataId
        });
    });
    
};

// Delete an object id with the specified id in the request url
exports.delete = (req, res) => 
{
  /**
   * Insure client doesn't cache a service call.
   */
	 
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
    
  Data.findByIdAndRemove(req.params.dataId)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Object not found with id " + req.params.dataId
            });
        }
        res.send({message: "Object deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "ObjectId not found with id " + req.params.dataId
            });                
        }
        return res.status(500).send({
            message: "Could not delete object with id " + req.params.dataId
        });
    });
};
