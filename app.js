document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });

    // Typing effect for hero section
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.createElement('span');
    cursorSpan.classList.add('cursor');
    cursorSpan.textContent = '|';
    typedTextSpan.after(cursorSpan);

    const textArray = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            // Erase after delay
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            // Type next text
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start the typing effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Function to fetch GitHub repositories
    async function fetchGitHubRepos() {
        const username = 'nanaoosaki'; // Replace with your GitHub username
        const reposContainer = document.getElementById('github-repos');
        
        try {
            // Show loading indicator
            reposContainer.innerHTML = '<div class="loading">Loading repositories...</div>';
            
            // Fetch repositories from GitHub API
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
            
            if (!response.ok) {
                throw new Error(`GitHub API request failed with status ${response.status}`);
            }
            
            const repos = await response.json();
            
            // Clear loading indicator
            reposContainer.innerHTML = '';
            
            // Create repository cards
            repos.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.className = 'repo-card';
                
                // Format date
                const updatedDate = new Date(repo.updated_at);
                const formattedDate = updatedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                // Create repository card HTML
                repoCard.innerHTML = `
                    <h4>${repo.name}</h4>
                    <p>${repo.description || 'No description available'}</p>
                    <div class="repo-details">
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-calendar-alt"></i> ${formattedDate}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="btn primary-btn">View Repository</a>
                `;
                
                reposContainer.appendChild(repoCard);
            });
            
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            reposContainer.innerHTML = `<div class="error">Error loading repositories: ${error.message}</div>`;
        }
    }

    // Fetch GitHub repositories when the page loads
    fetchGitHubRepos();

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it to the console
            console.log('Form submitted:', formData);
            
            // Show success message (in a real app, you'd do this after successful submission)
            const formSubmitMessage = document.createElement('div');
            formSubmitMessage.className = 'form-success';
            formSubmitMessage.innerHTML = 'Thank you! Your message has been sent successfully.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(formSubmitMessage);
        });
    }
}); 