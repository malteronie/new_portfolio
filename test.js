const htmlP = document.getElementById("pop");
const txt = htmlP.dataset.label;
let i 	= 0 ;

function showLetters()
{
    let timeOut ;
    if(i < txt.length)
    {
        htmlP.innerHTML += `<span>${txt[i]}</span>` ;
        timeOut = setTimeout(showLetters,100)
        i++
    }
    else
    {
        clearTimeout(timeOut);
        console.log("end")
        isOk=true
    }
}     
showLetters()