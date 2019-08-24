
/**
 * Mappings to the simple CRUD user data rest service.
 * 
 * ./data - GET - retrieve all user data items.
 * ./data/[id] - DELETE - remove specified user data item.
 * ./data/[id] - PUT (object) - update user data item.
 * ./data - POST (object) - create new user data item.
 */
 
appIndex.factory('DataService', ['$http', function ($http) 
{
    var getPersons = function () 
    {
        return $http.get("./data");
    }
    
    var reseedPersons = function() 
    {
		return $http.put("./init");
	}
	
    var addPerson = function (obj) 
    {		
		return $http.post("./data", obj);
    }
        
    var editPerson = function (obj) 
    {
        return $http.put("./data/" + obj._id, obj);
    }
    
    var deletePerson = function (id) 
    {
       return $http.delete("./data/" + id, id);
    }
    
    return {
        getPersons: getPersons,
        reseedPersons: reseedPersons,
        addPerson: addPerson,
        editPerson: editPerson,
        deletePerson: deletePerson,
    }
}]);
