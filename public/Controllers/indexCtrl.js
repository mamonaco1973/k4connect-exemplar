
appIndex.controller('indexController', ['$scope', 'DataService', function ($scope, DataService) {
    $scope.listPerson = "";
    //load all available person from server.
    loadPersons();
    
    /**
     * Load all the user data record and display in the main table.
     **/
     
    function loadPersons()
    {
        DataService.getPersons().then(function successCallback(response) 
        {
            if (response.data.length > 0) 
            {
                $scope.listPerson = response.data;
                document.getElementById("messageDiv").innerHTML=response.data.length + " objects returned.";
 
            } 
        }, function errorCallback(response) 
        {
            alert(response.status);
        });
    }
    
   /**
    * Handle add button on the main page.
    */
     
    $scope.addCB = function()
    {
		if ($scope.master)
		{
			$scope.master.firstname="";
			$scope.master.lastname="";
			$scope.master.email="";
			$scope.master.zip="";
			$scope.master.bio="";
			$scope.master.address="";
			$scope.master.hobbies="";
		}
		$("#myModalFormAddPerson").modal("show");
	}
  
    /**
     * Handle reseed button on the main page. If successful reset the
     * user data list back to the original contents.
     */
     
    $scope.reseedCB = function()
    {
		DataService.reseedPersons().then(function successCallback(response) 
		{
            alert("User data service was reseeded!");
           loadPersons(); 
        }, 
        function errorCallback(response) 
        {
			debugger;
            //alert(response.status);
        });
    }
    
    /**
     * Handle remove link in the table. Copy the remove service and 
     * if successful then reload the master list.
     */
     
    $scope.Remove = function(id) 
    {
        DataService.deletePerson(id).then(function successCallback(response) 
        {
			console.log(response);
            if (response.status == 200) 
            {
                loadPersons();
                //alert("succefully done !");
            }
        
        }, function errorCallback(response) 
        {
            //alert(response.status);
        });  
    }
    
    /**
     * Handle Edit link in the table. Make a copy of the elem 
     * and pass to the edit dialog.
     */
     
    $scope.EditItem = function (elem) 
    {
		var data = angular.copy(elem);
		$scope.editItem=data;
		$("#myModalFormEditPerson").modal("show");
	}
	
	/**
	 * Edit button handler from the edit dialog. Call service
	 * to edit the user data object. If successful then reload 
	 * the master list.
	 */
	  	 
    $scope.Edit = function (editItem) 
    {	
        DataService.editPerson(editItem).then(function successCallback(response) 
        {
			 $("#myModalFormEditPerson").modal("hide");
             loadPersons();
        }, 
        function errorCallback(response) 
        {
            alert(response.status);
        });   
    }
    
    /**
     * Add button handler from the add dialog. Call service to 
     * add a new user data object. If successful then reload 
     * the master list.
     */
     
    $scope.AddNewPerson = function (master) 
    {	
        DataService.addPerson(master).then(function successCallback(response) 
        {
            //refresh List of person
            loadPersons();
            //hide modal : 
            $("#myModalFormAddPerson").modal("hide");
        }, function errorCallback(response) 
        {
            alert(response.status);
        }); 
    }
}]);
 
