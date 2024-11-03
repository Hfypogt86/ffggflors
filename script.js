document.addEventListener('DOMContentLoaded', (event) => {
    const videoContainer = document.getElementById('videoContainer');
    const progressBar = document.getElementById('progressBar');

    function uploadVideo() {
        const fileInput = document.getElementById('videoUpload');
        const file = fileInput.files[0];

        if (file) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                progressBar.style.width = progress + '%';

                if (progress >= 100) {
                    clearInterval(interval);
                    displayVideo(file);
                }
            }, 100);
        }
    }

    function displayVideo(file) {
        const videoElement = document.createElement('video');
        videoElement.width = 320;
        videoElement.height = 240;
        videoElement.controls = true;

        const sourceElement = document.createElement('source');
        sourceElement.src = URL.createObjectURL(file);
        sourceElement.type = file.type;

        videoElement.appendChild(sourceElement);

        const views = document.createElement('p');
        views.textContent = 'عدد المشاهدات: 0';
        views.classList.add('views');

        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('video');
        videoWrapper.appendChild(videoElement);
        videoWrapper.appendChild(views);

        videoContainer.appendChild(videoWrapper);

        videoElement.addEventListener('play', () => {
            let currentViews = parseInt(views.textContent.split(': ')[1]);
            views.textContent = `عدد المشاهدات: ${currentViews + 1}`;
        });
    }

    window.uploadVideo = uploadVideo;
});