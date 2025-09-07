import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

type DobAnswer = {
  dobMonth: string;
  dobDay: string;
  dobYear: string;
};


@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loans.html',
  styleUrls: ['./loans.css']
})
export class Loans implements OnInit {
  questions = [
  // ------------------ Loan Details ------------------
  {
    label: 'How much do you want to borrow?',
    type: 'select',
    options: [
      '40000 - 50000',
      '30000 - 40000',
      '25000 - 30000',
      '20000 - 25000',
      '15000 - 20000',
      '10000 - 15000',
      '5000 - 10000',
      '2500 - 5000',
      '1000 - 2500',
      '500 - 1000',
      '100 - 500'
    ]
  },
  {
    label: 'Purpose of Loan?',
    type: 'select',
    options: [
      'Auto Repair',
      'Business Expense',
      'Debt Consolidation',
      'Medical Bills',
      'Home Improvement',
      'Education Expenses',
      'Emergency Expense',
      'Vacation / Travel',
      'Wedding / Special Event',
      'Moving or Relocation',
      'Rent / Mortgage Assistance',
      'Appliance or Furniture Purchase',
      'Credit Card Payoff',
      'Other Personal Use'
    ]
  },
  {
    label: 'What is your credit score range?',
    type: 'select',
    options: [
      'Excellent (720+)',
      'Good (690 - 719)',
      'Fair (630 - 689)',
      'Poor (below 629)',
      'I don’t know'
    ]
  },

  // ------------------ Personal Information ------------------
  { label: 'Legal First Name', type: 'text', placeholder: 'e.g. John' },
  { label: 'Legal Last Name', type: 'text', placeholder: 'e.g. Smith' },
  { label: 'Date of Birth', type: 'dob' },
  {
    label: 'Phone Number (10 digits without +1)',
    type: 'text',
    inputType: 'tel',
    placeholder: 'e.g. 1234567890',
    maxLength: 10
  },
  { label: 'Email Address', type: 'email', placeholder: 'e.g. example@gmail.com' },
  { label: 'Last 4 digits of Social Security Number (SSN)', type: 'password', placeholder: 'e.g. 1234', maxLength: 4 },

  // ------------------ Address & Residency ------------------
  { label: 'What is your Street Address?', type: 'text', inputType: 'text', placeholder: 'e.g., 123 ABC Street' },
  { label: 'What is your Zip Code?', type: 'text', inputType: 'number', placeholder: 'e.g., 12345 or 12345-6789' },
  { label: 'What is your City?', type: 'text', inputType: 'text', placeholder: 'e.g., Los Angeles' },
  {
    label: 'What is your State?',
    type: 'select',
    options: [
      'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
      'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
      'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
      'New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma',
      'Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
      'Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
    ]
  },
  {
    label: 'How long have you lived at this address?',
    type: 'select',
    options: [
      '1 month',
      '3 months',
      '6 months',
      '9 months',
      '1 year',
      '1-2 years',
      '3-4 years',
      '4-5 years',
      '5-10 years',
      '10-15 years',
      '15-20 years',
      '20-25 years',
      '25-30 years',
      '30+ years'
    ]
  },
  {
    label: 'Home Ownership Status',
    type: 'select',
    options: ['Rent', 'Own with Mortgage', 'Own Free & Clear']
  },
  {
    label: 'Car Ownership Status',
    type: 'select',
    options: ['Own Free & Clear', 'Own with Loan/Lease', 'No Car']
  },

  // ------------------ Identity Verification ------------------
  {
    label: 'License State',
    type: 'select',
    options: [
      'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
      'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
      'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
      'New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma',
      'Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
      'Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
    ]
  },
  { label: 'License Number', type: 'text', placeholder: 'e.g. S123-4567-8901', maxLength: 20},
  { label: 'ID Number', type: 'text', placeholder: 'e.g. A1234567', maxLength:20 },
  { label: 'Active Military', type: 'select', options: ['YES', 'NO'] },

  // ------------------ Employment & Income ------------------
  {
    label: 'What is your Source of Income?',
    type: 'select',
    options: ['Benefits', 'Disability', 'Job Income', 'Military', 'Pension', 'Self Employed', 'Social Security']
  },
  { label: 'Job Title', type: 'text', placeholder: 'e.g. Sales Person' },
  { label: 'Employer Name', type: 'text', placeholder: 'e.g. Walmart' },
  {
    label: 'Time Employed',
    type: 'select',
    options: [
      '1 month',
      '3 months',
      '6 months',
      '9 months',
      '1 year',
      '1-2 years',
      '3-4 years',
      '4-5 years',
      '5-10 years',
      '10-15 years',
      '15-20 years',
      '20-25 years',
      '25-30 years',
      '30+ years'
    ]
  },
  { label: 'Pay Frequency', type: 'select', options: ['Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Monthly'] },
  { label: 'Next Pay Date', type: 'date' },
  {
    label: 'What is your monthly income?',
    type: 'select',
    options: [
      '$0 - $1,000',
      '$1,001 - $2,000',
      '$2,001 - $3,000',
      '$3,001 - $4,000',
      '$4,001 - $5,000',
      '$5,001 - $6,000',
      '$6,001 - $7,000',
      '$7,001 - $8,000',
      '$8,001 - $10,000',
      '$10,001+'
    ]
  },
  {
    label: 'Unsecured Debt',
    type: 'select',
    options: ['Less than 10K', '15K', '20K', '20K +']
  },

  // ------------------ Banking Information ------------------
  { label: 'Bank Name', type: 'text', placeholder: 'e.g. Bank of America' },
  { label: 'Direct Deposit', type: 'select', options: ['Yes', 'No'] },
  { label: 'ABA Routing Number', type: 'text', placeholder: 'e.g. 123456789', maxLength: 9 },
  { label: 'Bank Account Number', type: 'text', placeholder: 'e.g. 1234567890123456', maxLength: 17 },
  {
    label: 'Account Type',
    type: 'select',
    options: ['Checking', 'Savings', 'Business', 'Other']
  },
  {
    label: 'Time of Account at Bank',
    type: 'select',
    options: [
      '1 month',
      '3 months',
      '6 months',
      '9 months',
      '1 year',
      '1-2 years',
      '3-4 years',
      '4-5 years',
      '5-10 years',
      '10-15 years',
      '15-20 years',
      '20-25 years',
      '25-30 years',
      '30+ years'
    ]
  },

  // ------------------ Agreement ------------------
  { label: 'User Terms & Conditions', type: 'checkbox' }
];


  currentStep = 0;
  answers: any[] = [];
  errorMessage: string = '';
  private ipAddress: string | null = null;
  isSubmitting = false;
  isSubmitted = false;
  isZipValidating = false;

  public readonly DOB_QUESTION_INDEX = 5;
  private readonly PHONE_QUESTION_INDEX = 6;
  private readonly EMAIL_QUESTION_INDEX = 7;
  private readonly SSN_QUESTION_INDEX = 8;

  private readonly STREET_ADDRESS_INDEX = 9;
  public readonly ZIP_CODE_QUESTION_INDEX = 10;
  private readonly CITY_QUESTION_INDEX = 11;
  private readonly STATE_QUESTION_INDEX = 12;

  get TERMS_QUESTION_INDEX() { return this.questions.length - 1; }
  sessionStorage: any;
  private affId: string | null = null;
  private subAffId: string | null = null;
  private tid: string | null = null;
  private trustedFormCertUrl: string | null = null;
  private universalLeadid: string | null = null;
  private hasProcessedQueryParams = false;
  public readonly url: string = 'https://www.quickcashpoint.com';
  public readonly tcpaConsent: string = '1';
  public readonly TcpaText: string = 'By providing my phone number, I consent to receive marketing calls and/or text messages, including from automated systems, at the phone number provided, from Quick Cash Point and its affiliates. I understand that consent is not required to apply for or obtain a loan. I also understand that message and data rates may apply. I can revoke my consent at any time by replying “STOP” to any text message or by contacting Quick Cash Point directly. For more details, please see the Quick Cash Point Privacy Policy.';

  // DOB dropdown support
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = [];
  private trustedFormPollTimer: any = null;
  private trustedFormInjected = false;
  days: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Initialize DOB years dynamically: (currentYear - 18) down to (currentYear - 100)
    const nowYearInit = new Date().getFullYear();
    const maxYearInit = nowYearInit - 18;
    const minYearInit = nowYearInit - 100;
    this.years = Array.from({ length: (maxYearInit - minYearInit + 1) }, (_, i) => maxYearInit - i);
    // If page was refreshed, clear all session data and reset form to first question
    try {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const isReload = (navEntries && navEntries[0] && navEntries[0].type === 'reload') ||
        ((performance as any).navigation && (performance as any).navigation.type === 1);
      if (isReload) {
        try { sessionStorage.clear(); } catch {}
        this.currentStep = 0;
        this.answers = this.questions.map(q => q.type === 'dob' ? { dobMonth: '', dobDay: '', dobYear: '' } : (q.type === 'checkbox' ? true : ''));
        this.errorMessage = '';
        this.isSubmitted = false;
        this.isSubmitting = false;
        this.isZipValidating = false;
        this.ipAddress = null;
        this.affId = null;
        this.subAffId = null;
        this.tid = null;
        this.trustedFormCertUrl = null;
        this.universalLeadid = null;
        this.router.navigate(['./'], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
        return;
      }
    } catch {}

    // Do not pre-calculate days here, only when DOB month/year changes

    const saved = sessionStorage.getItem('loanForm');
    if (saved) {
      this.answers = JSON.parse(saved);
    } else {
      this.answers = this.questions.map((q, i) =>
        q.type === 'dob' ? { dobMonth: '', dobDay: '', dobYear: '' } : (q.type === 'checkbox' ? true : '')
      );
    }

    // Restore loan amount from session if present (e.g., after URL cleanup)
    const storedLoanAmount = sessionStorage.getItem('loanAmount');
    if (storedLoanAmount) {
      this.selectLoanAmountFromValue(storedLoanAmount);
    }

    // Subscribe to query params to ensure capture, then clear them once
    this.route.queryParamMap.subscribe(qp => {
      if (this.hasProcessedQueryParams) return;
      this.hasProcessedQueryParams = true;

      const loanAmount = qp.get('loanAmount');
      const affId = qp.get('aff_id');
      const transactionId = qp.get('transaction_id');
      const subAffId = qp.get('sub_aff_id');

      if (loanAmount) {
        sessionStorage.setItem('loanAmount', loanAmount);
        this.selectLoanAmountFromValue(loanAmount);
      }
      if (affId) {
        this.affId = affId;
        sessionStorage.setItem('aff_id', affId);
      }
      if (transactionId) {
        this.tid = transactionId;
        sessionStorage.setItem('tid', transactionId);
      }
      if (subAffId) {
        this.subAffId = subAffId;
        sessionStorage.setItem('sub_aff_id', subAffId);
      }

      if (qp.keys.length > 0) {
        this.router.navigate(['./'], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
      }
    });
  }

  private selectLoanAmountFromValue(rawValue: string) {
    const value = (rawValue || '').toString();
    const firstQuestion = this.questions[0];
    if (!firstQuestion.options) return;

    const normalized = value.replace(/\s+/g, '');
    let selected: string | undefined = firstQuestion.options.find(opt => opt.replace(/\s+/g, '') === normalized);

    if (!selected) {
      const match = normalized.match(/^(\d+)-(\d+)$/);
      if (match) {
        const qmin = parseInt(match[1], 10);
        const qmax = parseInt(match[2], 10);

        const parsed = firstQuestion.options
          .map(opt => {
            const m = opt.replace(/[^0-9-]/g, '').match(/(\d+)-(\d+)/);
            if (!m) return null as any;
            return { opt, omin: parseInt(m[1], 10), omax: parseInt(m[2], 10) };
          })
          .filter(Boolean) as { opt: string; omin: number; omax: number }[];

        selected = parsed.find(p => p.omax === qmax)?.opt
          || parsed.find(p => qmin >= p.omin && qmin <= p.omax)?.opt
          || parsed.sort((a, b) => Math.abs(a.omin - qmin) - Math.abs(b.omin - qmin))[0]?.opt;
      }
    }

    if (selected) {
      this.answers[0] = selected;
      this.saveProgress();
    }
  }

  private async getIpAddress(): Promise<void> {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      this.ipAddress = data.ip;
    } catch (error) {
      console.error('Could not retrieve IP address:', error);
      this.ipAddress = 'Unknown';
    }
  }

  dobError = '';

  // ✅ Safe getter for DOB
  get dobAnswer(): DobAnswer {
    if (
      typeof this.answers[this.currentStep] !== 'object' ||
      !this.answers[this.currentStep]
    ) {
      this.answers[this.currentStep] = { dobMonth: '', dobDay: '', dobYear: '' };
    }
    return this.answers[this.currentStep] as DobAnswer;
  }

  validateDob(month: string, day: string, year: string) {
    if (!month || !day || !year) {
      this.dobError = 'Please complete your date of birth.';
      return false;
    }

    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const y = parseInt(year, 10);
    if (!/^\d{4}$/.test(year)) {
      this.dobError = 'Year must be 4 digits.';
      return false;
    }

    if (m < 1 || m > 12) {
      this.dobError = 'Month must be between 1 and 12.';
      return false;
    }

    const maxDay = new Date(y, m, 0).getDate();
    if (d < 1 || d > maxDay) {
      this.dobError = `Day must be between 1 and ${maxDay}.`;
      return false;
    }

    const dob = new Date(y, m - 1, d);
    if (isNaN(dob.getTime())) {
      this.dobError = 'Invalid date format.';
      return false;
    }

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const hasHadBirthday =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

    if (!hasHadBirthday) age--;

    if (age < 18) {
      this.dobError = 'You must be at least 18 years old.';
      return false;
    }

    this.dobError = '';
    return true;
  }

  onDobMonthChange() { this.recalculateDays(); }
  onDobYearChange() { this.recalculateDays(); }
  private recalculateDays() {
    const month = parseInt((this.dobAnswer.dobMonth || '0'), 10);
    const year = parseInt((this.dobAnswer.dobYear || '0'), 10);
    const maxDay = month && year ? new Date(year, month, 0).getDate() : 31;
    this.days = Array.from({ length: maxDay }, (_, i) => i + 1);
    if (parseInt(this.dobAnswer.dobDay || '0', 10) > maxDay) {
      this.dobAnswer.dobDay = '';
    }
  }

  // Input handling and numeric enforcement
  private isNumericStep(index: number): boolean {
    const label = (this.questions[index]?.label || '').toLowerCase();
    return (
      index === this.ZIP_CODE_QUESTION_INDEX ||
      index === this.PHONE_QUESTION_INDEX ||
      index === this.SSN_QUESTION_INDEX ||
      label.includes('routing number') ||
      label.includes('account number')
    );
  }

  onFieldInput(event: any) {
    this.errorMessage = '';
    if (this.isNumericStep(this.currentStep)) {
      const input = event.target as HTMLInputElement;
      const digitsOnly = input.value.replace(/[^0-9]/g, '');
      if (input.value !== digitsOnly) {
        input.value = digitsOnly;
        this.answers[this.currentStep] = digitsOnly;
      }
    }
  }

  // Next Pay Date helpers
  private isNextPayDateStep(): boolean {
    return (this.questions[this.currentStep]?.label || '') === 'Next Pay Date';
  }

  private getPayFrequency(): string {
    const label = 'Pay Frequency';
    const idx = this.questions.findIndex(q => q.label === label);
    const value = idx >= 0 ? (this.answers[idx] || '').toString().toLowerCase() : '';
    return value;
  }

  getMinMaxNextPayDate() {
    const today = new Date();
    const freq = this.getPayFrequency();
    let days = 7; // default weekly
    if (freq === 'weekly') days = 7;
    else if (freq === 'bi-weekly') days = 4;
    else if (freq === 'semi-monthly' || freq === 'bi-monthly') days = 15;
    else if (freq === 'monthly') days = 31;

    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const max = new Date(min);
    max.setDate(min.getDate() + days);

    const toStr = (d: Date) => {
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const yyyy = d.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    };
    return { min: toStr(min), max: toStr(max) };
  }

  saveProgress() {
    sessionStorage.setItem('loanForm', JSON.stringify(this.answers));
  }

  isButtonQuestion(index: number): boolean {
    const q = this.questions[index];
    return !!(q.type === 'select' && q.options && q.options.length <= 15);
  }

  selectOption(stepIndex: number, option: string) {
    this.answers[stepIndex] = option;
    this.errorMessage = '';
    this.saveProgress();
  }

  private async validateCurrentStep(currentAnswer: any): Promise<boolean> {
    if (this.currentStep === this.SSN_QUESTION_INDEX) {
      if (typeof currentAnswer !== 'string' || !/^\d{4}$/.test(currentAnswer)) {
        this.errorMessage = 'Please enter the last 4 digits of your SSN.';
        return false;
      }
    }

    if (this.currentStep === this.TERMS_QUESTION_INDEX) {
      if (currentAnswer !== true) {
        this.errorMessage = 'You must accept the User Terms & Conditions to proceed.';
        return false;
      }
    }

    if (this.currentStep === this.DOB_QUESTION_INDEX) {
      const dobAnswer = currentAnswer as DobAnswer;
      if (!this.validateDob(dobAnswer.dobMonth, dobAnswer.dobDay, dobAnswer.dobYear)) {
        return false;
      }
    }

    if (this.currentStep === this.PHONE_QUESTION_INDEX) {
      const phone = (currentAnswer as string).replace(/\D/g, '');
      if (!/^\d{10}$/.test(phone)) {
        this.errorMessage = 'Please enter a valid 10-digit US phone number.';
        return false;
      }
    }

    if (this.currentStep === this.EMAIL_QUESTION_INDEX) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof currentAnswer !== 'string' || !emailRegex.test(currentAnswer)) {
        this.errorMessage = 'Please enter a valid email address.';
        return false;
      }
    }

    return true;
  }

  async nextStep() {
    const currentQuestion = this.questions[this.currentStep];
    const currentAnswer = this.answers[this.currentStep];

    if (
      currentQuestion.type === 'dob' &&
      typeof currentAnswer !== 'string'
    ) {
      const dobAns = currentAnswer as DobAnswer;
      if (!dobAns.dobMonth || !dobAns.dobDay || !dobAns.dobYear) {
      this.errorMessage = 'Please complete your date of birth.';
      return;
      }
    }

    if (currentQuestion.type !== 'checkbox' && (!currentAnswer || currentAnswer === '')) {
      this.errorMessage = 'Please fill this field before proceeding!';
      return;
    }

    if (this.currentStep === this.ZIP_CODE_QUESTION_INDEX) {
      this.isZipValidating = true;
      try {
        const zip = (currentAnswer as string).trim();
        if (!/^\d{5}$/.test(zip)) {
          this.errorMessage = 'Please enter a valid 5-digit US zip code.';
          this.isZipValidating = false;
          return;
        }

        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (!response.ok) throw new Error('Zip code not found or invalid.');

        const data = await response.json();
        if (!data.places || data.places.length === 0) {
          throw new Error('Zip code not found or invalid.');
        }

        const place = data.places[0];
        this.answers[this.CITY_QUESTION_INDEX] = place['place name'];
        this.answers[this.STATE_QUESTION_INDEX] = place['state'];

        this.errorMessage = '';
        this.saveProgress();
        this.currentStep++;
        this.isZipValidating = false;
        return;
      } catch (error: any) {
        this.errorMessage = error.message;
        this.isZipValidating = false;
        return;
      }
    }

    const isValid = await this.validateCurrentStep(currentAnswer);
    if (!isValid) return;

    this.errorMessage = '';
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.saveProgress();

      // After completing the first question (index 0), inject LeadiD first, then TrustedForm
      if (this.currentStep === 1) {
        if (!this.universalLeadid) {
          this.injectLeadiD();
        }
        if (!this.trustedFormCertUrl) {
          this.injectTrustedForm();
        }
      }
    }
  }

  prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

async submitForm() {
  this.isSubmitting = true;
  this.errorMessage = '';

  // ✅ Must accept T&C
  if (this.answers[this.TERMS_QUESTION_INDEX] !== true) {
    this.errorMessage = 'You must accept the User Terms & Conditions to submit.';
    this.currentStep = this.TERMS_QUESTION_INDEX;
    this.isSubmitting = false;
    return;
  }

  // ✅ Must fill last field
  if (!this.answers[this.questions.length - 1]) {
    this.errorMessage = 'Please fill this field before submitting!';
    this.isSubmitting = false;
    return;
  }

  // ✅ Validate all fields except tid, aff_id, sub_aff_id
  const emptyIndex = this.answers.findIndex((a, i) => {
    const key = this.questions[i].label.toLowerCase();
    if (['tid', 'aff_id', 'sub_aff_id'].some(skip => key.includes(skip))) {
      return false; // allow null/empty
    }
    return !a || a === '';
  });
  if (emptyIndex !== -1) {
    this.errorMessage = `Please fill all fields! Question ${emptyIndex + 1} is empty.`;
    this.currentStep = emptyIndex;
    this.isSubmitting = false;
    return;
  }

  try {
    await this.getIpAddress();

    const formattedAnswers: { [key: string]: any } = {};
    this.questions.forEach((question, index) => {
      const key = question.label
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
        .replace(/\s+/g, '');
      const finalKey = key.charAt(0).toLowerCase() + key.slice(1);
      formattedAnswers[finalKey] = this.answers[index];
    });

    // ✅ Normalize DOB
    const dobRaw = formattedAnswers['dateOfBirth'];
    if (dobRaw && typeof dobRaw === 'object') {
      const mm = String(dobRaw.dobMonth || '').padStart(2, '0');
      const dd = String(dobRaw.dobDay || '').padStart(2, '0');
      const yyyy = String(dobRaw.dobYear || '');
      formattedAnswers['dateOfBirth'] = `${mm}-${dd}-${yyyy}`;
    }

    const payload = {
      state: formattedAnswers['whatIsYourState'] || '',
      zip: formattedAnswers['whatIsYourZipCode'] || '',
      monthlyIncome: formattedAnswers['whatIsYourMonthlyIncome'] || '',
      employmentStatus: formattedAnswers['whatIsYourEmploymentStatus'] || '',
      creditScore: formattedAnswers['whatIsYourCreditScoreRange'] || '',
      city: formattedAnswers['whatIsYourCity'] || '',
      dob: formattedAnswers['dateOfBirth'] || '',
      email: formattedAnswers['emailAddress'] || '',
      phone: formattedAnswers['phoneNumber10DigitsWithout1'] || formattedAnswers['phoneNumber'] || '',
      loanPurpose: formattedAnswers['purposeOfLoan'] || '',
      firstName: formattedAnswers['legalFirstName'] || '',
      lastName: formattedAnswers['legalLastName'] || '',
      ssn4: formattedAnswers['last4DigitsOfSsn'] || '',
      activeMilitiary: formattedAnswers['activeMilitary'] || '',
      loanAmount: formattedAnswers['howMuchDoYouWantToBorrow'] || '',
      streetAddress: formattedAnswers['whatIsYourStreetAddress'] || '',
      incomeSource: formattedAnswers['whatIsYourSourceOfIncome'] || '',
      jobTitle: formattedAnswers['jobTitle'] || '',
      employerName: formattedAnswers['employerName'] || '',
      timeEmployed: formattedAnswers['timeEmployed'] || '',
      payFrequency: formattedAnswers['payFrequency'] || '',
      nextPayDate: formattedAnswers['nextPayDate'] || '',
      unsecuredDebt: formattedAnswers['unsecuredDebt'] || '',
      bankName: formattedAnswers['bankName'] || '',
      directDeposit: formattedAnswers['directDeposit'] || '',
      abaRoutingNumber: formattedAnswers['abaRoutingNumber'] || '',
      bankAccountNumber: formattedAnswers['bankAccountNumber'] || '',
      accountType: formattedAnswers['accountType'] || '',
      accountLife: formattedAnswers['timeOfAccountAtBank'] || '',
      licenseState: formattedAnswers['licenseState'] || '',
      licenseNumber: formattedAnswers['licenseNumber'] || '',
      idNumber: formattedAnswers['idNumber'] || '',
      homeOwnership: formattedAnswers['homeOwnershipStatus'] || '',
      carOwnership: formattedAnswers['carOwnershipStatus'] || '',

      // ✅ Optional fields
      aff_id: sessionStorage.getItem('aff_id') || this.affId || null,
      sub_aff_id: sessionStorage.getItem('sub_aff_id') || this.subAffId || null,
      tid: sessionStorage.getItem('tid') || this.tid || null,

      // ✅ Context
      url: this.url,
      tcpaConsent: this.tcpaConsent,
      TcpaText: this.TcpaText,
      userTermsAndConditions: this.answers[this.TERMS_QUESTION_INDEX] === true,
      universalLeadid: sessionStorage.getItem('universalLeadid') || this.universalLeadid || '',
      xxTrustedFormCertUrl: sessionStorage.getItem('xxTrustedFormCertUrl') || this.trustedFormCertUrl || '',
      ipAddress: this.ipAddress
    };

    console.log('Submitting payload:', payload);

    // ✅ POST to backend
    const response = await fetch('https://quickcashpoint/api/ping-proxy.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      this.isSubmitted = true;
      this.errorMessage = '';
      sessionStorage.removeItem('loanForm');

      // Cleanup TrustedForm
      try {
        if (this.trustedFormPollTimer) {
          clearTimeout(this.trustedFormPollTimer);
          this.trustedFormPollTimer = null;
        }
        const tfScript = document.getElementById('trustedform-loader');
        tfScript?.parentNode?.removeChild(tfScript);
        this.trustedFormInjected = false;
      } catch {}
    } else {
      this.errorMessage = 'Submission failed. Please click submit again.';
    }
  } catch (err) {
    console.error('Submit error:', err);
    this.errorMessage = 'Submission error. Please click submit again.';
  } finally {
    this.isSubmitting = false;
  }
}


  resetForm() {
    this.currentStep = 0;
    this.answers = this.questions.map(q =>
      q.type === 'dob' ? { dobMonth: '', dobDay: '', dobYear: '' } : ''
    );
    this.errorMessage = '';
    this.ipAddress = null;
    this.isSubmitting = false;
    this.isSubmitted = false;
    this.isZipValidating = false;
    this.sessionStorage.clear();
    sessionStorage.removeItem('loanForm');
  }

  onEnter(event: any) {
    event.preventDefault();
    if (this.isSubmitting || this.isSubmitted || this.isZipValidating) return;
    if (this.currentStep < this.questions.length - 1) {
      this.nextStep();
    } else {
      this.submitForm();
    }
  }

  private injectTrustedForm() {
    try {
      // Avoid duplicate injection
      if (document.getElementById('trustedform-loader') || this.trustedFormInjected) return;

      const tf = document.createElement('script');
      tf.type = 'text/javascript';
      tf.async = true;
      tf.id = 'trustedform-loader';
      tf.src = (document.location.protocol === 'https:' ? 'https' : 'http') +
        '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
        (new Date().getTime() + Math.random());

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(tf, firstScript);

      // Poll the hidden field for the value
      const start = Date.now();
      const poll = () => {
        const el = document.getElementById('xxTrustedFormCertUrl') as HTMLInputElement | null;
        const val = el?.value || '';
        if (val) {
          this.trustedFormCertUrl = val;
          sessionStorage.setItem('xxTrustedFormCertUrl', val);
        } else if (Date.now() - start < 15000) { // up to 15s
          this.trustedFormPollTimer = setTimeout(poll, 300);
        }
      };
      this.trustedFormInjected = true;
      this.trustedFormPollTimer = setTimeout(poll, 500);
    } catch (e) {
      console.error('Failed to inject TrustedForm:', e);
    }
  }

  private injectLeadiD() {
    try {
      if (document.getElementById('LeadiDscript_campaign')) return;

      const s = document.createElement('script');
      s.id = 'LeadiDscript_campaign';
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//create.lidstatic.com/campaign/548c86c2-3c24-2ec2-b201-274ffb0f5005.js?snippet_version=2';

      const anchor = document.getElementById('LeadiDscript');
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(s, anchor);
      } else {
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode?.insertBefore(s, firstScript);
      }

      // Poll the hidden field for the value populated by the LeadiD script
      const start = Date.now();
      const poll = () => {
        const el = document.getElementById('universal_leadid') as HTMLInputElement | null;
        const val = el?.value || '';
        if (val) {
          this.universalLeadid = val;
          sessionStorage.setItem('universalLeadid', val);
        } else if (Date.now() - start < 15000) {
          setTimeout(poll, 300);
        }
      };
      setTimeout(poll, 500);
    } catch (e) {
      console.error('Failed to inject LeadiD:', e);
    }
  }
}