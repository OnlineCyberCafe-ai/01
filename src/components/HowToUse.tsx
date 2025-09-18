import React from 'react';

const HowToUse: React.FC = () => {
  const steps = [
    'तुम्हाला जो फॉर्म भरायचा आहे ते ठरवा.',
    'त्यानंतर Registered Cyber Cafe मध्ये तुम्हाला Cyber Cafe दिसतील त्यासमोर Contact नावाचं बटण आहे त्यावर क्लिक करा.',
    'Contact बटणावर क्लिक केल्यानंतर तुमच्या समोर एक फॉर्म उघडेल.',
    'फॉर्ममध्ये तुमचे संपूर्ण नाव, तुमचा व्हॉट्सॲप नंबर, आणि तुम्हाला कोणता फॉर्म भरायचा आहे त्या फॉर्मचे नाव भरा आणि Submit बटणावर क्लिक करा.',
    'थोड्या वेळात आमचे Cyber Assistant तुम्हाला व्हॉट्सॲपद्वारे संपर्क करतील आणि तुमचा फॉर्म भरून देतील.',
  ];

  return (
    <div className="mt-8 bg-white p-6 md:p-8 rounded-lg shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold mb-2 text-indigo-700">वेबसाईटचा वापर कसा करावा</h2>
      <p className="text-slate-600 mb-6">"ऑनलाईन सायबर कॅफे वापरण्यासाठी हे सोपे टप्पे पाळा:"</p>
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
              {index + 1}
            </div>
            <p className="text-slate-700 flex-1">{step}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HowToUse;