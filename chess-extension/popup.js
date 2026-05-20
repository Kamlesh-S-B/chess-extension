
let count = 0;
async function setClicks()
{
    await chrome.storage.local.set({numClicks: count});
}

async function setCount()
{
    let num = await chrome.storage.local.get(["numClicks"]);

    num = num.numClicks;
    console.log(num);
    if(num>0)
    {
        count = num;
        document.getElementById("displayClicks").textContent = "Times Clicked: " + count;

    }
    
}


setCount();



function addClick()
{
    count++;
    document.getElementById("displayClicks").textContent = "Times Clicked: " + count;
    setClicks();
}
document.getElementById("button1").addEventListener("click", addClick)