export function openCookBook() {
    document.getElementById("cookbook").style.width = "100";
    document.getElementById("topbar").style.marginLeft = "var(--sidebar-width)";
    document.getElementById("contentpage").style.marginLeft = "var(--sidebar-width)";
}

export function closeCookBook() {
    document.getElementById("cookbook").style.width = "0";
    document.getElementById("topbar").style.marginLeft = "0";
    document.getElementById("contentpage").style.marginLeft = "0";
}
