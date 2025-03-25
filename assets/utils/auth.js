export function getUserRoles() {
    const token = localStorage.getItem('token');
    if (!token) return [];

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.roles || [];
    } catch (e) {
        return [];
    }
}

export function isAdmin() {
    return getUserRoles().includes('ROLE_ADMIN');
}

export function isLoggedIn() {
    return !!localStorage.getItem('token');
}
