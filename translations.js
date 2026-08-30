// translations.js - ملف الترجمات المركزية

const translations = {
    en: {
        siteTitle: 'Younis Khezran',
        footerText: '© all rights reserved - Younis Khezaran - 2026',
        langBtn: 'AR',
        pageTitle: 'Project Details',
        detailsTitle: '📋 Project Details',
        backBtn: '← Back to Grid',
        errorTitle: '⚠️ Error',
        errorMessage: 'Project not specified.',
        backToGrid: 'Back to Grid',
        errorLoading: '⚠️ Sorry',
        errorLoadingMessage: 'An error occurred while loading data.',
        backToGridLink: 'Back to Grid',
        notFound: '🔍 Not Found',
        notFoundMessage: 'The requested project does not exist.',
        noProjects: 'No projects available',
        downloadBtn: '⬇️ View',
        notAvailable: '⛔ Not Available'
    },
    ar: {
        siteTitle: 'يونس خيزران',
        footerText: '© جميع الحقوق محفوظة - يونس خيزران - 2026',
        langBtn: 'EN',
        pageTitle: 'تفاصيل المشروع',
        detailsTitle: '📋 تفاصيل المشروع',
        backBtn: '← العودة للشبكة',
        errorTitle: '⚠️ خطأ',
        errorMessage: 'لم يتم تحديد المشروع.',
        backToGrid: 'العودة للشبكة',
        errorLoading: '⚠️ عذراً',
        errorLoadingMessage: 'حدث خطأ في تحميل البيانات.',
        backToGridLink: 'العودة للشبكة',
        notFound: '🔍 غير موجود',
        notFoundMessage: 'المشروع المطلوب غير موجود.',
        noProjects: 'لا توجد مشاريع حالياً',
        downloadBtn: '⬇️ اطلاع',
        notAvailable: '⛔ غير متاح'
    }
};

// متغير اللغة الأساسي (الإنجليزية)
let currentLanguage = 'en';

// دالة للحصول على النص حسب اللغة الحالية
function getLocalizedText(project, field) {
    if (!project || !project[field]) return '';
    const textObj = project[field];
    // إذا كان النص كائناً (له ترجمات)، أرجع الترجمة حسب اللغة الحالية
    if (typeof textObj === 'object' && textObj !== null) {
        return textObj[currentLanguage] || textObj['en'] || '';
    }
    // إذا كان النص سلسلة نصية عادية، أرجعها كما هي
    return textObj;
}

// دالة تغيير اللغة
function changeLang() {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    updateLanguage(newLang);
}

// دالة تحديث اللغة
function updateLanguage(lang) {
    currentLanguage = lang;
    const t = translations[lang];
    
    // تحديث اتجاه الصفحة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // تحديث جميع العناصر التي تحمل معرفات
    const elements = {
        'siteTitle': t.siteTitle,
        'footerText': t.footerText,
        'langBtn': t.langBtn,
        'pageTitle': t.pageTitle,
        'detailsTitle': t.detailsTitle,
        'backBtn': t.backBtn
    };
    
    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }
    
    // حفظ اللغة في localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // إعادة عرض المشاريع مع اللغة الجديدة
    if (typeof renderGrid === 'function') {
        renderGrid();
    }
    if (typeof renderProject === 'function') {
        renderProject();
    }
}

// تحميل اللغة المحفوظة عند بدء التشغيل
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    updateLanguage(savedLang);
});