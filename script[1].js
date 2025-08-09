// Copy protection and security
document.addEventListener('DOMContentLoaded', function() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable common keyboard shortcuts for copying
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+A (Select All)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+C (Copy)
        if (e.ctrlKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+V (Paste)
        if (e.ctrlKey && e.keyCode === 86) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+X (Cut)
        if (e.ctrlKey && e.keyCode === 88) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+S (Save)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        // Disable F12 (Developer Tools)
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
    });

    // Disable text selection
    document.onselectstart = function() {
        return false;
    };
    
    document.onmousedown = function() {
        return false;
    };

    // Disable drag and drop
    document.ondragstart = function() {
        return false;
    };

    // Show warning message for developer tools
    let devtools = {
        open: false,
        orientation: null
    };
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
            if (!devtools.open) {
                devtools.open = true;
                console.clear();
                console.log('%cتحذير!', 'color: red; font-size: 50px; font-weight: bold;');
                console.log('%cهذا الموقع محمي بحقوق الطبع والنشر', 'color: red; font-size: 16px;');
            }
        } else {
            devtools.open = false;
        }
    }, 500);
});

// Tab functionality
function showArticle(articleId) {
    // Hide all articles
    const articles = document.querySelectorAll('.article');
    articles.forEach(article => {
        article.classList.remove('active');
    });

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected article
    document.getElementById(articleId + '-article').classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');

    // Clear comments for the new article
    loadCommentsForArticle(articleId);
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Create mailto link to send subscription to molmohsen@pm.me
    const subject = encodeURIComponent('اشتراك جديد في نشرة سديم الوعي');
    const body = encodeURIComponent(`اشتراك جديد في النشرة البريدية:\n\nالبريد الإلكتروني: ${email}\nالتاريخ: ${new Date().toLocaleDateString('ar-SA')}\nالوقت: ${new Date().toLocaleTimeString('ar-SA')}`);
    
    const mailtoLink = `mailto:molmohsen@pm.me?subject=${subject}&body=${body}`;
    
    // Try to open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('شكراً لك! تم تسجيل اشتراكك في النشرة البريدية.');
    
    // Clear the form
    event.target.reset();
}

// Comments functionality
let comments = {
    'melich': [
        {
            author: 'قارئ مهتم',
            date: 'منذ يوم واحد',
            text: 'مقال رائع ومعمق! شكراً لك على هذا التحليل الفلسفي الثري.'
        }
    ],
    'bohm': [
        {
            author: 'باحث في الفيزياء',
            date: 'منذ يومين',
            text: 'موضوع مثير للاهتمام! لم أكن أعلم بهذا التقاطع بين الفيزياء الكمومية والاستخبارات.'
        }
    ]
};

function addComment(event) {
    event.preventDefault();
    
    const textarea = event.target.querySelector('textarea');
    const commentText = textarea.value.trim();
    
    if (commentText === '') {
        alert('يرجى كتابة تعليق قبل الإرسال.');
        return;
    }
    
    // Determine which article is currently active
    const activeArticle = document.querySelector('.article.active');
    const articleId = activeArticle.id.replace('-article', '');
    
    // Create new comment object
    const newComment = {
        author: 'زائر',
        date: 'الآن',
        text: commentText
    };
    
    // Add comment to the appropriate article
    if (!comments[articleId]) {
        comments[articleId] = [];
    }
    comments[articleId].unshift(newComment);
    
    // Refresh comments display
    loadCommentsForArticle(articleId);
    
    // Clear the form
    textarea.value = '';
    
    // Show success message
    alert('تم إضافة تعليقك بنجاح!');
}

function loadCommentsForArticle(articleId) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    
    if (comments[articleId] && comments[articleId].length > 0) {
        comments[articleId].forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML = `
                <div class="comment-author">${comment.author}</div>
                <div class="comment-date">${comment.date}</div>
                <div>${comment.text}</div>
            `;
            commentsList.appendChild(commentDiv);
        });
    } else {
        commentsList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">لا توجد تعليقات بعد. كن أول من يعلق!</p>';
    }
}

// Initialize comments for the default article
document.addEventListener('DOMContentLoaded', function() {
    loadCommentsForArticle('melich');
});

// Smooth scrolling for better user experience
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Additional security measures
(function() {
    // Disable console
    let devtools = false;
    
    Object.defineProperty(window, 'console', {
        get: function() {
            devtools = true;
            return {
                log: function() {},
                warn: function() {},
                error: function() {},
                info: function() {},
                clear: function() {}
            };
        }
    });
    
    // Check for devtools periodically
    setInterval(function() {
        if (devtools) {
            document.body.innerHTML = '<div style="text-align: center; padding: 50px; font-size: 24px; color: red;">هذا الموقع محمي بحقوق الطبع والنشر</div>';
        }
    }, 1000);
})();

// Disable image saving
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
        
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    });
});

