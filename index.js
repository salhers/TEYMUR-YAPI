
document.addEventListener('DOMContentLoaded', () => {
    const counterSection = document.querySelector('#istatistikler');
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    // Sayaç Fonksiyonu
    const startCounter = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Bölüm görünür olduğunda tetikleme (Observer)
    const observerOptions = { threshold: 0.3 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // entry.isIntersecting: Bölüm ekrana girdi mi?
            if (entry.isIntersecting) {
                startCounter();
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    if (counterSection) {
        observer.observe(counterSection);
    } else {
        console.error("Hata: #istatistikler ID'li bölüm bulunamadı!");
    }
});
if ('IntersectionObserver' in window) {
  observer.observe(document.querySelector('.bg-dark'));
} else {
  startCounters(); 
}

