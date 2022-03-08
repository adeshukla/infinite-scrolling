"use strict";

const sectionWrapper = document.querySelectorAll(
    ".main-section-wrapper > .main-section"
);

let options = {
    threshold: 1,
};

function scrollAnimation(entries) {
    entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
    });
}

const observer = new IntersectionObserver(scrollAnimation, options);

sectionWrapper.forEach((section) => {
    observer.observe(section);
});

const lastSectionObserver = new IntersectionObserver(scrollToLoadMore);

function scrollToLoadMore(entries) {
    const lastSection = entries[0];
    if (!lastSection.isIntersecting) return;
    loadNewSection();
    lastSectionObserver.unobserve(lastSection.target);
    lastSectionObserver.observe(
        document.querySelector(".main-section:last-child")
    );
}

lastSectionObserver.observe(document.querySelector(".main-section:last-child"));

const mainSectionWrapper = document.querySelector(".main-section-wrapper");

function loadNewSection() {
    for (let i = 0; i < 10; i++) {
        const section = document.createElement("section");
        const h1 = document.createElement("h1");
        h1.textContent = "New Section for Testing!";
        section.append(h1);
        section.classList.add("main-section");
        observer.observe(section);
        mainSectionWrapper.append(section);
    }
}
