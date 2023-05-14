document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".gallery img");
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    
    // Skapa navigationsknappar
    const prevButton = document.createElement("button");
    prevButton.className = "prev-button";
    prevButton.innerHTML = "&lt;";
    
    const nextButton = document.createElement("button");
    nextButton.className = "next-button";
    nextButton.innerHTML = "&gt;";
    
    // Skapa stängningskryss
    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "&times;";
    
    // Hantera klick på föregående knapp
    prevButton.addEventListener("click", function(event) {
      event.stopPropagation();
      navigateImage("prev");
    });
    
    // Hantera klick på nästa knapp
    nextButton.addEventListener("click", function(event) {
      event.stopPropagation();
      navigateImage("next");
    });
    
    // Hantera klick på stängningskryss
    closeButton.addEventListener("click", function(event) {
      event.stopPropagation();
      closeLightbox();
    });
    
    images.forEach(function(image, index) {
      image.addEventListener("click", function(event) {
        event.preventDefault();
        openLightbox(index);
      });
    });
    
    function openLightbox(index) {
      const imageURLs = Array.from(images).map(image => image.getAttribute("src"));
      const imageCaptions = Array.from(images).map(image => image.getAttribute("alt"));
      
      const lightboxContent = document.createElement("div");
      lightboxContent.className = "lightbox-content";
      
      lightboxContent.innerHTML = `
        <img src="${imageURLs[index]}" alt="${imageCaptions[index]}">
        <div class="lightbox-navigation">
          <button class="prev-button">&lt;</button>
          <button class="next-button">&gt;</button>
          <button class="close-button">&times;</button>
        </div>
      `;
      
      lightbox.innerHTML = "";
      lightbox.appendChild(lightboxContent);
      document.body.appendChild(lightbox);
      
      lightbox.classList.add("open");
      
      // Hämta referenser till navigationsknappar och stängningskryss i Lightbox
      const lightboxPrevButton = lightbox.querySelector(".prev-button");
      const lightboxNextButton = lightbox.querySelector(".next-button");
      const lightboxCloseButton = lightbox.querySelector(".close-button");
      
      // Hantera klick på navigationsknappar och stängningskryss inom Lightbox
      lightboxPrevButton.addEventListener("click", function(event) {
        event.stopPropagation();
        navigateImage("prev");
      });
      
      lightboxNextButton.addEventListener("click", function(event) {
        event.stopPropagation();
        navigateImage("next");
      });
      
      lightboxCloseButton.addEventListener("click", function(event) {
        event.stopPropagation();
        closeLightbox();
      });
      
      // Hantera tangenttryckningar för navigering
      document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
          navigateImage("prev");
        } else if (event.key === "ArrowRight") {
          navigateImage("next");
        } else if (event.key === "Escape") {
          closeLightbox();
        }
      });
   
      function navigateImage(direction) {
        const currentImage = lightbox.querySelector("img");
        const currentIndex = Array.from(images).findIndex(image => image.getAttribute("src") === currentImage.getAttribute("src"));
        let newIndex;
        
        if (direction === "prev") {
          newIndex = (currentIndex - 1 + images.length) % images.length;
        } else if (direction === "next") {
          newIndex = (currentIndex + 1) % images.length;
        }
        
        const newImageURL = images[newIndex].getAttribute("src");
        const newImageCaption = images[newIndex].getAttribute("alt");
        
        currentImage.setAttribute("src", newImageURL);
        currentImage.setAttribute("alt", newImageCaption);
      }
      
      function closeLightbox() {
        lightbox.classList.remove("open");
        lightbox.innerHTML = "";
      }
      
      lightbox.addEventListener("click", function(event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });
    }
});