// index.js - الصفحة الرئيسية

document.addEventListener('DOMContentLoaded', function() {
    renderGrid();
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

// دالة عرض الشبكة مع دعم الترجمة
async function renderGrid() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const projects = await fetchProjects();
    if (!projects) {
        const t = translations[currentLanguage];
        grid.innerHTML = `
            <div class="error-message">
                <h2>${t.errorLoading}</h2>
                <p>${t.errorLoadingMessage}</p>
            </div>
        `;
        return;
    }

    if (projects.length === 0) {
        const t = translations[currentLanguage];
        grid.innerHTML = `<p style="text-align:center;grid-column:1/-1;">${t.noProjects}</p>`;
        return;
    }

    // إنشاء البطاقات مع استخدام الترجمة
    grid.innerHTML = projects.map(project => {
        // استخدام الدالة المساعدة للحصول على الاسم المترجم
        const projectName = getLocalizedText(project, 'name');
        
        return `
            <a href="project.html?id=${project.id}" class="project-card">
                <div class="card-image-wrapper">
                    <img 
                        src="${project.image}" 
                        alt="${projectName}" 
                        class="card-image"
                        loading="lazy"
                        onerror="this.src='https://via.placeholder.com/400x300/4a5568/white?text=${encodeURIComponent(projectName)}'"
                    />
                    <div class="project-name">${projectName}</div>
                </div>
            </a>
        `;
    }).join('');
}

// جعل الدوال متاحة عالمياً للاستخدام من translatios.js
window.renderGrid = renderGrid;
window.fetchProjects = fetchProjects;