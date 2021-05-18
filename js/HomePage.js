var tableData = [];
let empPayrollList=new Array();


$(document).ready(function(){
    if (site_properties.from_local) getEmpDataFromLocalStorage();
    else reload();
});

function reload(){
    $.ajax({
        type : "Get",
        contentType: "application/json",
        url: "http://localhost:3000/employee", 
        success: function(result){
        tableData = result;
        createInnerHtml();
      },
      error: function( error){
        console.log(error);
      }
    });

  }
const createInnerHtml = () => {
    const headerHtml =
      "<tr><th>Name</th><th>Department</th><th>Phoneno</th><th>Email</th><th>Address</th><th>Actions</th></tr>";
    if (tableData.length == 0) return;
    let innerHtml = `${headerHtml} `;
    for (const employeePayrollData of tableData) {
      innerHtml = `${innerHtml}
      <tr>
      <td>${employeePayrollData.name}</td>
      <td>${employeePayrollData.department}</td>
      <td>${employeePayrollData.phoneNo}</td>
      <td>${employeePayrollData.email}</td>
      <td>${employeePayrollData.address}</td>
      <td>
          <img id="${employeePayrollData.id}" onclick="remove(this)" alt="delete"
          src="../assests/asserts/assets/icons/delete-black-18dp.svg">
          <img id="${employeePayrollData.id}" 
            alt="edit" onclick="update(this)"
          src="../assests/asserts/assets/icons/create-black-18dp.svg">
      </td>
      </tr>`;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
  };

  const remove = (node) => {
    console.log(node);
        $.ajax({
            type : "Delete",
            contentType: "application/json",
            url: `http://localhost:3000/employee/${node.id}`, 
            success: function(result){
              alert("Record has been deleted");
            console.log(result);
          },
          error: function(error){
            console.log(error);
          }
        });
    reload();
    createInnerHtml();
  };
  

  const update = (node)=>{
      let empDtl = tableData.filter((element) => {return element.id == node.id;});
      console.log(empDtl);
      localStorage.setItem('editEmp', JSON.stringify(empDtl));
      window.location.replace(site_properties.add_user_page);
}


  
    
