```jsx
'use client';

import React, { useState } from 'react';

export default function ClientForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    age: '',
    city: '',
    birthDate: '',
    treatments: []
  });

  const cities = [
    'ירושלים', 'תל אביב', 'חיפה', 'באר שבע', 'אשדוד',
    'ראשון לציון', 'פתח תקווה', 'נתניה', 'חולון', 'רמת גן'
  ];

  const treatments = [
    'גוונים',
    'טיפול קרטין',
    'תספורת',
    'שטיפה',
    'צבע שורש',
    'בייביליס'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTreatmentChange = (treatment) => {
    setFormData(prev => {
      const newTreatments = prev.treatments.includes(treatment)
        ? prev.treatments.filter(t => t !== treatment)
        : [...prev.treatments, treatment];
      
      return {
        ...prev,
        treatments: newTreatments
      };
    });
  };

  const formatMessage = () => {
    return `
פרטי לקוח חדש:
שם מלא: ${formData.firstName} ${formData.lastName}
טלפון: ${formData.phone}
גיל: ${formData.age}
עיר: ${formData.city}
תאריך לידה: ${formData.birthDate}
טיפולים מבוקשים: ${formData.treatments.join(', ')}
    `.trim();
  };

  const sendToWhatsApp = () => {
    const message = encodeURIComponent(formatMessage());
    window.location.href = "https://wa.me/message/BDIEQJIXIRQ5P1?text=" + message;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="text-center border-b border-gray-700 pb-6">
          <h1 className="text-2xl font-bold text-white">מילוי טופס לקוח</h1>
          <p className="text-gray-300 mt-2">נא למלא את כל הפרטים</p>
        </div>
        <div className="mt-6">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4" dir="rtl">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-gray-200">שם פרטי</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-gray-200">שם משפחה</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-gray-200">מספר טלפון</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="0501234567"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="block text-gray-200">גיל</label>
              <input
                id="age"
                name="age"
                type="number"
                min="0"
                max="120"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="block text-gray-200">עיר מגורים</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="">בחר עיר</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="birthDate" className="block text-gray-200">תאריך לידה</label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-base text-gray-200 mb-2">בחירת טיפולים</label>
              <div className="grid grid-cols-2 gap-4">
                {treatments.map((treatment) => (
                  <div key={treatment} className="flex items-center p-3 bg-gray-700 rounded">
                    <input
                      type="checkbox"
                      id={treatment}
                      checked={formData.treatments.includes(treatment)}
                      onChange={() => handleTreatmentChange(treatment)}
                      className="ml-2"
                    />
                    <label htmlFor={treatment} className="text-gray-200">
                      {treatment}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={sendToWhatsApp}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded text-lg mt-6 disabled:opacity-50"
              disabled={!formData.firstName || !formData.lastName || !formData.phone || formData.treatments.length === 0}
            >
              שלח פרטים בוואטסאפ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```
