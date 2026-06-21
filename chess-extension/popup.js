async function updateTree(stats)
{
    let currentTree = document.getElementById("tree-image");
    if(stats.all<10)
    {
        document.getElementById("games-to-next").textContent=(10-stats.all) + " Games To Next Tree";
        document.getElementById("tree-level").textContent ="Current Tree: Seed";
        currentTree.src="https://openmoji.org/data/color/svg/1F330.svg";
    }
    if(stats.all>=10 && stats.all<25)
    {
        document.getElementById("games-to-next").textContent=(25-stats.all) + " Games To Next Tree";
        document.getElementById("tree-level").textContent ="Current Tree: Sapling";
        currentTree.src="https://openmoji.org/data/color/svg/1F331.svg";
    }
    if(stats.all>=25 && stats.all<50)
    {
        document.getElementById("games-to-next").textContent=(50-stats.all) + " Games To Next Tree";
        document.getElementById("tree-level").textContent ="Current Tree: Young Tree";
        currentTree.src="https://openmoji.org/data/color/svg/1F33F.svg";
    }
    if(stats.all>=50 && stats.all<100)
    {
        document.getElementById("games-to-next").textContent=(100-stats.all) + " Games To Next Tree";
        document.getElementById("tree-level").textContent ="Current Tree: Mature Tree";
        currentTree.src="https://images.emojiterra.com/google/noto-emoji/unicode-17.0/color/svg/1f333.svg"
    }
    if(stats.all>=100)
    {
        document.getElementById("games-to-next").textContent= "Forest Achieved!"
        document.getElementById("tree-level").textContent = "Current Tree: Forest";
        currentTree.src="https://imgproxy.attic.sh/insecure/f:webp/h:993/q:90/w:993/plain/https://attic.sh/qkqlry3bju95ui8tue1acaz07v6g";
    }
}


async function onEnter()
{
    username = document.getElementById("username-input").value;
    await chrome.storage.local.set({username:username})

    let stats = await getLichessStats(username);
    console.log(stats)




    updateUI(stats);
    
    await updateTree(stats);
}


function updateUI(stats)
{
    document.getElementById("total-games").textContent = "Total Games: " + stats.all;
    document.getElementById("games-won").textContent = "Games Won: " + stats.win;
    document.getElementById("games-lost").textContent = "Games Lost: " + stats.loss;
    document.getElementById("games-drawn").textContent = "Games Drawn: " + stats.draw;
    
}




async function getLichessStats(username)
{
    let url =  `https://lichess.org/api/user/${username}`;
    let response = await fetch(url);

    if(!response.ok)
    {
        throw new Error("User not found");
    }

    let data = await response.json();
    console.log(data);
    return data.count;
}


function checkKey(event)
{
    if(event.key === "Enter")
    {
        onEnter();
    }
}

async function loadUser()
{

    let result = await chrome.storage.local.get("username");
    username = result.username
    
    document.getElementById("username-input").value = username;

    

    let stats = await getLichessStats(username);
    

    updateUI(stats);



   await updateTree(stats);
}

//event listeners

document.addEventListener("DOMContentLoaded", loadUser)
document.getElementById("username-input").addEventListener("keydown",(event)=>checkKey(event));