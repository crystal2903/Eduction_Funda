// AOS-Init
AOS.init();

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
    }
});

// scroll-function

window.onload = function () {
    const container = document.querySelector('.container');
    const svg = document.querySelector('svg');
    const progressBar = document.querySelector('.progress-bar');
    const pct = document.querySelector('.pct');
    const totalLength = progressBar.getTotalLength();

    setTopValue(svg);

    progressBar.style.strokeDasharray = totalLength;
    progressBar.style.strokeDashoffset = totalLength;

    window.addEventListener('scroll', () => {
        setProgress(container, pct, progressBar, totalLength);
    });

    window.addEventListener('resize', () => {
        setTopValue(svg);
    });
}

function setTopValue(svg) {
    svg.style.top = document.documentElement.clientHeight * 0.5 - (svg.getBoundingClientRect().height * 0.5) + 'px';
}


function setProgress(container, pct, progressBar, totalLength) {
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;

    const percentage = scrollTop / (scrollHeight - clientHeight);
    if (percentage === 1) {
        container.classList.add('completed');
    } else {
        container.classList.remove('completed');
    }
    pct.innerHTML = Math.round(percentage * 100) + '%';
    progressBar.style.strokeDashoffset = totalLength - totalLength * percentage;
}

$(document).ready(function () {
    $(function () {
        $("#backtotopbtn").click(function () {
            $("html, body").animate({ scrollTop: 0 }, 1);
            return false;
        });
    });
})

// Get the button
let mybutton = document.getElementById("backtotopbtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// counter

$(document).ready(function () {
    // Function to start the animation
    function startAnimation(element) {
        element.find('.count-up').each(function () {
            var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
            $(this).prop('counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 1000,
                step: function (func) {
                    $(this).text(parseFloat(func).toFixed(size));
                }
            });
        });
    }

    // Initialize Intersection Observer
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                startAnimation($(entry.target));
                // Stop observing the target once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe the specific section
    var targetElement = document.querySelector('.countup-animation');
    if (targetElement) {
        observer.observe(targetElement);
    }
});



// health-coach

// swiper-js
var swiper = new Swiper(".mySwiper-health", {
    loop: true,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesProgress: true,
    direction: "vertical",
});

var swiper2 = new Swiper(".mySwiper2-health", {
    loop: true,
    navigation: {
        nextEl: ".next-btn",
        prevEl: ".prev-btn",
    },
    thumbs: {
        swiper: swiper,
    },
});


/* ====================================================================================== */
/* ---------------------------------Blog-standard------------------------------------- */
/* ====================================================================================== */

var swiper = new Swiper(".mySwiper-blog", {
    navigation: {
        nextEl: ".swiper-button-next-blog",
        prevEl: ".swiper-button-prev-blog",
    },

    loop: true,
});


/* ====================================================================================== */
/* ---------------------------------Blog masonry----------------------------------- */
/* ====================================================================================== */


document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll('.product');
    const container = document.querySelector('.grid-container');
    const gap = 30; // Gap between products in pixels

    // Function to adjust columns dynamically based on screen width
    function getColumnsPerRow() {
        const width = window.innerWidth;

        if (width >= 992) {
            return 3; // 3 columns for large screens
        } else if (width >= 768) {
            return 2; // 2 columns for tablets
        } else {
            return 1; // 2 columns for mobile devices
        }
    }

    function calculateLayout() {
        const columnsPerRow = getColumnsPerRow(); // Get the current columns per row
        const containerWidth = container.offsetWidth; // Get the container's width
        const productWidth = (containerWidth - (columnsPerRow - 1) * gap) / columnsPerRow; // Calculate product width

        // Array to store the current heights of each column in the grid
        let columnHeights = Array(columnsPerRow).fill(0); // Initialize with 0 height

        // Loop through each product
        products.forEach((product, index) => {
            // Get the current column index (modulus of the number of columns)
            let columnIndex = index % columnsPerRow;

            // Set the width for each product dynamically
            product.style.width = productWidth + 'px';

            // Set the left position based on the column index
            let leftPosition = columnIndex * (productWidth + gap);

            // Set the top position based on the current height of the column
            let topPosition = columnHeights[columnIndex];

            // Update the product's position
            product.style.left = leftPosition + 'px';
            product.style.top = topPosition + 'px';

            // Update the column's height after placing the product
            columnHeights[columnIndex] += product.offsetHeight + gap;
        });

        container.style.height = Math.max(...columnHeights) + 'px'; // Adjust container height based on the tallest column
    }

    // Recalculate layout on window resize
    window.addEventListener('resize', calculateLayout);

    // Initial layout calculation
    calculateLayout();
});
