document.addEventListener('DOMContentLoaded', function() {
    const groupPhotoContainers = document.querySelectorAll('div[data-a11y-title="그룹사진"]');

    groupPhotoContainers.forEach(container => {
        const imageBlocks = container.querySelectorAll('div[id^="SE-"]');

        if (imageBlocks.length >= 2) {
            // div-div, div-div-div 구조 대응
            const targetContainer = imageBlocks[0].parentNode;

            if (targetContainer) {
                targetContainer.style.display = 'flex';
                targetContainer.style.flexWrap = 'nowrap';
                targetContainer.style.justifyContent = 'space-between';
                targetContainer.style.alignItems = 'flex-start';
                targetContainer.style.width = '100%';

                imageBlocks.forEach(block => {
                    block.style.width = '49.5%';
                    block.style.flexBasis = '49.5%';
                    block.style.flexShrink = '0';

                    const imgElement = block.querySelector('img');
                    if (imgElement) {
                        imgElement.style.width = '100%';
                        imgElement.style.height = 'auto';
                    }
                });
            }
        }
    });
});