const btn = document.querySelector(".btn");
const inputs =document.querySelectorAll(".inp");
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const counters = document.querySelectorAll(".counter");
const dateForm = document.querySelector(".date-form");
const inpuItem = document.querySelectorAll(".inp-item");
const inpLabel = document.querySelectorAll(".label");

var submitting = false;
var wrongDate = false;
const monthDays = {

    '1': 31,
    '2': 28,
    '3': 31,
    '4': 30,
    '5': 31,
    '6': 30,
    '7': 31,
    '8': 31,
    '9': 30,
    '10': 31,
    '11': 30,
    '12': 31
  };

var date = new Date;

const errorMsg = document.querySelectorAll(".error");
const pattern =  /^\d+$/;


const showError =(input, index) =>{
    
    if (!input.value.length  && submitting){
        input.classList.add("invalid");
        inpLabel[index].classList.add("error");
        errorMsg[index].textContent = "This field is required";
    }
    else if (wrongDate){
        inputs.forEach(input=>{
            input.classList.add("invalid");
        });

        inpLabel.forEach(label=>{
            label.classList.add("error");
        });
        errorMsg[index].textContent = "Must be a valid " + `${dateForm.getAttribute("name")}`;
    }
    else if (input.dataset.val === "false" && input.value.length) {
        
        input.classList.add("invalid");
        inpLabel[index].classList.add("error");
        errorMsg[index].textContent = "Must be a valid " + `${input.getAttribute("name")}`
        
    }
    else{
        input.classList.remove("invalid");
        inpLabel[index].classList.remove("error");
        errorMsg[index].textContent = ""
    }
        
    
}

const checkDate = (d, m, y) =>{
    const current = date.getMonth()+1;
    if (y > date.getFullYear()){ return false;}
    else if ( d > 31 || m > 12) {return false;}
    else if (d > monthDays[m]) { wrongDate = true; return false;}
    else if ((y === parseInt(date.getFullYear()) && (m > parseInt(current)))){ wrongDate = true; return false;}
    else{ return true;}
    
}


const countAnimation = () =>{
    
    
    counters.forEach(counter=>{
        var interval = 100;
        var start = 0;
        var end = parseInt(counter.dataset.value);
        var duration = Math.floor(interval/end);
        let count = setInterval(()=>{
            
            counter.textContent = start;
            if (start === end){
                clearInterval(count);
            }
            else{
                start += 1;
            }
            
        },duration);
    })
}



const calculateAge = () => {
    date2 = new Date(year.value, month.value, day.value);

    var yearCount = date.getFullYear() - date2.getFullYear();
    var monthCount = date2.getMonth()+1 - date.getMonth()+1;
    var dayCount = date.getDate() - day.value;
    console.log(monthCount)
    if(monthCount < 0 || (!monthCount && dayCount < 0)){
        yearCount --;
        monthCount += 12;
    }
    if (dayCount < 0){
        var lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        yearCount --;
        dayCount += lastDay;
    }
    if (yearCount < 0){
        yearCount = 0;    
    }

    counters[2].dataset.value = dayCount;
    counters[1].dataset.value = monthCount;
    counters[0].dataset.value = yearCount;
    
    
}

window.addEventListener("load", ()=>{
    inputs.forEach((input, index)=>{
        input.classList.remove("invalid");
        input.value = "";
        inpLabel[index].classList.remove("error");
        errorMsg[index].textContent = "";

    });
});

dateForm.addEventListener("submit", (e) =>{
    
    submitting = true;

    inputs.forEach((input, index)=>{
       
        const isValid =  pattern.test(input.value);
        
        if (!isValid){
            input.dataset.val = "false";
            showError(input,index);
            e.preventDefault();

        }
        
        else if (!checkDate(day.value, month.value, year.value)){   
            input.dataset.val = "false"; 
            showError(input,index);   
            e.preventDefault();    
        }    
        else{    
            wrongDate = false
            if (!wrongDate){
                inputs.forEach(input=>{
                    input.classList.remove("invalid");
                });
        
                inpLabel.forEach(label=>{
                    label.classList.remove("error");
                });
                errorMsg[0].textContent = "";
                errorMsg[1].textContent = "";
                e.preventDefault();
            }
            input.classList.remove("invalid");    
            errorMsg[index].textContent = "";    
            inpLabel[index].classList.remove("error");
            calculateAge(); 
            countAnimation();
            e.preventDefault(); 
            
                    
        }


        
    });
});



inputs.forEach((input,index)=>{
    input.addEventListener("input", (e) => {
        submitting = false;
        const isValid =  pattern.test(input.value);

        if (!isValid){
            input.dataset.val = "false";
            showError(input,index);

        }
        
        else if (!checkDate(day.value, month.value, year.value)){   
            input.dataset.val = "false"; 
            showError(input,index);       
        }    
        else{    
            wrongDate = false
            if (!wrongDate){
                inputs.forEach(input=>{
                    input.classList.remove("invalid");
                });
        
                inpLabel.forEach(label=>{
                    label.classList.remove("error");
                });
                errorMsg[0].textContent = "";
                errorMsg[1].textContent = "";
            }
            input.classList.remove("invalid");    
            errorMsg[index].textContent = "";    
            inpLabel[index].classList.remove("error");          
        }
        
    
    });
    
});

const submitForm = () =>{
    counters.forEach(counter =>{
        if (counter.classList.contains("counter__year")){
            counter.textContent = Math.abs(Math.floor(date.getFullYear() - year.value));
        }
        else if (counter.classList.contains("counter__month")){
            counter.textContent = Math.abs(Math.floor(date.getMonth()+1 - month.value));
        }
        else if (counter.classList.contains("counter__day")){
            counter.textContent = Math.abs(Math.floor(date.getDay() - day.value));
        }
    })
}