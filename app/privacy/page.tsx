import type { Metadata } from 'next'
import LegalPage, { LegalSection } from '@/components/legal/LegalPage'
import { contactEmail } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Movement collects, uses and protects personal information submitted through this website.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <LegalSection title="1. Information collection">
        <p>
          Movement (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. We collect
          information that you provide directly to us when you use our contact form, including your name, email
          address, company name and any message content. We may also automatically collect certain information when
          you visit our website, such as your IP address and browser type, for analytics purposes.
        </p>
      </LegalSection>

      <LegalSection title="2. Use of information">
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiries and correspondence.</li>
          <li>Analyze usage trends and improve our website functionality.</li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Information sharing">
        <p>
          We do not sell, trade or otherwise transfer your personally identifiable information to outside parties. This
          does not include trusted third parties who assist us in operating our website, conducting our business or
          servicing you, so long as those parties agree to keep this information confidential.
        </p>
      </LegalSection>

      <LegalSection title="4. Data security">
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. However, no
          method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to
          use commercially acceptable means to protect your personal information, we cannot guarantee its absolute
          security.
        </p>
      </LegalSection>

      <LegalSection title="5. International transfer">
        <p>
          Your information, including personal data, may be transferred to and maintained on computers located outside
          of your state, province, country or other governmental jurisdiction where the data protection laws may differ
          from those of your jurisdiction.
        </p>
      </LegalSection>

      <LegalSection title="6. Changes to this policy">
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact us">
        <p>
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
