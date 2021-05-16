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

    // $(document).ready(function(){
    //     $.ajax({
    //         type : "Get",
    //         contentType: "application/json",
    //         url: "http://localhost:3000/employee", 
    //         success: function(result){
    //         tableData = result;
    //         console.log(tableData);
    //       },
    //       error: function(xhr , status , error){
    //         console.log(error);
    //       }
    //     });
    //   });
    
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
            success: function(result){
            console.log(result);
            window.location.replace("http://127.0.0.1:5500/html/Home.html");
          },
          error: function(xhr , status , error){
            console.log(error);
          }   
        });
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
    
    // $("button").click(function(){
    //     $.ajax({
    //         type : "Post",
    //         contentType: "application/json",
    //         data : JSON.stringify({
    //             "name":"Pooja",
    //             "department":"Sales",
    //             "phoneNo":"9687867534",
    //             "email":"pooja@gmail.com",
    //             "address":"Gujrat"
    //         }),
    //         url: "http://localhost:3000/employee", 
    //         success: function(result){
    //         console.log(result);
    //       },
    //       error: function(error){
    //         console.log(error);
    //       }
    //     });
    // });

    