import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext';
import emailjs from 'emailjs-com';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // EmailJS template parameters
      // These should match your EmailJS template variables
      const templateParams = {
        to_email: 'abhay.tomar5670@gmail.com', // Your email
        name: formData.name,                     // Matches {{name}} in template
        email: formData.email,                   // For your reference
        time: new Date().toLocaleString(),       // Matches {{time}} in template
        message: formData.message,               // Matches {{message}} in template
      };

      // Send email using EmailJS
      // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      
      let errorMessage = 'Failed to send message. Please try again or email me directly at abhay.tomar5670@gmail.com';
      
      // Check specific error types
      if (error.status === 401 || error.status === 403) {
        errorMessage = 'Email service authentication failed. Check your credentials in the code.';
      } else if (error.status === 404) {
        errorMessage = 'Service ID or Template ID not found. Check EMAILJS_SETUP.md';
      } else if (error.text && error.text.includes('Unauthorized')) {
        errorMessage = 'Invalid Public Key. Please verify your EmailJS credentials.';
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div name='contact' className={`w-full min-h-screen py-20 ${isDark ? 'bg-[#0a192f]' : 'bg-neutral-50'} flex justify-center items-center px-4 sm:px-6 md:px-8 fade-in-up`}> 
        <form onSubmit={handleSubmit} className='flex flex-col max-w-[600px] w-full fade-in-up'>
            <div className='pb-8'>
                <p className={`text-2xl sm:text-3xl md:text-4xl font-bold inline border-b-4 border-rose-400 ${isDark ? 'text-[#ccd6f6]' : 'text-gray-900'}`}>Contact</p>
                <p className={`py-4 text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Submit the form below or shoot me an email - abhay.tomar5670@gmail.com</p>
            </div>

            {/* Success Message */}
            {submitted && (
              <div className='mb-4 p-4 bg-green-500 text-white rounded-lg fade-in'>
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className='mb-4 p-4 bg-red-500 text-white rounded-lg'>
                {errors.submit}
              </div>
            )}

            {/* Name Field */}
            <div className='mb-4'>
              <label htmlFor='name' className={`block text-sm font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <input 
                className={`w-full p-3 rounded border-2 transition ${
                  errors.name 
                    ? 'border-red-500 bg-red-50'
                    : isDark 
                    ? 'bg-[#ccd6f6] border-gray-300 focus:border-rose-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:border-rose-400 focus:ring-1 focus:ring-rose-100'
                } focus:outline-none`}
                type="text" 
                placeholder='Your name' 
                name='name'
                id='name'
                value={formData.name}
                onChange={handleChange}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id='name-error' className='text-red-500 text-sm mt-1'>{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className='mb-4'>
              <label htmlFor='email' className={`block text-sm font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input 
                className={`w-full p-3 rounded border-2 transition ${
                  errors.email 
                    ? 'border-red-500 bg-red-50'
                    : isDark 
                    ? 'bg-[#ccd6f6] border-gray-300 focus:border-rose-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:border-rose-400 focus:ring-1 focus:ring-rose-100'
                } focus:outline-none`}
                type="email" 
                placeholder='your@email.com' 
                name='email'
                id='email'
                value={formData.email}
                onChange={handleChange}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id='email-error' className='text-red-500 text-sm mt-1'>{errors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div className='mb-4'>
              <label htmlFor='message' className={`block text-sm font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
              <textarea 
                className={`w-full p-3 rounded border-2 transition resize-none ${
                  errors.message 
                    ? 'border-red-500 bg-red-50'
                    : isDark 
                    ? 'bg-[#ccd6f6] border-gray-300 focus:border-rose-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:border-rose-400 focus:ring-1 focus:ring-rose-100'
                } focus:outline-none`}
                name="message" 
                id="message"
                rows="10" 
                placeholder='Write your message here...'
                value={formData.message}
                onChange={handleChange}
                aria-describedby={errors.message ? 'message-error' : undefined}
              ></textarea>
              {errors.message && (
                <p id='message-error' className='text-red-500 text-sm mt-1'>{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type='submit'
              disabled={isLoading}
              className={`enhanced-btn border-2 px-4 py-3 my-4 mx-auto flex items-center rounded ${isDark ? 'text-white hover:bg-rose-500 hover:border-rose-500 border-rose-500 bg-rose-500' : 'text-white bg-rose-500 hover:bg-rose-600 hover:border-rose-600 border-rose-500'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </span>
              ) : "Let's Collaborate"}
            </button>
        </form>
    </div>
  )
}

export default Contact
