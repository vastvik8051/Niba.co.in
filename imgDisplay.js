/* ==========================
   GALLERY VIEWER
========================== */

const galleryImages = document.querySelectorAll('.gallery-strip img');

const galleryViewer = document.getElementById('galleryViewer');
const galleryViewerImg = document.getElementById('galleryViewerImg');

const galleryViewerClose = document.getElementById('galleryViewerClose');
const galleryViewerPrev = document.getElementById('galleryViewerPrev');
const galleryViewerNext = document.getElementById('galleryViewerNext');

let currentGalleryIndex = 0;

function openGalleryViewer(index){

    currentGalleryIndex = index;

    galleryViewerImg.src = galleryImages[index].src;

    galleryViewer.classList.add('open');
}

function showGalleryImage(index){

    if(index < 0){
        currentGalleryIndex = galleryImages.length - 1;
    }
    else if(index >= galleryImages.length){
        currentGalleryIndex = 0;
    }
    else{
        currentGalleryIndex = index;
    }

    galleryViewerImg.src = galleryImages[currentGalleryIndex].src;
}

galleryImages.forEach((img, index)=>{

    img.addEventListener('click', ()=>{

        openGalleryViewer(index);

    });

});

galleryViewerClose.addEventListener('click', ()=>{

    galleryViewer.classList.remove('open');

});

galleryViewerPrev.addEventListener('click', ()=>{

    showGalleryImage(currentGalleryIndex - 1);

});

galleryViewerNext.addEventListener('click', ()=>{

    showGalleryImage(currentGalleryIndex + 1);

});

galleryViewer.addEventListener('click', (e)=>{

    if(e.target === galleryViewer){

        galleryViewer.classList.remove('open');

    }

});

document.addEventListener('keydown', (e)=>{

    if(!galleryViewer.classList.contains('open')) return;

    if(e.key === 'Escape'){

        galleryViewer.classList.remove('open');

    }

    if(e.key === 'ArrowLeft'){

        showGalleryImage(currentGalleryIndex - 1);

    }

    if(e.key === 'ArrowRight'){

        showGalleryImage(currentGalleryIndex + 1);

    }

});