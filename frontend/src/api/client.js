const API_BASE_URL = 'https://coeptechzest.org/backend/api.php';

export const api = {
    async getMatches(status = null) {
        try {
            const url = status ? `${API_BASE_URL}?action=get_matches&status=${status}` : `${API_BASE_URL}?action=get_matches`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching matches:', error);
            return [];
        }
    },

    async getSports() {
        try {
            const res = await fetch(`${API_BASE_URL}?action=get_sports`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching sports:', error);
            return [];
        }
    },

    async login(username, password) {
        try {
            const res = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', username, password })
            });
            if (!res.ok) throw new Error('Login failed');
            return await res.json();
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error' };
        }
    },

    async verifySession(password) {
        try {
            const res = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'verify_session', password })
            });
            if (!res.ok) return { success: false };
            return await res.json();
        } catch (error) {
            return { success: false };
        }
    },

    async addMatch(data, password) {
        try {
            const res = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'add_match', ...data, password })
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (error) {
            console.error('Add match error:', error);
            return { success: false, error: error.message };
        }
    },

    async updateScore(data, password) {
        try {
            const res = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update_score', ...data, password })
            });
            if (!res.ok) throw new Error('Failed to update');
            return await res.json();
        } catch (error) {
            console.error('Update score error:', error);
            return { success: false };
        }
    },

    async deleteMatch(id, password, pin) {
        try {
            // Updated to send JSON instead of FormData for consistency, 
            // but api.php uses getInput() so JSON is fine.
            const res = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id, password, pin })
            });
            if (!res.ok) throw new Error('Failed to delete');
            return await res.json();
        } catch (error) {
            console.error('Delete error:', error);
            return { success: false, error: 'Network error' };
        }
    }
};
