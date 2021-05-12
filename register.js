   const user = document.querySelector('#user');
   const pwd = document.querySelector('#pwd');
   const fName = document.querySelector('#f-name');
   const phoneno = document.querySelector('#phoneno');
   const email = document.querySelector('#email');

    const userError = document.querySelector('.user-error');
    const pwdError = document.querySelector('.password-error');
    const nameError = document.querySelector('.name-error');
    const phoneError = document.querySelector('.phone-error');
    const emailError = document.querySelector('.email-error');


    let userRegex = RegExp('^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$');
    let pwdRegex = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$');
    let emailRegex = RegExp("^([a-zA-Z0-9]*[+._-]*[a-zA-Z0-9]+@[a-zA-Z]+.{3}[a-zA-z.]*[a-zA-z]{2})+$");
    let telRegex = RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$");
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    

    validationMsg = (test,val,testErr,msg) => {
        
        if(test.test(val.value)){
            testErr.textContent = " ";
        }
        else{
            testErr.textContent = msg;
        }
    }

    user.oninput = function(){
        let msg = "Enter valid User Name"
        validationMsg(userRegex,user,userError,msg);
    }
    
    pwd.oninput = function(){
        let msg = "Enter valid Password"
        validationMsg(pwdRegex,pwd,pwdError,msg);
    }

    fName.oninput = function(){
        let msg = "Enter valid Name"
        validationMsg(pwdRegex,fName,nameError,msg);
    }

    phoneno.oninput = function(){
        let msg = "Enter valid Phone"
        validationMsg(pwdRegex,phoneno,phoneError,msg);
    }

    email.oninput = function(){
        let msg = "Enter valid Email"
        validationMsg(pwdRegex,email,emailError,msg);
    }
    
    
    