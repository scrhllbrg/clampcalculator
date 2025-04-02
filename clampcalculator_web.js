// Readmore Toggle Script
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.readmore__switch').forEach(function (element) {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }

        if (!element.hasAttribute('aria-expanded')) {
            element.setAttribute('aria-expanded', 'false');
        }

        const targetId = element.getAttribute('data-target');
        if (targetId) {
            element.setAttribute('aria-controls', targetId);
        }

        element.addEventListener('click', function () {
            toggleReadmore(this);
        });

        element.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.keyCode === 13) {
                toggleReadmore(this);
            }
        });
    });

    function toggleReadmore(element) {
        const closestParent = element.closest('.readmore');
        const targetId = element.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);

        const isExpanded = element.getAttribute('aria-expanded') === 'true';
        element.setAttribute('aria-expanded', !isExpanded);

        // If already expanded, just toggle
        if (isExpanded) {
            closestParent?.classList.remove('readmore__open');
            return;
        }

        // If not yet loaded, fetch content
        if (targetEl && !targetEl.dataset.loaded) {
            fetch('about.html')
                .then(response => response.text())
                .then(html => {
                    const tempDom = document.createElement('div');
                    tempDom.innerHTML = html;
                    const fullContent = tempDom.querySelector('#full__content');
                    if (fullContent) {
                        targetEl.innerHTML = fullContent.innerHTML;
                        targetEl.dataset.loaded = 'true';
                        closestParent?.classList.add('readmore__open');
                    }
                })
                .catch(error => {
                    console.error('Failed to load full content from about.html:', error);
                });
        } else {
            // Already loaded, just toggle visibility
            closestParent?.classList.add('readmore__open');
        }
    }
});
