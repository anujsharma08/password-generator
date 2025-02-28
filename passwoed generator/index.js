const inputSlider=document.querySelector('.slider');
const lengthDisplay=document.querySelector('.length');
const passwordDisplay=document.querySelector('.display');
const copyBtn=document.querySelector('.copy-btn');
const copyMsg = document.querySelector('.copy-msg');
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector(".indicator");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password="";
let passwordLength=10;
let checkCount=1;
handleslider();
setIndicator("#ccc");

function handleslider()
{
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}





function setIndicator(color)
{
    indicator.style.backgroundColor = color;

}

function getRandomInteger(min,max)
{
    return(Math.floor(Math.random()*(max-min))+min);
}

function generateRndNumber()
{
 return getRandomInteger(0,9);
}
function generateLowerCase()
{
 return String.fromCharCode(getRandomInteger(97,123));
}
function generateUpperCase()
{
 return String.fromCharCode(getRandomInteger(65,91));
}
function generateSymbol()
{
    const idx=getRandomInteger(0,symbols.length);
    return symbols.charAt(idx);
}



function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked)hasUpper=true;
    if(lowercaseCheck.checked)hasLower=true;
    if(numbersCheck.checked)hasNum=true;
    if(symbolsCheck.checked)hasSym=true;
    

    if(hasLower&&hasUpper &&(hasNum||hasSym)&&passwordLength>=8)
    {
        setIndicator('#0f0');
    }
    else if(hasLower&&hasUpper ||(hasNum||hasSym)&&passwordLength>=8)
    {
        setIndicator('#ff0');
    }
    else
    {
        setIndicator('#f00');
    }
}

async function copyContent()
{
    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
    }
    catch(e)
    {
        copyMsg.innerText = 'Copied!';




    }

    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}
function handleCheckBoxChange()
{
    checkCount=0;
   allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked)
    {
        checkCount++;
    }
   })

   if(passwordLength<checkCount)
   {
    passwordLength=checkCount;
    handleslider();
   }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("change",handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleslider();
})


copyBtn.addEventListener('click',()=>{
    if(password.length>0)
    {
        copyContent();
    }
})
function shufflePassword(array)
{
    //fisher yates 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener('click',()=>{
    if(checkCount<=0) return;
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleslider();
    }
    password="";

    let fucArr=[];

    if(uppercaseCheck.checked)
    {
        fucArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked)
    {
        fucArr.push(generateLowerCase);
    }
    if(numbersCheck.checked)
    {
        fucArr.push(generateRndNumber);
    }
    if(symbolsCheck.checked)
    {
        fucArr.push(generateSymbol);
    }
    
    for(let i=0;i<fucArr.length;i++)
    {
        password+=fucArr[i]();
    }

    for(let i=0;i<passwordLength-fucArr.length;i++)
        
    {

        let rndIdx=getRandomInteger(0,fucArr.length);
        password+=fucArr[rndIdx]();
    }
    password=shufflePassword(Array.from(password));

    passwordDisplay.value=password;

    calcStrength();
})
