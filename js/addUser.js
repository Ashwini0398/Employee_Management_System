    const address = document.querySelector('#address');
    const dept = document.querySelector('#dept');
    const fName = document.querySelector('#f-name');
    const phoneno = document.querySelector('#phoneno');
    const email = document.querySelector('#email');

    const addressError = document.querySelector('.address-error');
    const departmentError = document.querySelector('.departmentError ');
    const nameError = document.querySelector('.name-error');
    const phoneError = document.querySelector('.phone-error');
    const emailError = document.querySelector('.email-error');

    let addressRegex = RegExp(' ');
    let deptRegex = RegExp(' ');
    let emailRegex = RegExp("^([a-zA-Z0-9]*[+._-]*[a-zA-Z0-9]+@[a-zA-Z]+.{3}[a-zA-z.]*[a-zA-z]{2})+$");
    let phonenoRegex = /^[0]{1}[6-9]{1}[0-9]{9}$/;
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    

    validationMsg = (test,val,testErr,msg) => {
        if(!test.test(val.value)){
        testErr.textContent = msg;
        return false
        }
        else{
        testErr.textContent = " ";
        return true;
        }
    }

    address.oninput = function(){
        let msg = "* please enter the address "
        validationMsg(address,addressError,msg);
    }
    
    dept.oninput = function(){
        let msg = "* please enter the department"
        validationMsg(dept,departmentError,msg);
    }

    fName.oninput = function(){
        let msg = "* Name must start with capital letter"
        validationMsg(nameRegex,fName,nameError,msg);
    }

    phoneno.oninput = function(){
        let msg = "* please enter 10 digit number"
        validationMsg(phonenoRegex,phoneno,phoneError,msg);
    }

    email.oninput = function(){
        let msg = "* Enter valid Email"
        validationMsg(emailRegex,email,emailError,msg);
    }
    
    
    Reload = () =>{
        window.location.reload();
    }