document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const userForm = document.getElementById('userForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const userIdInput = document.getElementById('userId');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const userList = document.getElementById('userList');
    const userSearch = document.getElementById('userSearch');
    
    // Temporary storage (replace with API calls later)
    let users = [];
    
    // Initialize the app
    loadUsers();
    
    // Event Listeners
    userForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
    userSearch.addEventListener('input', searchUsers);
    
    // Load all users
    function loadUsers() {
        // Simulate loading from API
        setTimeout(() => {
            users = [
                { id: 1, name: "John Doe", email: "john@example.com" },
                { id: 2, name: "Jane Smith", email: "jane@example.com" }
            ];
            renderUserList(users);
        }, 500);
    }
    
    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const userData = {
            name: nameInput.value,
            email: emailInput.value
        };
        
        if (userIdInput.value) {
            // Update existing user
            updateUser(userIdInput.value, userData);
        } else {
            // Create new user
            createUser(userData);
        }
    }
    
    // Create a new user
    function createUser(userData) {
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            ...userData
        };
        users.push(newUser);
        renderUserList(users);
        resetForm();
        alert('User created successfully!');
    }
    
    // Update existing user
    function updateUser(userId, userData) {
        const index = users.findIndex(u => u.id == userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
            renderUserList(users);
            resetForm();
            alert('User updated successfully!');
        }
    }
    
    // Delete user
    function deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            users = users.filter(u => u.id != userId);
            renderUserList(users);
            alert('User deleted successfully!');
        }
    }
    
    // Edit user (populate form)
    function editUser(user) {
        userIdInput.value = user.id;
        nameInput.value = user.name;
        emailInput.value = user.email;
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update User';
        cancelBtn.style.display = 'inline-block';
    }
    
    // Reset form
    function resetForm() {
        userForm.reset();
        userIdInput.value = '';
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add User';
        cancelBtn.style.display = 'none';
    }
    
    // Render user list
    function renderUserList(usersToRender) {
        if (usersToRender.length === 0) {
            userList.innerHTML = '<div class="empty">No users found</div>';
            return;
        }
        
        userList.innerHTML = usersToRender.map(user => `
            <div class="user-card">
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                </div>
                <div class="user-actions">
                    <button class="edit-btn" data-id="${user.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn" data-id="${user.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.getAttribute('data-id');
                const user = users.find(u => u.id == userId);
                if (user) editUser(user);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.getAttribute('data-id');
                deleteUser(userId);
            });
        });
    }
    
    // Search users
    function searchUsers() {
        const searchTerm = userSearch.value.toLowerCase();
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm)
        );
        renderUserList(filteredUsers);
    }
});