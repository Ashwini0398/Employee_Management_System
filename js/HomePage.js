var tableData = []

$(document).ready(function(){
    reload();
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
      document.getElementById('empId').value = node.id;
      document.getElementById('f-name').value = empDtl[0].name;
      document.getElementById('deprt').value = empDtl[0].department;
      document.getElementById('phoneno').value = empDtl[0].phoneNo;
      document.getElementById('email').value = empDtl[0].email;
      document.getElementById('address').value = empDtl[0].address;
      document.getElementById('update').style.display = 'block';
      // document.querySelector("#f-name").value = empDtl[0].name;
  }

const onCancel = () => {
  document.getElementById('update').style.display = 'none';
            reload();
            // createInnerHtml();
}

 const onSubmit = ()=>{
   
        $.ajax({
          type : "Patch",
          contentType: "application/json",
          data : JSON.stringify({
              "name" : document.getElementById('f-name').value,
              "department" : document.getElementById('deprt').value,
              "phoneNo" : document.getElementById('phoneno').value,
              "email" : document.getElementById('email').value,
              "address" : document.getElementById('address').value 
          }),
          url: "http://localhost:3000/employee/"+document.getElementById('empId').value, 
          success: function(result){
            document.getElementById('update').style.display = 'none';
            reload();
            createInnerHtml();
        },
        error: function(xhr , status , error){
          console.log(error);
        }   
      });

 }
  