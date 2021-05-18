    const address = document.querySelector('#address');
    const deprt = document.querySelector('#deprt');
    const fName = document.querySelector('#f-name');
    const phoneno = document.querySelector('#phoneno');
    const email = document.querySelector('#email');

    const addressError = document.querySelector('.address-error');
    const departmentError = document.querySelector('.department-error');
    const nameError = document.querySelector('.name-error');
    const phoneError = document.querySelector('.phone-error');
    const emailError = document.querySelector('.email-error');

    let addressRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    let deptRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    let emailRegex = RegExp("^([a-zA-Z0-9]*[+._-]*[a-zA-Z0-9]+@[a-zA-Z]+.{3}[a-zA-z.]*[a-zA-z]{2})+$");
    let phonenoRegex = /^[0]{1}[6-9]{1}[0-9]{9}$/;
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    
    let userInput = {
        "name" : fName.value,
        "department" : deprt.value,
        "phoneNo" : phoneno.value,
        "email" : email.value,
        "address" : address.value
    }

    $(document).ready(function(){
        getEmpDataFromLocalStorage();
    });

      function onSubmit() {
          console.log(addressError.textContent);
          validationMsg(addressRegex,address,addressError,"* please enter the address ");
          validationMsg(deptRegex,deprt,departmentError,"* please enter the department ");
          validationMsg(phonenoRegex,phoneno,phoneError,"* please enter 10 digit Phone number");
          validationMsg(nameRegex,fName,nameError,"* Name must start with capital letter");
          validationMsg(emailRegex,email,emailError,"* Enter valid Email");
        if(validationMsg(addressRegex,address,addressError,"* please enter the address ") 
            && validationMsg(deptRegex,deprt,departmentError,"* please enter the department ")  
            && validationMsg(phonenoRegex,phoneno,phoneError,"* please enter 10 digit Phone number")
            && validationMsg(nameRegex,fName,nameError,"* Name must start with capital letter")  
            && validationMsg(emailRegex,email,emailError,"* Enter valid Email") ){
        
            if(localStorage.getItem("editEmp") == null){    
                $.ajax({
            type : "Post",
            contentType: "application/json",
            data : JSON.stringify({
                "name" : fName.value,
                "department" : deprt.value,
                "phoneNo" : phoneno.value,
                "email" : email.value,
                "address" : address.value
            }),
            url: "http://localhost:3000/employee", 
            success: function(){
            window.location.replace("Home.html");
          },
          error: function(error){
            console.log(error);
          }   
        });
        }
        else
        {
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
                success: function(){
                localStorage.clear();
                window.location.replace("Home.html");
              },
              error: function(xhr , status , error){
                console.log(error);
              }   
            });
        }

    }
    }

    validationMsg = (test,val,testErr,msg) => {
        if(!test.test(val.value)){
        testErr.textContent = msg;
        return false
        }
        else{
        testErr.textContent = "";
        return true;
        }
    }

    address.oninput = function(){
        validationMsg(addressRegex,address,addressError,"* please enter the address ");
    }
    
    deprt.oninput = function(){
        validationMsg(deptRegex,deprt,departmentError,"* please enter the department ");
    }

    fName.oninput = function(){
        validationMsg(nameRegex,fName,nameError,"* Name must start with capital letter");
    }

    phoneno.oninput = function(){
        validationMsg(phonenoRegex,phoneno,phoneError,"* please enter 10 digit Phone number");
    }

    email.oninput = function(){
        validationMsg(emailRegex,email,emailError,"* Enter valid Email");
    }
    
    function getEmpDataFromLocalStorage(){
        if(localStorage.getItem("editEmp") != null)
        {
            let emp = JSON.parse(localStorage.getItem("editEmp"));
            document.getElementById('empId').value = emp[0].id;
            document.getElementById('f-name').value = emp[0].name;
            document.getElementById('deprt').value = emp[0].department;
            document.getElementById('phoneno').value = emp[0].phoneNo;
            document.getElementById('email').value = emp[0].email;
            document.getElementById('address').value = emp[0].address;
        }
    }