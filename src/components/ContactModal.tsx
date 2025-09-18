import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { EMAILJS_CONFIG } from '../constants';
import { XIcon } from './icons/XIcon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobOptions: string[];
}

type Status = 'idle' | 'sending' | 'success' | 'error';

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, jobOptions }) => {
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [formName, setFormName] = useState('');
  const [otherForm, setOtherForm] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const showOtherInput = formName === 'Other';

  const resetForm = () => {
    setFullName('');
    setWhatsappNumber('');
    setFormName('');
    setOtherForm('');
    setStatus('idle');
    setMessage('');
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleFormNameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormName(e.target.value);
    if (e.target.value !== 'Other') {
      setOtherForm('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const finalFormName = formName === 'Other' ? otherForm : formName;

    if (!fullName || !whatsappNumber || !finalFormName) {
      setMessage('Please fill out all fields.');
      setStatus('error');
      return;
    }

    const templateParams = {
      full_name: fullName,
      whatsapp_number: whatsappNumber,
      form_name: finalFormName,
      submission_time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    try {
      const emailjs = (window as any).emailjs;
      if (!emailjs) {
        throw new Error("EmailJS script not loaded");
      }
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams, EMAILJS_CONFIG.USER_ID);
      setMessage('Your request has been sent successfully!');
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setMessage('Failed to send your request. Please try again.');
      setStatus('error');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-md relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <XIcon />
        </button>
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Contact Cyber Assistant</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label htmlFor="whatsappNumber" className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
              <input type="tel" id="whatsappNumber" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label htmlFor="formName" className="block text-sm font-medium text-slate-700 mb-1">Which form to fill?</label>
              <select id="formName" value={formName} onChange={handleFormNameChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                <option value="" disabled>Select a form</option>
                {jobOptions.map((job, index) => <option key={index} value={job}>{job}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>
            {showOtherInput && (
              <div>
                <label htmlFor="otherFormInput" className="block text-sm font-medium text-slate-700 mb-1">Please specify</label>
                <input type="text" id="otherFormInput" value={otherForm} onChange={(e) => setOtherForm(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Specify the form name" />
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {status === 'sending' ? 'Sending...' : 'Submit Request'}
          </button>
          {message && (
            <p className={`mt-4 text-sm text-center font-medium ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactModal;