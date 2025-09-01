import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Faq } from './pages/faq/faq';
import { ApplyNow } from './pages/apply-now/apply-now';
import { Loans } from './pages/loans/loans';
import { CompanyPolicy } from './layouts/policies/company-policy/company-policy';
import { PrivacyPolicy } from './layouts/policies/privacy-policy/privacy-policy';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'faq', component: Faq },
  { path: 'apply-now', component: ApplyNow },
  { path: 'loans', component: Loans },
  { path: 'company-policy', component: CompanyPolicy },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: '**', redirectTo: '' }
];
