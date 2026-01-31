import React, { useState } from 'react';

export default function VSGAssessment() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');

  const sections = [
    {
      title: "Welcome",
      questions: []
    },
    {
      title: "Part A: The Core 4 Framework",
      questions: [
        { id: "core4_list", label: "1. What are the four parts of VSG's Core 4 framework? List them.", type: "textarea" },
        { id: "core4_generate", label: "2a. For Generate Power, name one specific service VSG offers:", type: "text" },
        { id: "core4_store", label: "2b. For Store Power, name one specific service VSG offers:", type: "text" },
        { id: "core4_upgrade", label: "2c. For Upgrade Power, name one specific service VSG offers:", type: "text" },
        { id: "core4_maintain", label: "2d. For Maintain Power, name one specific service VSG offers:", type: "text" },
        { id: "core4_scenario", label: "3. A homeowner wants to keep the lights on during power outages. Which Core 4 areas are most relevant and why?", type: "textarea" }
      ]
    },
    {
      title: "Part B: Understanding VSG",
      questions: [
        { id: "vsg_different", label: "4. In your own words, what makes VSG different from other solar companies?", type: "textarea" },
        { id: "kyle_vision", label: "5. Who is Kyle (the founder)? What's one thing from your research or the interview that stood out about his vision?", type: "textarea" },
        { id: "vsg_services", label: "6. What services does VSG offer beyond solar panels? Name at least two.", type: "textarea" }
      ]
    },
    {
      title: "Part C: The Internship Program",
      questions: [
        { id: "weeks1_4_skill", label: "7. What is the core skill we're building in Weeks 1-4? Why does it matter?", type: "textarea" },
        { id: "your_role", label: "8. What is YOUR assigned role on the team? What does that mean you're responsible for?", type: "textarea" },
        { id: "week6_deliverable", label: "9. What's one concrete deliverable you'll create by Week 6 that will be live on VSG's website?", type: "textarea" }
      ]
    },
    {
      title: "Part D: Copywriting Fundamentals",
      questions: [
        { id: "harry_dry", label: "10. From the Harry Dry video, what's ONE principle of good copywriting that stuck with you? Explain it.", type: "textarea" },
        { id: "feature_example", label: "11a. What's a FEATURE of solar panels?", type: "text" },
        { id: "benefit_example", label: "11b. What's the BENEFIT of that feature for the homeowner?", type: "text" }
      ]
    },
    {
      title: "Bonus",
      questions: [
        { id: "confused", label: "What's one thing about VSG or the program you're still confused about? (No wrong answers here—this helps us.)", type: "textarea" }
      ]
    }
  ];

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const generateEmailBody = () => {
    let body = `VSG Week 1 Assessment - ${name}\n`;
    body += `Submitted: ${new Date().toLocaleString()}\n`;
    body += `${'='.repeat(50)}\n\n`;

    sections.forEach(section => {
      if (section.questions.length > 0) {
        body += `${section.title}\n${'-'.repeat(40)}\n`;
        section.questions.forEach(q => {
          body += `\n${q.label}\n`;
          body += `Answer: ${answers[q.id] || '(not answered)'}\n`;
        });
        body += '\n';
      }
    });

    return body;
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Please enter your name before submitting.');
      return;
    }
    setSubmitted(true);
  };

  const copyToClipboard = () => {
    const text = generateEmailBody();
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied! Paste this into an email to Daniel.');
    });
  };

  const progress = ((currentSection) / (sections.length - 1)) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Assessment Complete!</h1>
            <p className="text-slate-600">Thanks, {name}. Here's your submission.</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mb-6 max-h-96 overflow-y-auto">
            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">
              {generateEmailBody()}
            </pre>
          </div>

          <div className="space-y-3">
            <button
              onClick={copyToClipboard}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Copy to Clipboard
            </button>
            <p className="text-center text-slate-500 text-sm">
              Copy and paste this into an email or Slack message to Daniel.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-2 text-slate-600 hover:text-slate-800 transition"
            >
              ← Go back and edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentSectionData = sections[currentSection];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Progress</span>
            <span>{currentSection} of {sections.length - 1}</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              {currentSection === 0 ? 'VSG Week 1 Assessment' : currentSectionData.title}
            </h1>
            {currentSection === 0 && (
              <p className="text-slate-600">
                Demonstrate your understanding of VSG, Core 4, and the internship program.
              </p>
            )}
          </div>

          {/* Welcome Section */}
          {currentSection === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm">
                  <strong>Tip:</strong> Take your time. There are no wrong answers—this helps us understand where you're at and how we can help.
                </p>
              </div>
            </div>
          )}

          {/* Questions */}
          {currentSectionData.questions.length > 0 && (
            <div className="space-y-6">
              {currentSectionData.questions.map((question) => (
                <div key={question.id}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {question.label}
                  </label>
                  {question.type === 'textarea' ? (
                    <textarea
                      value={answers[question.id] || ''}
                      onChange={(e) => handleChange(question.id, e.target.value)}
                      rows={4}
                      placeholder="Type your answer here..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={answers[question.id] || ''}
                      onChange={(e) => handleChange(question.id, e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                currentSection === 0
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ← Back
            </button>

            {currentSection === sections.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={nextSection}
                disabled={currentSection === 0 && !name.trim()}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  currentSection === 0 && !name.trim()
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Section Navigator */}
        <div className="mt-6 flex justify-center gap-2">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSection
                  ? 'bg-blue-600'
                  : index < currentSection
                  ? 'bg-blue-300'
                  : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
