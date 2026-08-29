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
        container.innerHTML = `
            <div class="error-message">
                <h2>⚠️ خطأ</h2>
                <p>لم يتم تحديد المشروع. <a href="index.html">العودة للشبكة</a></p>
            </div>
        `;
        return;
    }

    const projects = await fetchProjects();
    if (!projects) {
        container.innerHTML = `
            <div class="error-message">
                <h2>⚠️ عذراً</h2>
                <p>حدث خطأ في تحميل البيانات. <a href="index.html">العودة للشبكة</a></p>
            </div>
        `;
        return;
    }

    const project = projects.find(p => p.id === projectId);

    if (!project) {
        container.innerHTML = `
            <div class="error-message">
                <h2>🔍 غير موجود</h2>
                <p>المشروع المطلوب غير موجود. <a href="index.html">العودة للشبكة</a></p>
            </div>
        `;
        return;
    }

    const hasDownload = project.downloadLink && project.downloadLink.trim() !== '';

    container.innerHTML = `
        <div class="details-container">
            <img 
                src="${project.image}" 
                alt="${project.name}" 
                class="details-image"
                onerror="this.src='https://via.placeholder.com/600x400/4a5568/white?text=${encodeURIComponent(project.name)}'"
            />
            <div class="details-content">
                <h2>${project.name}</h2>
                <p class="details-text">${project.details}</p>
                
                ${hasDownload ? `
                    <a href="${project.downloadLink}" class="download-btn" target="_blank">
                        ⬇️ اطلاع 
                    </a>
                ` : `
                    <span class="no-download">⛔ غير متاح </span>
                `}
            </div>
        </div>
    `;
}