(function(window, document) {
    // Función para cargar jQuery de forma segura
    function loadJQuery(callback) {
      if (window.jQuery) {
        callback(jQuery);
      } else {
        var script = document.createElement('script');
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
        script.onload = function() {
          callback(jQuery);
        };
        document.head.appendChild(script);
      }
    }
  
    // Función principal que se ejecutará cuando jQuery esté disponible
    function main($) {
      function initRatingSystem(articleElement) {
        const stars = articleElement.querySelectorAll('.star-outline');
        const postId = articleElement.getAttribute('data-post-id');
        const averageRatingElement = articleElement.querySelector('.average-rating span');
        
        let selectedValue = 0;
        let totalRating = 0;
        let ratingCount = 0;
  
        // Cargar datos guardados de localStorage
        const savedRatingData = JSON.parse(localStorage.getItem(`ratingData-${postId}`));
        if (savedRatingData) {
          selectedValue = savedRatingData.selectedValue;
          totalRating = savedRatingData.totalRating;
          ratingCount = savedRatingData.ratingCount;
          updateAverageRating();
          fillStars(selectedValue);
        }
  
        stars.forEach(star => {
          star.addEventListener('mouseover', function() {
            const value = this.getAttribute('data-value');
            fillStars(value);
          });
  
          star.addEventListener('mouseout', function() {
            fillStars(selectedValue);
          });
  
          star.addEventListener('click', function() {
            selectedValue = this.getAttribute('data-value');
            totalRating += parseInt(selectedValue);
            ratingCount++;
            updateAverageRating();
            fillStars(selectedValue);
  
            // Guardar datos en localStorage
            const ratingData = { selectedValue, totalRating, ratingCount };
            localStorage.setItem(`ratingData-${postId}`, JSON.stringify(ratingData));
          });
        });
  
        function fillStars(value) {
          stars.forEach(star => {
            if (star.getAttribute('data-value') <= value) {
              star.classList.add('filled');
            } else {
              star.classList.remove('filled');
            }
          });
        }
  
        function updateAverageRating() {
          const averageRating = (totalRating / ratingCount).toFixed(1);
          averageRatingElement.textContent = `Calificación: ${averageRating}`;
        }
      }
  
      // Inicializar el sistema de calificación para cada artículo cuando el DOM esté listo
      $(document).ready(function() {
        $('.article').each(function() {
          initRatingSystem(this);
        });
      });
  
      // Aquí puedes añadir el resto del código JavaScript que ya tenías para otras funcionalidades
      // ...
    }
  
    // Cargar jQuery y ejecutar el código principal
    loadJQuery(main);
  })(window, document);