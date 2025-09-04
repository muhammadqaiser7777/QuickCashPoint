import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FAQ {
  q: string;
  a: string;
  tags?: string[];
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.html',
  styleUrls: ['./faq.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Faq {
  query = '';
  faqs: FAQ[] = [
    {
      q: 'What is Quick Cash Point and what do you do?',
      a: `Quick Cash Point is a lead-generation platform that connects consumers who need loan products with verified third-party lenders and buyers. We do not originate loans or make lending decisions — our role is to securely collect and forward consumer information to lender partners who may contact you with offers.`
    },
    {
      q: 'How does the lead matching process work?',
      a: `You provide your details through our secure form. We pre-screen and match your profile to lenders in our network based on the information you provide (credit range, loan type, location, etc.). Lenders we match to may review your information and contact you with offers; you decide whether to accept any offer. Examples of this workflow are common across lending marketplaces and lead providers. :contentReference[oaicite:0]{index=0}`
    },
    {
      q: 'Do you provide loans directly?',
      a: `No. Quick Cash Point is not a lender. We are a lead generation service that shares your information with third-party lenders. Loan approval, terms, rates, and fees are determined by those lenders, not by Quick Cash Point.`
    },
    {
      q: 'What information do you collect?',
      a: `We may collect contact details (name, phone, email), location, employment and income details, and loan preferences. We also collect technical data such as IP address and device/browser info for security and analytics. We avoid collecting more data than necessary and follow data-minimization practices. :contentReference[oaicite:1]{index=1}`
    },
    {
      q: 'How is my information shared with lenders?',
      a: `When you submit a request, your information is securely transmitted to selected lenders and buyers in our network for evaluation. Those parties may contact you directly to discuss offers. We require partners to meet baseline data security and privacy expectations, but each lender may have its own privacy practices and terms.`
    },
    {
      q: 'Can I opt out or delete my data?',
      a: `Yes. California residents have rights under the CCPA, and you may also request deletion or opt-out of sale/sharing where applicable. We will confirm receipt of such requests promptly and respond within the legally required timeframes (businesses generally have up to 15 business days to confirm and begin processing such requests under California law). :contentReference[oaicite:2]{index=2}`
    },
    {
      q: 'How long will I be contacted by lenders after submitting my information?',
      a: `Contact timing varies — many lenders respond within minutes to hours after a match, while some may take longer depending on verification steps. If you receive multiple contacts, it means more than one lender is interested in your lead. Platforms similar to lending marketplaces report that lender responses often arrive via email shortly after submission. :contentReference[oaicite:3]{index=3}`
    },
    {
      q: 'Will Quick Cash Point sell my data?',
      a: `We may disclose leads to third-party buyers and partners as part of our business model. Where applicable under the law, we will provide opt-out mechanisms for consumers who do not want their data sold. If you are a California resident, you can exercise your rights under CCPA to opt out of sales. :contentReference[oaicite:4]{index=4}`
    },
    {
      q: 'How do you protect my information?',
      a: `We use industry standard security practices (encryption in transit and at rest, access controls, and monitoring). We also recommend you do not share unnecessary sensitive information until you are comfortable with a lender’s legitimacy. Regulatory bodies (FTC, CFPB) have increased scrutiny on data brokers and lead generators — so maintaining compliance and secure practices is critical. :contentReference[oaicite:5]{index=5}`
    },
    {
      q: 'What about third-party tracking and cookies?',
      a: `We and some of our partners use cookies and similar technologies to operate, secure, and improve the website, and to support advertising or analytics. You may control cookie settings through your browser or our preference center where provided.`
    },
    {
      q: 'Are there any fees to use Quick Cash Point?',
      a: `No — Quick Cash Point does not charge consumers to submit a lead. Any fees, interest rates, or costs are set by the lender who ultimately provides a loan.`
    },
    {
      q: 'How can I verify a lender who contacts me?',
      a: `Ask for the lender’s legal business name, licensing details, and a written loan estimate. Legitimate lenders provide clear terms and allow you to review paperwork before signing. If something feels suspicious, consider checking with consumer protection resources (FTC/CFPB) or ask us and we can provide guidance. :contentReference[oaicite:6]{index=6}`
    },
    {
      q: 'Can I receive fewer contacts or limit who can contact me?',
      a: `Yes — in many cases you can specify preferences in your submission (loan types, maximum number of contacts, preferred contact methods), and you can always request that we stop sharing your information or limit sharing with specific partners.`
    },
    {
      q: 'Why am I receiving many calls / texts after submitting?',
      a: `Lead auctions and “ping” processes can result in multiple lenders attempting contact. The FTC has raised concerns about aggressive or unexpected contact in some lead-generation practices; if you experience unwanted calls or texts, you may request an opt-out, report spam, or register with national do-not-call services depending on your location. :contentReference[oaicite:7]{index=7}`
    },
    {
      q: 'How do I contact Quick Cash Point with questions or data requests?',
      a: `Email us at info@quickcashpoint.com or call +1 929 390 0290. For California privacy requests, please specify that it is a "CCPA Request" so we can expedite processing.`
    }
  ];

  get filtered() {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.faqs;
    return this.faqs.filter(f => (f.q + ' ' + f.a).toLowerCase().includes(q));
  }
}
