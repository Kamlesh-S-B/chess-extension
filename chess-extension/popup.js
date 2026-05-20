let count = 0;


function getClicks()
{
    count++;
    document.getElementById("displayClicks").textContent = "Times Clicked: " + count;
}
document.getElementById("button1").addEventListener("click", getClicks)