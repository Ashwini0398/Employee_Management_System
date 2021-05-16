
  function reload(){
    $.ajax({
        type : "Get",
        contentType: "application/json",
        url: "http://localhost:3000/employee", 
        success: function(result){
        tableData = result;
    
      },
      error: function(xhr , status , error){
        console.log(error);
      }
    });

  }