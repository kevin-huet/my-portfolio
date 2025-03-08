import { defineStore } from 'pinia';
import {jwtDecode} from "jwt-decode";
import {authService} from "@/services/auth.service";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        async checkAuth() {
            try {
                const response = await authService.getProfile();
                this.user = response.data;
                this.isAuthenticated = true;
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
            }
        },
        async login(email: string, password: string) {
            try {
                const token = await authService.login(email, password);
                console.log(token);
                const user: any = jwtDecode(token);
                console.log(user.username);
                localStorage.setItem('access_token', token);

                await this.checkAuth();

                return true;
            } catch (error) {
                console.error('Erreur de connexion', error);
                return false;
            }
        },
        logout() {
            localStorage.removeItem('access_token');
            this.isAuthenticated = false;
            this.user = null;
        },
    },
});
