document.addEventListener("DOMContentLoaded", function() {
    const projectForm = document.getElementById('project-form');
    
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const video = document.getElementById('video').value;
            const images = document.getElementById('images').value.split(',');
            const context = document.getElementById('context').value;

            const project = {
                title,
                description,
                video,
                images,
                context
            };

            let projects = localStorage.getItem('projects');
            projects = projects ? JSON.parse(projects) : [];
            projects.push(project);
            localStorage.setItem('projects', JSON.stringify(projects));

            alert('Project added/updated successfully!');
            projectForm.reset();
        });
    }

    // Function to display projects
    function displayProjects() {
        const projectsContainer = document.getElementById('projects-container');
        let projects = localStorage.getItem('projects');
        projects = projects ? JSON.parse(projects) : [];

        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');

            projectElement.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.video ? `<iframe src="${project.video}" frameborder="0" allowfullscreen></iframe>` : ''}
                ${project.images.map(img => `<img src="${img.trim()}" alt="${project.title} image">`).join('')}
                <p>${project.context}</p>
            `;

            projectsContainer.appendChild(projectElement);
        });
    }

    // Call displayProjects if on projects page
    if (document.getElementById('projects-container')) {
        displayProjects();
    }
});