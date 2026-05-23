
let totalGames = 0;
let totalWins= 0;
let totalLosses = 0;
let totalDraws = 0;


function addWin()
{
    totalGames++;
    addClick("win");
}
function addLoss()
{
    totalGames++;
    addClick("loss")
}
function addDraw()
{
    totalGames++;
    addClick("draw")
}

async function addClick(outcome)
{
    if(outcome === "win")
    {
        await chrome.storage.local.set({numWins: totalWins});
    }
    else if(outcome === "loss")
    {
        await chrome.storage.local.set({numLosses: totalLosses});
    }
    else if(outcome === "draw")
    {
        await chrome.local.storage.set({numDraws: totalDraws});
    }
    await chrome.storage.local.set({numGames:totalGames});
}

async function setCounts()
{
   
}

document.getElementById("Won-Button").addEventListener("click", addWin)
document.getElementById("Lost-Button").addEventListener("click", addLoss)
document.getElementById("Draw-Button").addEventListener("click", addDraw) 
// async function setClicks()
// {
//     await chrome.storage.local.set({numClicks: count});
// }

// async function setCount()
// {
//     let num = await chrome.storage.local.get(["numClicks"]);

//     num = num.numClicks;
//     console.log(num);
//     if(num>0)
//     {
//         count = num;
//         document.getElementById("displayClicks").textContent = "Times Clicked: " + count;

//     }
    
// }


// setCount();



// function addClick()
// {
//     count++;
//     document.getElementById("displayClicks").textContent = "Times Clicked: " + count;
//     setClicks();
// }

