// Authentication module for login and signup

const STORAGE_KEY = 'dollartrack_users';
const SESSION_KEY = 'dollartrack_session';

// Password hashing using SHA-256
async function hashPassword(password, salt = null) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + (salt || ''));
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Generate a random salt
function generateSalt() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

// Get all users from localStorage
export function getUsers() {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Create a new user
export async function createUser(name, email, password) {
  const users = getUsers();
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'User with this email already exists' };
  }
  
  // Generate salt and hash password
  const salt = generateSalt();
  const hashedPassword = await hashPassword(password, salt);
  
  // Create new user object
  const newUser = {
    id: Date.now().toString(),
    name: name,
    email: email,
    password: hashedPassword,
    salt: salt,
    createdAt: new Date().toISOString()
  };
  
  // Add user to array and save
  users.push(newUser);
  saveUsers(users);
  
  return { success: true, message: 'Account created successfully!', user: { ...newUser, password: undefined } };
}

// Authenticate user login
export async function loginUser(email, password) {
  const users = getUsers();
  
  // Find user by email
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  
  // Check password with salt
  const hashedInput = await hashPassword(password, user.salt);
  if (user.password !== hashedInput) {
    return { success: false, message: 'Incorrect password' };
  }
  
  // Create session
  const session = {
    userId: user.id,
    email: user.email,
    name: user.name,
    loginTime: new Date().toISOString()
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  
  return { success: true, message: 'Login successful!', user: { ...user, password: undefined } };
}

// Get current session
export function getCurrentSession() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

// Logout user
export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  return { success: true, message: 'Logged out successfully' };
}

// Check if user is authenticated
export function isAuthenticated() {
  return getCurrentSession() !== null;
}

