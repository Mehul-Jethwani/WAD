// Sample data for pets, services, and NGOs
const sampleData = {
    mumbai: {
        pets: [
            { name: 'Buddy', breed: 'Golden Retriever', age: '2 years', location: 'Pet Store A' },
            { name: 'Whiskers', breed: 'Persian Cat', age: '1 year', location: 'Shelter B' }
        ],
        services: [
            { name: 'Vet Clinic X', type: 'Veterinary', location: 'Mumbai Central' },
            { name: 'Grooming Salon Y', type: 'Grooming', location: 'Andheri' }
        ],
        ngos: [
            { name: 'Animal Welfare NGO', description: 'Helps stray animals', location: 'Mumbai' }
        ]
    },
    delhi: {
        pets: [
            { name: 'Max', breed: 'Labrador', age: '3 years', location: 'Pet Store C' }
        ],
        services: [
            { name: 'Vet Clinic Z', type: 'Veterinary', location: 'Connaught Place' }
        ],
        ngos: [
            { name: 'Delhi Animal Rescue', description: 'Rescues and rehabs animals', location: 'Delhi' }
        ]
    },
    bangalore: {
        pets: [
            { name: 'Bella', breed: 'Beagle', age: '1.5 years', location: 'Shelter D' }
        ],
        services: [
            { name: 'Training Center W', type: 'Training', location: 'Koramangala' }
        ],
        ngos: [
            { name: 'Bangalore Pet Care', description: 'Promotes pet adoption', location: 'Bangalore' }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .hero-content, .hero-image, .care-card, .ngo-card, .pet-card, .service-card');
    animatedElements.forEach(el => observer.observe(el));

    // Typing effect for Hero text
    const heroText = document.querySelector('.hero p');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        typeWriter();
    }

    // Global Location Logic
    const globalLocationSelect = document.getElementById('global-location-select');
    
    // Load saved location on page load
    const savedCity = localStorage.getItem('userLocation');
    if (savedCity) {
        if (globalLocationSelect) {
            globalLocationSelect.value = savedCity;
        }
        populatePets(savedCity);
        populateServices(savedCity);
        populateNGOs(savedCity);
    }

    if (globalLocationSelect) {
        globalLocationSelect.addEventListener('change', function() {
            const selectedCity = this.value;
            localStorage.setItem('userLocation', selectedCity);
            
            if (selectedCity) {
                populatePets(selectedCity);
                populateServices(selectedCity);
                populateNGOs(selectedCity);
            }
        });
    }

    // Appointment Form Logic
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const serviceType = document.getElementById('service-type').value;
            const date = document.getElementById('appointment-date').value;
            alert(`Appointment requested for ${serviceType} on ${date}. We'll connect you with the service provider soon!`);
        });
    }
});

// Function to populate pet list
function populatePets(city) {
    const petList = document.querySelector('.pet-list');
    if (!petList) return;
    petList.innerHTML = '';
    if (sampleData[city] && sampleData[city].pets) {
        sampleData[city].pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card visible';
            petCard.innerHTML = `
                <img src="https://via.placeholder.com/300x200?text=${pet.name}" alt="${pet.name}">
                <h3>${pet.name}</h3>
                <p>Breed: ${pet.breed}</p>
                <p>Age: ${pet.age}</p>
                <p>Location: ${pet.location}</p>
            `;
            petList.appendChild(petCard);
        });
    }
}

// Function to populate service list
function populateServices(city) {
    const serviceList = document.querySelector('.service-list');
    if (!serviceList) return;
    serviceList.innerHTML = '';
    if (sampleData[city] && sampleData[city].services) {
        sampleData[city].services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card visible';
            serviceCard.innerHTML = `
                <img src="https://via.placeholder.com/300x200?text=${service.name}" alt="${service.name}">
                <h3>${service.name}</h3>
                <p>Type: ${service.type}</p>
                <p>Location: ${service.location}</p>
            `;
            serviceList.appendChild(serviceCard);
        });
    }
}

// Function to populate NGO list
function populateNGOs(city) {
    const ngoList = document.querySelector('.ngo-list');
    if (!ngoList) return;
    ngoList.innerHTML = '';
    if (sampleData[city] && sampleData[city].ngos) {
        sampleData[city].ngos.forEach(ngo => {
            const ngoCard = document.createElement('div');
            ngoCard.className = 'ngo-card visible';
            ngoCard.innerHTML = `
                <img src="https://via.placeholder.com/300x200?text=${ngo.name}" alt="${ngo.name}">
                <h3>${ngo.name}</h3>
                <p>${ngo.description}</p>
                <p>Location: ${ngo.location}</p>
            `;
            ngoList.appendChild(ngoCard);
        });
    }
}
