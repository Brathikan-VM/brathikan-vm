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

            console.log('Project added/updated successfully!');
            projectForm.reset();
            displayProjects();
        });
    }

    // Function to display projects
    function displayProjects() {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '';
        let projects = localStorage.getItem('projects');
        console.log('Retrieved projects:', projects);
        projects = projects ? JSON.parse(projects) : [];

        projects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');

            projectElement.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.video ? `<iframe src="${project.video}" frameborder="0" allowfullscreen></iframe>` : ''}
                ${project.images.map(img => `<img src="${img.trim()}" alt="${project.title} image">`).join('')}
                <p>${project.context}</p>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;

            projectsContainer.appendChild(projectElement);
        });

        // Attach event listeners to delete buttons
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                deleteProject(this.getAttribute('data-index'));
            });
        });
    }

    // Function to delete a project
    function deleteProject(index) {
        let projects = localStorage.getItem('projects');
        projects = projects ? JSON.parse(projects) : [];
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        displayProjects();
    }

    // Initial display of projects
    if (document.getElementById('projects-container')) {
        displayProjects();
    }
});