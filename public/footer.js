document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
        "Where bugs are a feature!",
        "Your wallet's worst nightmare.",
        "Proudly powered by spaghetti code.",
        "We break it, you buy it!",
        "Debugging is our passion... sometimes.",
        "All Bugs Reserved",
        "Powered by Coffee and Chaos ☕",
        "Our bugs have bugs",
        "Engineered with 99.9% creativity, 0.1% predictability",
        "Accidentally innovative since 2024",
        "We put the 'fun' in dysfunctional",
        "Where software quality is more of a suggestion",
        "Error 404: Quality Control Not Found",
        "Turning software defects into unexpected adventures",
        "Turning exceptions into attractions",
        "The future of software is somewhere else"
    ];

    // Select a random phrase
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    // Add it to the footer
    const footerElement = document.querySelector("footer");
    if (footerElement) {
        footerElement.innerHTML = `
    <div class="footer-content">
        <div class="social-links">
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
        </div>
        <p>© Buggy Store | ${randomPhrase}</p>
    </div>
    <img src="/images/cat.png" alt="Black Cat" class="footer-cat">
`;
    }
});
