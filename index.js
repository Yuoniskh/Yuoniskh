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

// دالة عرض الشبكة
async function renderGrid() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const projects = await fetchProjects();
    if (!projects) {
        grid.innerHTML = `
            <div class="error-message">
                <h2>⚠️ عذراً</h2>
                <p>حدث خطأ في تحميل المشاريع. يرجى المحاولة لاحقاً.</p>
            </div>
        `;
        return;
    }

    if (projects.length === 0) {
        grid.innerHTML = `<p style="text-align:center;grid-column:1/-1;">لا توجد مشاريع حالياً</p>`;
        return;
    }

    // إنشاء البطاقات
    grid.innerHTML = projects.map(project => `
        <a href="project.html?id=${project.id}" class="project-card">
            <div class="card-image-wrapper">
                <img 
                    src="${project.image}" 
                    alt="${project.name}" 
                    class="card-image"
                    loading="lazy"
                    onerror="this.src='https://via.placeholder.com/400x300/4a5568/white?text=${encodeURIComponent(project.name)}'"
                />
                <div class="project-name">${project.name}</div>
            </div>
        </a>
    `).join('');
}