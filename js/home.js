var tableData = []

$(document).ready(function(){
    reload();
});

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
          <img id="${employeePayrollData.id}" alt="edit" onclick="update(this)"
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
            console.log(result);
          },
          error: function(xhr , status , error){
            console.log(error);
          }
        });
    reload();
  };

  function reload(){
    $.ajax({
        type : "Get",
        contentType: "application/json",
        url: "http://localhost:3000/employee", 
        success: function(result){
        tableData = result;
        createInnerHtml();
      },
      error: function(xhr , status , error){
        console.log(error);
      }
    });

  }