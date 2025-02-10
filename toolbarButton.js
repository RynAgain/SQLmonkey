function initToolbarButton() {
    const button = document.createElement('button');
    button.innerHTML = '<span class="drag-handle" style="cursor: move; margin-right: 5px;">&#9776;</span>SQL Syntax';
    button.setAttribute('data-sql-syntax', 'true');
    // Style the button using top and left so that it can be repositioned by dragging
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.left = 'calc(100% - 120px)';  // A bit adjusted for the handle
    button.style.zIndex = '1000';
    button.style.padding = '10px 15px';
    button.style.backgroundColor = '#007BFF';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    
    // Separate drag handle element to enable dragging only when interacting with it
    const dragHandle = button.querySelector('.drag-handle');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    
    if (dragHandle) {
        dragHandle.style.cursor = 'move';
        
        dragHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            button.dataset.dragging = "true";
            const rect = button.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            button.style.transition = 'none'; // Disable transition during drag 
            e.stopPropagation();
            e.preventDefault();
        });
    }

    // Prevent toggleOverlay from triggering when clicking on the drag handle
    button.addEventListener('click', (e) => {
        if (!button.dataset.dragging) {
            toggleOverlay();
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;
        // Constrain the button within the viewport
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - button.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - button.offsetHeight));
        button.style.left = newLeft + 'px';
        button.style.top = newTop + 'px';
    });
    
    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            // Delay removal of dragging flag to prevent click event from firing immediately after drag
            setTimeout(() => {
                button.dataset.dragging = "";
            }, 0);
        }
    });
    
    document.body.appendChild(button);
    initToolbarObserver();
}

function initToolbarObserver() {
    const observer = new MutationObserver((mutations) => {
        const buttonExists = document.querySelector('button[data-sql-syntax]');
        if (!buttonExists) {
            observer.disconnect();
            initToolbarButton();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
