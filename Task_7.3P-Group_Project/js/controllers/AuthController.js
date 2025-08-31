class AuthController {
    constructor() {
        this.view = new LoginView();
    }
    
    login(username, password) {
        this.view.setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            if (username === 'admin' && password === 'password') {
                const userData = {
                    id: 1,
                    username: 'admin',
                    name: 'Administrator',
                    email: 'admin@myems.com',
                    role: 'admin'
                };
                
                const user = new User(userData);
                StorageService.set('user', user);
                window.myEMSApp.user = user;
                window.myEMSApp.showView('dashboard');
                window.myEMSApp.updateUserInfo();
                this.view.clearForm();
            } else {
                this.view.showMessage('Invalid username or password', 'error');
            }
            
            this.view.setLoading(false);
        }, 1000);
    }
    
    logout() {
        StorageService.remove('user');
        window.myEMSApp.user = null;
        window.myEMSApp.showView('login');
    }
    
    updateProfile(profileData) {
        if (window.myEMSApp.user) {
            window.myEMSApp.user.name = profileData.name;
            window.myEMSApp.user.email = profileData.email;
            StorageService.set('user', window.myEMSApp.user);
            window.myEMSApp.updateUserInfo();
            
            // Show success message
            alert('Profile updated successfully!');
        }
    }
}