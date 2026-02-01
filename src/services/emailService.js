import emailjs from 'emailjs-com';

// Initialize EmailJS
// You'll need to get these from EmailJS dashboard
// Sign up at: https://www.emailjs.com/

export const initEmailJS = () => {
  emailjs.init('YOUR_PUBLIC_KEY'); // Get this from EmailJS dashboard
};

export const sendEmail = (templateParams) => {
  return emailjs.send(
    'YOUR_SERVICE_ID',      // Get from EmailJS dashboard
    'YOUR_TEMPLATE_ID',     // Get from EmailJS dashboard
    templateParams,
    'YOUR_PUBLIC_KEY'       // Same as init
  );
};
