export function openCookBook() {
    document.getElementById("cookbook").style.width = "0";
    document.getElementById("AddMealButton").style.transform = "rotate(0deg)";
}

export function closeCookBook() {
    document.getElementById("cookbook").style.width = "100%";
    document.getElementById("AddMealButton").style.transform = "rotate(45deg)";
}
