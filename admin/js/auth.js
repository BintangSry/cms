document.addEventListener('DOMContentLoaded', () => {
    // Check if already authenticated
    fetch('/api/auth/check')
        .then(res => res.json())
        .then(data => {
            if (data.authenticated) {
                window.location.href = '/admin/dashboard.html';
            }
        });

    const form = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-msg');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorMsg.classList.add('hidden');
            
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Signing in...';
            btn.disabled = true;

            const username = form.username.value;
            const password = form.password.value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    window.location.href = '/admin/dashboard.html';
                } else {
                    errorMsg.textContent = data.message;
                    errorMsg.classList.remove('hidden');
                }
            } catch (error) {
                errorMsg.textContent = 'Server error. Please try again.';
                errorMsg.classList.remove('hidden');
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }
});
