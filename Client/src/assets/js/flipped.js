document.addEventListener("DOMContentLoaded", function() {
    var flipCards = document.querySelectorAll('.flip-card');
    
   
    flipCards.forEach(function(flipCard) {
        var flipCardInner = flipCard.querySelector('.flip-card-inner');
        var flipCardFront = flipCard.querySelector('.flip-card-front');

       
        flipCardFront.addEventListener('click', function(event) {
            flipCardInner.classList.add('flipped');
            event.stopPropagation(); 
        });
    });

    
    document.addEventListener('click', function(event) {
        
        flipCards.forEach(function(flipCard) {
            var flipCardInner = flipCard.querySelector('.flip-card-inner');
            if (!flipCardInner.contains(event.target)) {
                flipCardInner.classList.remove('flipped');
            }
        });
    });
})
