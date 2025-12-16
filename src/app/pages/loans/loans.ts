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
  private readonly stateAbbreviations: { [key: string]: string } = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY',
    'Puerto Rico': 'PR',
    'District of Columbia': 'DC',
    'U.S. Virgin Islands': 'VI'
  };

  private readonly areaCodesUS: number[] = [
    // Alabama
    205, 251, 256, 334, 659,
    // Alaska
    907,
    // Arizona
    480, 520, 602, 623, 928,
    // Arkansas
    479, 501, 870,
    // California
    209, 213, 279, 310, 323, 341, 408, 415, 424, 442, 510, 530, 559,
    562, 619, 626, 650, 657, 661, 669, 707, 714, 747, 760, 805, 818,
    820, 831, 858, 909, 916, 925, 949, 951, 628,
    // Colorado
    303, 719, 720, 970,
    // Connecticut
    203, 475, 860, 959,
    // Delaware
    302,
    // District of Columbia
    202,
    // Florida
    239, 305, 321, 352, 386, 407, 561, 689, 727, 754, 772, 786,
    813, 850, 863, 904, 941, 954,
    // Georgia
    229, 404, 470, 478, 678, 706, 762, 770, 912,
    // Hawaii
    808,
    // Idaho
    208, 986,
    // Illinois
    217, 224, 309, 312, 331, 464, 618, 630, 708, 773, 815, 847, 872,
    // Indiana
    219, 260, 317, 463, 574, 765, 812, 930,
    // Iowa
    319, 515, 563, 641, 712,
    // Kansas
    316, 620, 785, 913,
    // Kentucky
    270, 364, 502, 606, 859,
    // Louisiana
    225, 318, 337, 504, 985,
    // Maine
    207,
    // Maryland
    240, 301, 410, 443, 667,
    // Massachusetts
    339, 351, 413, 508, 617, 774, 781, 857, 978,
    // Michigan
    231, 248, 269, 313, 517, 586, 616, 734, 810, 906, 947, 989,
    // Minnesota
    218, 320, 507, 612, 651, 763, 952,
    // Mississippi
    228, 601, 662, 769,
    // Missouri
    314, 417, 573, 636, 660, 816,
    // Montana
    406,
    // Nebraska
    308, 402, 531,
    // Nevada
    702, 725, 775,
    // New Hampshire
    603,
    // New Jersey
    201, 551, 609, 640, 732, 848, 856, 862, 908, 973,
    // New Mexico
    505, 575,
    // New York
    212, 315, 332, 347, 516, 518, 585, 607, 631, 646, 716,
    718, 838, 845, 914, 917, 929, 934,
    // North Carolina
    252, 336, 704, 743, 828, 910, 919, 980, 984,
    // North Dakota
    701,
    // Ohio
    216, 220, 234, 330, 380, 419, 440, 513, 567, 614, 740, 937,
    // Oklahoma
    405, 539, 580, 918,
    // Oregon
    458, 503, 541, 971,
    // Pennsylvania
    215, 223, 267, 272, 412, 445, 484, 570, 610, 717, 724, 814, 878,
    // Rhode Island
    401,
    // South Carolina
    803, 839, 843, 854, 864,
    // South Dakota
    605,
    // Tennessee
    423, 615, 629, 731, 865, 901, 931,
    // Texas
    210, 214, 254, 281, 325, 346, 361, 409, 430, 432, 469, 512,
    682, 713, 726, 737, 806, 817, 830, 832, 903, 915, 936, 940,
    945, 956, 972, 979,
    // Utah
    385, 435, 801,
    // Vermont
    802,
    // Virginia
    276, 434, 540, 571, 703, 757, 804, 826, 948,
    // Washington
    206, 253, 360, 425, 509, 564,
    // West Virginia
    304, 681,
    // Wisconsin
    262, 414, 534, 608, 715, 920,
    // Wyoming
    307,
    // Puerto Rico
    787, 939,
    // U.S. Virgin Islands
    340
  ];

  private readonly licenseRegexes: { [key: string]: RegExp } = {
  'Alabama': /^\d{7}$/,
  'Alaska': /^\d{7}$/,
  'Arizona': /^[A-Z]?\d{8,9}$/,
  'Arkansas': /^\d{9}$/,
  'California': /^[A-Z]\d{7}$/,
  'Colorado': /^\d{9}$/,
  'Connecticut': /^\d{9}$/,
  'Delaware': /^[A-Z]\d{6}$/,
  'District of Columbia': /^\d{9}$/,
  'Florida': /^[A-Z]\d{12}$/,
  'Georgia': /^\d{7,9}$/,  // Updated
  'Hawaii': /^\d{9}$/,
  'Idaho': /^[A-Z]{2}\d{6}[A-Z]$/,
  'Illinois': /^[A-Z]\d{11}$/,
  'Indiana': /^\d{10}$/,
  'Iowa': /^\d{9}$/,
  'Kansas': /^\d{9}$/,
  'Kentucky': /^[A-Z]\d{8}$/,
  'Louisiana': /^\d{9}$/,
  'Maine': /^\d{7}$/,
  'Maryland': /^[A-Z]\d{12}$/,
  'Massachusetts': /^\d{9}$/,
  'Michigan': /^[A-Z]\d{10}$/, // Fixed
  'Minnesota': /^[A-Z]\d{12}$/,
  'Mississippi': /^\d{9}$/,
  'Missouri': /^\d{9}$/,
  'Montana': /^[A-Z]{2}\d{6}$/,
  'Nebraska': /^[A-Z]\d{6,8}$/,
  'Nevada': /^(?:\d{9}|[A-Z]\d{9})$/, // Fixed
  'New Hampshire': /^[A-Z]{2}\d{6}$/,
  'New Jersey': /^[A-Z]\d{14}$/, // Fixed
  'New Mexico': /^\d{9}$/,
  'New York': /^(?:\d{9}|[A-Z]\d{8})$/, // Fixed
  'North Carolina': /^\d{1,12}$/, // Fixed
  'North Dakota': /^[A-Z]{3}\d{6}$/,
  'Ohio': /^[A-Z]{2}\d{6}$/,
  'Oklahoma': /^[A-Z]\d{9}$/,
  'Oregon': /^(?:\d{7}|[A-Z]\d{6})$/, // Fixed
  'Pennsylvania': /^\d{8}$/,
  'Rhode Island': /^\d{7}$/,
  'South Carolina': /^\d{9}$/,
  'South Dakota': /^\d{8}$/,
  'Tennessee': /^\d{9}$/,
  'Texas': /^\d{8}$/,
  'Utah': /^\d{9}$/,
  'Vermont': /^\d{8}$/,
  'Virginia': /^[A-Z]\d{8}$/,
  'Washington': /^[A-Z][A-Z0-9]{11}$/, // Fixed
  'West Virginia': /^\d{7}$/,
  'Wisconsin': /^\d{8}$/,
  'Wyoming': /^\d{9}$/,
  'Puerto Rico': /^\d{9}$/,
  'U.S. Virgin Islands': /^\d{9}$/,
};
private readonly idRegexes: { [key: string]: RegExp } = {
  'Alabama': /^\d{7}$/,
  'Alaska': /^\d{7}$/,
  'Arizona': /^[A-Z]?\d{8,9}$/,
  'Arkansas': /^\d{9}$/,
  'California': /^[A-Z]\d{7}$/,
  'Colorado': /^\d{9}$/,
  'Connecticut': /^\d{9}$/,
  'Delaware': /^\d{1,7}$/, // corrected
  'District of Columbia': /^\d{9}$/,
  'Florida': /^[A-Z]\d{12}$/,
  'Georgia': /^\d{7,9}$/,
  'Hawaii': /^\d{9}$/,
  'Idaho': /^[A-Z]{2}\d{6}[A-Z]$/,
  'Illinois': /^[A-Z]\d{11}$/,
  'Indiana': /^\d{10}$/,
  'Iowa': /^\d{9}$/,
  'Kansas': /^\d{9}$/,
  'Kentucky': /^[A-Z]\d{8}$/,
  'Louisiana': /^\d{9}$/,
  'Maine': /^\d{7}$/,
  'Maryland': /^[A-Z]\d{12}$/,
  'Massachusetts': /^\d{9}$/,
  'Michigan': /^[A-Z]\d{12}$/, // corrected
  'Minnesota': /^[A-Z0-9]{13}$/, // corrected
  'Mississippi': /^\d{9}$/,
  'Missouri': /^\d{9}$/,
  'Montana': /^[A-Z]{2}\d{6}$/,
  'Nebraska': /^[A-Z]\d{6,8}$/,
  'Nevada': /^(\d{10}|[A-Z]\d{9})$/, // corrected
  'New Hampshire': /^[A-Z]{2}\d{6}$/,
  'New Jersey': /^[A-Z]\d{12,14}$/, // corrected
  'New Mexico': /^\d{9}$/,
  'New York': /^(\d{9}|ID\d{7})$/, // corrected
  'North Carolina': /^\d{12}$/, // corrected
  'North Dakota': /^[A-Z]{3}\d{6}$/,
  'Ohio': /^[A-Z]{2}\d{6}$/,
  'Oklahoma': /^[A-Z]\d{9}$/,
  'Oregon': /^\d{7}$/, // simplified
  'Pennsylvania': /^\d{8}$/,
  'Rhode Island': /^\d{7}$/,
  'South Carolina': /^\d{9}$/,
  'South Dakota': /^\d{8}$/,
  'Tennessee': /^\d{9}$/,
  'Texas': /^\d{8}$/,
  'Utah': /^\d{9}$/,
  'Vermont': /^\d{8}$/,
  'Virginia': /^[A-Z]\d{8}$/,
  'Washington': /^WDL\d{9}$/, // corrected
  'West Virginia': /^\d{7}$/,
  'Wisconsin': /^\d{8}$/,
  'Wyoming': /^\d{9}$/,
  'Puerto Rico': /^\d{9}$/,
  'U.S. Virgin Islands': /^\d{9}$/
};



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
  {
    label: 'What is your State?',
    type: 'select',
    options: [
      'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
      'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
      'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
      'New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma',
      'Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
      'Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','Puerto Rico','District of Columbia','U.S. Virgin Islands'
    ]
  },
  { label: 'What is your Zip Code?', type: 'text', inputType: 'number', placeholder: 'e.g., 12345 or 12345-6789' },
  { label: 'What is your City?', type: 'text', inputType: 'text', placeholder: 'e.g., Los Angeles' },
  { label: 'What is your Street Address?', type: 'text', inputType: 'text', placeholder: 'e.g., 123 ABC Street' },
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
    label: 'License/ID State',
    type: 'select',
    options: [
      'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
      'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
      'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
      'New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma',
      'Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
      'Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','Puerto Rico','District of Columbia','U.S. Virgin Islands'
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
  {label: 'Best Time to Contact You', type: 'select', options: [
    'Morning',
    'Afternoon',
    'Evening',
    'Anytime'
  ]},
  // ------------------ Agreement ------------------
  { label: 'User Terms & Conditions', type: 'checkbox' }
];


  currentStep = 0;
  answers: any[] = [];
  errorMessage: string = '';
  private ipAddress: string | null = null;
  private browserUserAgent: string = '';
  isSubmitting = false;
  isSubmitted = false;
  isZipValidating = false;
  isCountryValidating = false;
  isUSCitizen = true;
  countryErrorMessage = '';

  public readonly DOB_QUESTION_INDEX = 5;
  private readonly PHONE_QUESTION_INDEX = 6;
  private readonly EMAIL_QUESTION_INDEX = 7;
  private readonly SSN_QUESTION_INDEX = 8;

  private readonly STATE_QUESTION_INDEX = 9;
  public readonly ZIP_CODE_QUESTION_INDEX = 10;
  private readonly CITY_QUESTION_INDEX = 11;
  private readonly STREET_ADDRESS_INDEX = 12;
  private readonly LICENSE_STATE_INDEX = 16;
  private readonly LICENSE_NUMBER_INDEX = 17;
  private readonly ID_NUMBER_INDEX = 18;
  private readonly ABA_ROUTING_INDEX = 30;

  get TERMS_QUESTION_INDEX() { return this.questions.length - 1; }
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
  private leadiDPollTimer: any = null;
  private ipPollTimer: any = null;
  private trustedFormInjected = false;
  days: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Capture browser user agent
    this.browserUserAgent = navigator.userAgent;

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

    // Start polling for IP, LeadiD, and TrustedForm
    this.getIpAddress();
    if (!this.universalLeadid) {
      this.injectLeadiD();
    }
    if (!this.trustedFormCertUrl) {
      this.injectTrustedForm();
    }
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

  private getIpAddress(): Promise<void> {
    return new Promise((resolve) => {
      const poll = async () => {
        if (this.isSubmitted || this.isSubmitting || this.ipAddress) {
          resolve();
          return;
        }
        try {
          const response = await fetch('https://api64.ipify.org?format=json');
          const data = await response.json();
          this.ipAddress = data.ip;
          resolve();
        } catch (error) {
          console.error('Could not retrieve IP address:', error);
          if (!this.isSubmitted && !this.isSubmitting) {
            this.ipPollTimer = setTimeout(poll, 5000);
          } else {
            resolve();
          }
        }
      };
      poll();
    });
  }

  private async checkCountry(): Promise<boolean> {
    if (!this.ipAddress) return false;
    try {
      const response = await fetch(`https://ipapi.co/${this.ipAddress}/json/`);
      const data = await response.json();
      return data.country_code === 'US';
    } catch (error) {
      console.error('Country check failed:', error);
      return false; // assume not US on error
    }
  }

  private async checkMX(domain: string): Promise<boolean> {
    try {
      const response = await fetch(`https://8.8.8.8/resolve?name=${domain}&type=MX`);
      const data = await response.json();
      return data.Status !== 3;
    } catch (error) {
      console.error('MX check failed:', error);
      return true; // assume valid on error
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

  private validateABARouting(routing: string): { valid: boolean, errors: string[] } {
    // Format Check – It must contain exactly 9 digits (no spaces, no letters).
    if (!/^\d{9}$/.test(routing)) {
      return { valid: false, errors: ['Invalid Routing Number.'] };
    }

    const digits = routing.split('').map(Number);

    // First Two Digits Rule – The first two digits must be in one of these ranges: 01–12, 21–32, 61–72.
    const firstTwo = parseInt(routing.substring(0, 2), 10);
    const validRanges = [
      [1, 12],
      [21, 32],
      [61, 72]
    ];
    const inRange = validRanges.some(([min, max]) => firstTwo >= min && firstTwo <= max);
    if (!inRange) {
      return { valid: false, errors: ['Invalid Routing Number.'] };
    }

    // Checksum Validation – Use the official ABA formula: (3 × (d1 + d4 + d7)) + (7 × (d2 + d5 + d8)) + (1 × (d3 + d6 + d9)) The total must be divisible by 10 (mod 10 = 0).
    const sum = 3 * (digits[0] + digits[3] + digits[6]) +
               7 * (digits[1] + digits[4] + digits[7]) +
               1 * (digits[2] + digits[5] + digits[8]);
    if (sum % 10 !== 0) {
      return { valid: false, errors: ['Invalid Routing Number.'] };
    }

    return { valid: true, errors: [] };
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

  private getLicenseRegex(state: string): RegExp {
    return this.licenseRegexes[state] || /^[A-Z0-9]{1,20}$/i;
  }

  private getIdRegex(state: string): RegExp {
    return this.idRegexes[state] || /^[A-Z0-9]{1,20}$/i;
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
    if (this.currentStep === 3 || this.currentStep === 4) {
      const input = event.target as HTMLInputElement;
      const lettersOnly = input.value.replace(/[^a-zA-Z\s]/g, '');
      if (input.value !== lettersOnly) {
        input.value = lettersOnly;
        this.answers[this.currentStep] = lettersOnly;
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
      const areaCode = parseInt(phone.substring(0, 3), 10);
      if (!this.areaCodesUS.includes(areaCode)) {
        this.errorMessage = 'Invalid Phone';
        return false;
      }
    }

    if (this.currentStep === this.EMAIL_QUESTION_INDEX) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const trimmedAnswer = (currentAnswer as string).trim();
      if (typeof currentAnswer !== 'string' || !emailRegex.test(trimmedAnswer)) {
        this.errorMessage = 'Please enter a valid email address.';
        return false;
      }
      const domain = trimmedAnswer.split('@')[1];
      const hasMX = await this.checkMX(domain);
      if (!hasMX) {
        this.errorMessage = 'Please enter a valid email address.';
        return false;
      }
    }

    if (this.currentStep === 3 || this.currentStep === 4) {
      const trimmedAnswer = (currentAnswer as string).trim();
      if (typeof currentAnswer !== 'string' || !/^[a-zA-Z\s]+$/.test(trimmedAnswer)) {
        this.errorMessage = 'Please enter only letters for the name.';
        return false;
      }
    }

    if (this.currentStep === this.LICENSE_NUMBER_INDEX) {
      const licenseState = this.answers[this.LICENSE_STATE_INDEX];
      if (!licenseState) {
        this.errorMessage = 'Please select license state first.';
        return false;
      }
      const regex = this.getLicenseRegex(licenseState);
      const processedAnswer = (currentAnswer as string).trim().toUpperCase();
      if (typeof currentAnswer !== 'string' || !regex.test(processedAnswer)) {
        this.errorMessage = 'Please enter a valid license number for ' + licenseState;
        return false;
      }
    }

    if (this.currentStep === this.ID_NUMBER_INDEX) {
      const licenseState = this.answers[this.LICENSE_STATE_INDEX];
      if (!licenseState) {
        this.errorMessage = 'Please select license state first.';
        return false;
      }
      const regex = this.getIdRegex(licenseState);
      const processedAnswer = (currentAnswer as string).trim().toUpperCase();
      if (typeof currentAnswer !== 'string' || !regex.test(processedAnswer)) {
        this.errorMessage = 'Please enter a valid ID number for ' + licenseState;
        return false;
      }
    }

    if (this.currentStep === this.ABA_ROUTING_INDEX) {
      const result = this.validateABARouting(currentAnswer as string);
      if (!result.valid) {
        this.errorMessage = result.errors.join(' ');
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

        // First, check state via steermarketeer API
        const stateResponse = await fetch(`https://steermarketeer.com/api/a9f3b2c1e7d4?zip=${zip}`);
        const stateData = await stateResponse.json();
        const apiStateName = stateData.state_name;

        const selectedState = this.answers[this.STATE_QUESTION_INDEX];

        if (apiStateName === 'Unknown') {
          this.errorMessage = 'Invalid zip (Not US)';
          this.isZipValidating = false;
          return;
        }

        if (apiStateName !== selectedState) {
          this.errorMessage = 'Invalid zip for selected state';
          this.isZipValidating = false;
          return;
        }

        // If state matches, proceed with zippopotam
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (!response.ok) throw new Error('Zip code not found or invalid.');

        const data = await response.json();
        if (!data.places || data.places.length === 0) {
          throw new Error('Zip code not found or invalid.');
        }

        const place = data.places[0];
        this.answers[this.CITY_QUESTION_INDEX] = place['place name'];

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
      if (this.currentStep === this.questions.length - 2) {
        this.isCountryValidating = true;
        const isUS = await this.checkCountry();
        this.isUSCitizen = isUS;
        if (!isUS) {
          this.countryErrorMessage = 'This service is only for US Citizens';
        }
        this.isCountryValidating = false;
      }
      this.currentStep++;
      this.saveProgress();
    }
  }

  prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

async submitForm() {
  this.isSubmitting = true;
  this.errorMessage = '';

  // ✅ Check if US Citizen
  if (!this.isUSCitizen) {
    this.errorMessage = 'This service is only for US Citizens';
    this.isSubmitting = false;
    return;
  }

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

  const leadIdValue = (document.getElementById('leadid_token') as HTMLInputElement)?.value || '';
if (!leadIdValue) {
  this.errorMessage = 'Universal LeadID is required. Please wait for it to load and try again.';
  this.isSubmitting = false;
  return;
}

this.universalLeadid = leadIdValue;
sessionStorage.setItem('universal_leadid', leadIdValue);


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

    if (this.ipAddress) {
      this.isUSCitizen = await this.checkCountry();
    }

    if (!this.ipAddress) {
      this.isSubmitted = true;
      this.errorMessage = '';
      console.log("Simulated submission - no IP");
      sessionStorage.removeItem('loanForm');
      try {
        if (this.trustedFormPollTimer) {
          clearTimeout(this.trustedFormPollTimer);
          this.trustedFormPollTimer = null;
        }
        if (this.leadiDPollTimer) {
          clearTimeout(this.leadiDPollTimer);
          this.leadiDPollTimer = null;
        }
        if (this.ipPollTimer) {
          clearTimeout(this.ipPollTimer);
          this.ipPollTimer = null;
        }
        const tfScript = document.getElementById('trustedform-loader');
        tfScript?.parentNode?.removeChild(tfScript);
        this.trustedFormInjected = false;
      } catch {}
      this.isSubmitting = false;
      return;
    }

    // Check IP allowance
    let shouldProceedWithSubmission = false;
    try {
      const checkResponse = await fetch(`https://steermarketeer.com/API/checkIp.php?ip=${this.ipAddress}`);
      const checkData = await checkResponse.json();
      if (checkData.allowed === true) {
        shouldProceedWithSubmission = true;
      } else {
        this.isSubmitted = true;
        this.errorMessage = '';
        console.log("Simulated submission - not allowed");
        sessionStorage.removeItem('loanForm');
        try {
          if (this.trustedFormPollTimer) {
            clearTimeout(this.trustedFormPollTimer);
            this.trustedFormPollTimer = null;
          }
          if (this.leadiDPollTimer) {
            clearTimeout(this.leadiDPollTimer);
            this.leadiDPollTimer = null;
          }
          if (this.ipPollTimer) {
            clearTimeout(this.ipPollTimer);
            this.ipPollTimer = null;
          }
          const tfScript = document.getElementById('trustedform-loader');
          tfScript?.parentNode?.removeChild(tfScript);
          this.trustedFormInjected = false;
        } catch {}
        this.isSubmitting = false;
        return;
      }
    } catch (error) {
      console.error('IP check failed:', error);
      this.isSubmitted = true;
      this.errorMessage = '';
      console.log("Simulated submission - check failed");
      sessionStorage.removeItem('loanForm');
      try {
        if (this.trustedFormPollTimer) {
          clearTimeout(this.trustedFormPollTimer);
          this.trustedFormPollTimer = null;
        }
        if (this.leadiDPollTimer) {
          clearTimeout(this.leadiDPollTimer);
          this.leadiDPollTimer = null;
        }
        if (this.ipPollTimer) {
          clearTimeout(this.ipPollTimer);
          this.ipPollTimer = null;
        }
        const tfScript = document.getElementById('trustedform-loader');
        tfScript?.parentNode?.removeChild(tfScript);
        this.trustedFormInjected = false;
      } catch {}
      this.isSubmitting = false;
      return;
    }

    if (!shouldProceedWithSubmission) {
      // This shouldn't happen, but just in case
      return;
    }

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
      formattedAnswers['dateOfBirth'] = `${mm}/${dd}/${yyyy}`;
    }

    // ✅ Format Next Pay Date as mm/dd/yyyy
    if (formattedAnswers['nextPayDate']) {
      const npd = new Date(formattedAnswers['nextPayDate']);
      if (!isNaN(npd.getTime())) {
        const mm = String(npd.getMonth() + 1).padStart(2, '0');
        const dd = String(npd.getDate()).padStart(2, '0');
        const yyyy = npd.getFullYear();
        formattedAnswers['nextPayDate'] = `${mm}/${dd}/${yyyy}`;
      }
    }

    // ✅ Fix SSN4 key
    formattedAnswers['ssn4'] = this.answers[this.SSN_QUESTION_INDEX] || '';

    const payload = {
      state: this.stateAbbreviations[formattedAnswers['whatIsYourState']] || formattedAnswers['whatIsYourState'] || '',
      zip: formattedAnswers['whatIsYourZipCode'] || '',
      monthlyIncome: formattedAnswers['whatIsYourMonthlyIncome'] || '',
      creditScore: formattedAnswers['whatIsYourCreditScoreRange'] || '',
      city: formattedAnswers['whatIsYourCity'] || '',
      dob: formattedAnswers['dateOfBirth'] || '',
      email: formattedAnswers['emailAddress'] || '',
      phone: formattedAnswers['phoneNumber10DigitsWithout1'] || formattedAnswers['phoneNumber'] || '',
      loanPurpose: formattedAnswers['purposeOfLoan'] || '',
      firstName: formattedAnswers['legalFirstName'] || '',
      lastName: formattedAnswers['legalLastName'] || '',
      ssn4: formattedAnswers['ssn4'] || '',
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
      licenseState: this.stateAbbreviations[formattedAnswers['licenseIdState']] || formattedAnswers['licenseIdState'] || '',
      licenseNumber: formattedAnswers['licenseNumber'] || '',
      idNumber: formattedAnswers['idNumber'] || '',
      homeOwnership: formattedAnswers['homeOwnershipStatus'] || '',
      carOwnership: formattedAnswers['carOwnershipStatus'] || '',
      timeLived: formattedAnswers['howLongHaveYouLivedAtThisAddress'] || '',
      bestTimeToContact: formattedAnswers['bestTimeToContactYou'] || '',
      // ✅ Optional fields
      aff_id: sessionStorage.getItem('aff_id') || this.affId || null,
      sub_aff_id: sessionStorage.getItem('sub_aff_id') || this.subAffId || null,
      tid: sessionStorage.getItem('tid') || this.tid || null,

      // ✅ Context
      url: this.url,
      tcpaConsent: this.tcpaConsent,
      TcpaText: this.TcpaText,
      userTermsAndConditions: this.answers[this.TERMS_QUESTION_INDEX] === true,
      universalLeadid: this.universalLeadid || '',
      xxTrustedFormCertUrl: sessionStorage.getItem('xxTrustedFormCertUrl') || this.trustedFormCertUrl || '',
      ipAddress: this.ipAddress,
      browser: this.browserUserAgent
    };

    console.log('Submitting payload:', payload);

    // ✅ POST to backend
    const response = await fetch('https://quickcashpoint.com/api/ping-proxy.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      this.isSubmitted = true;
      this.errorMessage = '';

      // ✅ Log parsed JSON instead of raw Response
      console.log("✅ Proxy response JSON:", result);

      sessionStorage.removeItem('loanForm');

      // Cleanup TrustedForm
      try {
        if (this.trustedFormPollTimer) {
          clearTimeout(this.trustedFormPollTimer);
          this.trustedFormPollTimer = null;
        }
        if (this.leadiDPollTimer) {
          clearTimeout(this.leadiDPollTimer);
          this.leadiDPollTimer = null;
        }
        if (this.ipPollTimer) {
          clearTimeout(this.ipPollTimer);
          this.ipPollTimer = null;
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
    try {
      if (this.trustedFormPollTimer) {
        clearTimeout(this.trustedFormPollTimer);
        this.trustedFormPollTimer = null;
      }
      if (this.leadiDPollTimer) {
        clearTimeout(this.leadiDPollTimer);
        this.leadiDPollTimer = null;
      }
      if (this.ipPollTimer) {
        clearTimeout(this.ipPollTimer);
        this.ipPollTimer = null;
      }
    } catch {}
  } finally {
    this.isSubmitting = false;
    try {
      if (this.trustedFormPollTimer) {
        clearTimeout(this.trustedFormPollTimer);
        this.trustedFormPollTimer = null;
      }
      if (this.leadiDPollTimer) {
        clearTimeout(this.leadiDPollTimer);
        this.leadiDPollTimer = null;
      }
      if (this.ipPollTimer) {
        clearTimeout(this.ipPollTimer);
        this.ipPollTimer = null;
      }
    } catch {}
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
    this.isCountryValidating = false;
    this.isUSCitizen = true;
    this.countryErrorMessage = '';
    sessionStorage.clear();
    sessionStorage.removeItem('loanForm');
    try {
      if (this.trustedFormPollTimer) {
        clearTimeout(this.trustedFormPollTimer);
        this.trustedFormPollTimer = null;
      }
      if (this.leadiDPollTimer) {
        clearTimeout(this.leadiDPollTimer);
        this.leadiDPollTimer = null;
      }
      if (this.ipPollTimer) {
        clearTimeout(this.ipPollTimer);
        this.ipPollTimer = null;
      }
    } catch {}
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
      const poll = () => {
        if (this.isSubmitted) return;
        const el = document.getElementById('xxTrustedFormCertUrl') as HTMLInputElement | null;
        const val = el?.value || '';
        if (val) {
          this.trustedFormCertUrl = val;
          sessionStorage.setItem('xxTrustedFormCertUrl', val);
        } else {
          this.trustedFormPollTimer = setTimeout(poll, 300);
        }
      };
      this.trustedFormInjected = true;
      this.trustedFormPollTimer = setTimeout(poll, 500);
    } catch (e) {
      console.error('Failed to inject TrustedForm:', e);
    }
  }

private injectLeadiD(): void {
  try {
    // Ensure the hidden input exists with the correct id and name
    let leadIdInput = document.getElementById('leadid_token') as HTMLInputElement | null;
    if (!leadIdInput) {
      const input = document.createElement('input') as HTMLInputElement;
      input.type = 'hidden';
      input.id = 'leadid_token';
      input.name = 'universal_leadid';
      document.body.appendChild(input);
      leadIdInput = input;
    }

    // Remove old script if it exists
    const oldScript = document.getElementById('LeadiDscript_campaign');
    if (oldScript) {
      oldScript.parentNode?.removeChild(oldScript);
    }

    // Ensure anchor script exists
    let anchor = document.getElementById('LeadiDscript') as HTMLScriptElement | null;
    if (!anchor) {
      anchor = document.createElement('script') as HTMLScriptElement;
      anchor.id = 'LeadiDscript';
      anchor.type = 'text/javascript';
      document.body.appendChild(anchor);
    }

    // Inject campaign script (only if anchor exists now)
    if (anchor.parentNode) {
      const s = document.createElement('script');
      s.id = 'LeadiDscript_campaign';
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//create.lidstatic.com/campaign/548c86c2-3c24-2ec2-b201-274ffb0f5005.js?snippet_version=2';
      anchor.parentNode.insertBefore(s, anchor);
    }

    // Poll for value until success
    const poll = () => {
      if (this.isSubmitted) return;
      const el = document.getElementById('leadid_token') as HTMLInputElement | null;
      const val = el?.value || '';
      if (val) {
        this.universalLeadid = val;
        sessionStorage.setItem('universal_leadid', val);
      } else {
        this.leadiDPollTimer = setTimeout(poll, 300);
      }
    };
    setTimeout(poll, 500);
  } catch (e) {
    console.error('Failed to inject LeadiD:', e);
  }
}

}