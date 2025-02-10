function initToolbarButton() {
    var button = document.createElement('button');
    button.innerHTML = 'SQL Syntax';
    button.setAttribute('data-sql-syntax', 'true');
    // Style the button to appear in the top right-hand corner as a toolbar button
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '20px';
    button.style.zIndex = '1000';
    button.style.padding = '10px 15px';
    button.style.backgroundColor = '#007BFF';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    // On click, toggle the overlay
    button.addEventListener('click', function() {
        toggleOverlay();
    });
    document.body.appendChild(button);
    initToolbarObserver();
}

function initToolbarObserver() {
    const observer = new MutationObserver(function(mutations) {
        if(!document.querySelector('button[data-sql-syntax]')) {
            initToolbarButton();
        }
    });
    observer.observe(document.body, {childList: true, subtree: true});
}
