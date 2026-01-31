import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

export default function VSGAssessment() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [generating, setGenerating] = useState(false);

  const sections = [
    {
      title: "Welcome",
      questions: []
    },
    {
      title: "Part A: The Core 4 Framework",
      questions: [
        { id: "core4_list", label: "1. What are the four parts of VSG's Core 4 framework? List them.", type: "textarea" },
        { id: "core4_purpose", label: "2. What is the PURPOSE of the Core 4 framework? Why does VSG use it?", type: "textarea" },
        { id: "core4_generate", label: "2a. For Generate Power, name one or more specific service VSG offers:", type: "text" },
        { id: "core4_store", label: "2b. For Store Power, name one or more specific service VSG offers:", type: "text" },
        { id: "core4_upgrade", label: "2c. For Upgrade Power, name one or more specific service VSG offers:", type: "text" },
        { id: "core4_maintain", label: "2d. For Maintain Power, name one or more specific service VSG offers:", type: "text" },
        { id: "core4_scenario", label: "3. A homeowner wants to keep the lights on during power outages. Which one of the Core 4 are most relevant and why?", type: "textarea" }
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
        { id: "week6_deliverable", label: "9. What is 1 action you're going to implement into your business based on everything we've covered?", type: "textarea" }
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
  const generatePDF = async () => {
  setGenerating(true);
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  const primaryColor = [30, 64, 175];
  const darkText = [30, 41, 59];
  const lightText = [100, 116, 139];
  const accentBg = [241, 245, 249];

  const checkNewPage = (neededSpace) => {
    if (yPosition + neededSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  const wrapText = (text, maxWidth, fontSize) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text || '(not answered)', maxWidth);
    return lines;
  };

  // Header
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pageWidth, 45, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.text('VSG POWER', margin, 20);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.text('Week 1 Assessment', margin, 28);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  const nameText = name || 'Unknown';
  const nameWidth = pdf.getTextWidth(nameText);
  pdf.text(nameText, pageWidth - margin - nameWidth, 20);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  const dateText = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });
  const dateWidth = pdf.getTextWidth(dateText);
  pdf.text(dateText, pageWidth - margin - dateWidth, 28);
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(0.5);
  pdf.line(margin, 35, pageWidth - margin, 35);

  yPosition = 55;

  // Intro
  pdf.setTextColor(...lightText);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  const introText = 'This assessment demonstrates understanding of VSG Power, the Core 4 framework, and the internship program objectives.';
  const introLines = wrapText(introText, contentWidth, 10);
  pdf.text(introLines, margin, yPosition);
  yPosition += (introLines.length * 5) + 10;

  // Sections
  sections.forEach((section) => {
    if (section.questions.length === 0) return;
    checkNewPage(25);
    pdf.setFillColor(...accentBg);
    pdf.roundedRect(margin, yPosition - 2, contentWidth, 10, 2, 2, 'F');
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(section.title, margin + 4, yPosition + 5);
    yPosition += 15;

    section.questions.forEach((question) => {
      checkNewPage(30);
      pdf.setTextColor(...darkText);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      const questionLines = wrapText(question.label, contentWidth - 5, 10);
      pdf.text(questionLines, margin, yPosition);
      yPosition += (questionLines.length * 4.5) + 3;

      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...darkText);
      pdf.setFontSize(10);
      const answer = answers[question.id] || '(not answered)';
      const answerLines = wrapText(answer, contentWidth - 5, 10);
      const answerHeight = answerLines.length * 4.5;
      checkNewPage(answerHeight + 10);
      pdf.setFillColor(249, 250, 251);
      pdf.roundedRect(margin, yPosition - 3, contentWidth, answerHeight + 6, 1, 1, 'F');
      pdf.setFillColor(...primaryColor);
      pdf.rect(margin, yPosition - 3, 2, answerHeight + 6, 'F');
      pdf.setTextColor(...darkText);
      pdf.text(answerLines, margin + 6, yPosition + 1);
      yPosition += answerHeight + 12;
    });
    yPosition += 5;
  });

  // Footer
  const footerY = pageHeight - 15;
  pdf.setDrawColor(...primaryColor);
  pdf.setLineWidth(0.3);
  pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  pdf.setTextColor(...lightText);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.text('VSG Power Internship Program', margin, footerY);
  const pageNumText = `Generated on ${new Date().toLocaleString()}`;
  const pageNumWidth = pdf.getTextWidth(pageNumText);
  pdf.text(pageNumText, pageWidth - margin - pageNumWidth, footerY);

  const fileName = `VSG_Assessment_${name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
  setGenerating(false);
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
              onClick={generatePDF}
              disabled={generating}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {generating ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
            
            <button
              onClick={copyToClipboard}
              className="w-full py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition"
            >
              Copy as Text
            </button>
            
            <p className="text-center text-slate-500 text-sm">
              Download the PDF and email it to Daniel, or copy the text version.
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
