document.addEventListener("DOMContentLoaded", function() {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const accordionItem = header.parentElement;
            const description = accordionItem.querySelector(".description");
            const icon = accordionItem.querySelector("i");

            accordionItem.classList.toggle("open");

            if (accordionItem.classList.contains("open")) {
                description.style.maxHeight = description.scrollHeight + "px";
                icon.classList.replace("fa-plus", "fa-minus");
            } else {
                description.style.maxHeight = "0";
                icon.classList.replace("fa-minus", "fa-plus");
            }

            closeOtherAccordions(accordionItem);
        });
    });

    function closeOtherAccordions(currentAccordion) {
        const accordionItems = document.querySelectorAll(".accordion-item");

        accordionItems.forEach(item => {
            if (item !== currentAccordion && item.classList.contains("open")) {
                item.classList.remove("open");
                const description = item.querySelector(".description");
                const icon = item.querySelector("i");
                description.style.maxHeight = "0";
                icon.classList.replace("fa-minus", "fa-plus");
            }
        });
    }
});
