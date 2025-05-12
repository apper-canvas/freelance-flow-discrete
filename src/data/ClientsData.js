/**
 * Comprehensive client data structure with validation utilities
 * This file provides a centralized location for client data management
 */

// Validation utilities for client data
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  // Basic phone validation - can be enhanced based on specific requirements
  const phoneRegex = /^[\d\+\-\(\) ]{7,20}$/;
  return phoneRegex.test(phone);
};

export const validateClientData = (client) => {
  const errors = {};
  
  if (!client.name || client.name.trim() === '') {
    errors.name = 'Name is required';
  }
  
  if (!client.email || !validateEmail(client.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (client.phone && !validatePhone(client.phone)) {
    errors.phone = 'Invalid phone number format';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Sample client data with comprehensive contact information
export const clients = [
  {
    id: 'c1',
    email: 'client@example.com',
    password: 'password123', // In a real app, never store plaintext passwords
    name: 'Demo Client',
    company: 'ABC Corporation',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    },
    website: 'https://abccorp.example.com',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/abccorp',
      twitter: '@ABCCorp'
    },
    taxInfo: {
      taxId: 'US-ABC-12345',
      vatNumber: ''
    },
    notes: 'Key client with multiple ongoing projects',
    status: 'active',
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-06-22T14:45:00Z'
  },
  {
    id: 'c2',
    email: 'client2@example.com',
    password: 'password123',
    name: 'Test Client',
    company: 'XYZ Industries',
    phone: '+1 (555) 987-6543',
    address: {
      street: '456 Tech Park',
      city: 'Boston',
      state: 'MA',
      zipCode: '02110',
      country: 'USA'
    },
    website: 'https://xyz-industries.example.com',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/xyz-industries',
      twitter: '@XYZIndustries'
    },
    taxInfo: {
      taxId: 'US-XYZ-67890',
      vatNumber: ''
    },
    notes: 'New client, started with a small project',
    status: 'active',
    createdAt: '2023-03-10T10:15:00Z',
    updatedAt: '2023-05-18T16:20:00Z'
  }
];