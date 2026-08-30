// project.js - صفحة التفاصيل

document.addEventListener('DOMContentLoaded', function() {
    renderProject();
});

async function fetchProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('فشل في تحميل البيانات');
        return await response.json();
    } catch (error) {
        console.error('خطأ:', error);
        return null;
    }
}

async function renderProject() {
    const container = document.getElementById('projectDetails');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get('id'));

    if (isNaN(projectId)) {
        const t = translations[currentLanguage];
        container.innerHTML = `
            <div class="error-message">
                <h2>${t.errorTitle}</h2>
                <p>${t.errorMessage} <a href="index.html">${t.backToGrid}</a></p>
            </div>
        `;
        return;
    }

    const projects = await fetchProjects();
    if (!projects) {
        const t = translations[currentLanguage];
        container.innerHTML = `
            <div class="error-message">
                <h2>${t.errorLoading}</h2>
                <p>${t.errorLoadingMessage} <a href="index.html">${t.backToGridLink}</a></p>
            </div>
        `;
        return;
    }

    const project = projects.find(p => p.id === projectId);

    if (!project) {
        const t = translations[currentLanguage];
        container.innerHTML = `
            <div class="error-message">
                <h2>${t.notFound}</h2>
                <p>${t.notFoundMessage} <a href="index.html">${t.backToGridLink}</a></p>
            </div>
        `;
        return;
    }

    const hasDownload = project.downloadLink && project.downloadLink.trim() !== '';
    const t = translations[currentLanguage];
    
    // استخدام الدوال المساعدة للحصول على النصوص المترجمة
    const projectName = getLocalizedText(project, 'name');
    const projectDetails = getLocalizedText(project, 'details');

    container.innerHTML = `
        <div class="details-container">
            <img 
                src="${project.image}" 
                alt="${projectName}" 
                class="details-image"
                onerror="this.src='https://via.placeholder.com/600x400/4a5568/white?text=${encodeURIComponent(projectName)}'"
            />
            <div class="details-content">
                <h2>${projectName}</h2>
                <p class="details-text">${projectDetails}</p>
                
                ${hasDownload ? `
                    <a href="${project.downloadLink}" class="download-btn" target="_blank">
                        ${t.downloadBtn}
                    </a>
                ` : `
                    <span class="no-download">${t.notAvailable}</span>
                `}
            </div>
        </div>
    `;
}

// جعل الدوال متاحة عالمياً
window.renderProject = renderProject;
window.fetchProjects = fetchProjects;