
'use server';

import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  // Mock authentication logic
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { message: 'Please enter both email and password.' };
  }

  // In a real app, you would validate credentials against a database
  console.log('Logging in with:', { email, password: '***' });

  redirect('/dashboard');
}

export async function register(prevState: any, formData: FormData) {
  // Mock registration logic
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  if (!username || !email || !password) {
    return { message: 'Please fill out all fields.' };
  }

  // In a real app, you would create a new user in the database
  console.log('Registering user:', { username, email, password: '***' });

  redirect('/dashboard');
}
