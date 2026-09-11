import type { Metadata } from 'next'
import LegalPage, { LegalSection } from '@/components/legal/LegalPage'
import { contactEmail } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing the use of the Movement website.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <LegalSection title="1. Acceptance of terms">
        <p>
          By accessing and using the website of Movement (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;), you accept
          and agree to be bound by the terms and provisions of this agreement. In addition, when using this
          website&apos;s particular services, you shall be subject to any posted guidelines or rules applicable to such
          services.
        </p>
      </LegalSection>

      <LegalSection title="2. No investment advice">
        <p>
          The content provided on this website is for informational purposes only and does not constitute a
          solicitation, offer, opinion or recommendation to buy or sell any securities or other financial instruments,
          or to provide any investment advice or service. Nothing contained on this website constitutes investment,
          legal, tax or other advice. You should consult your own professional advisors before making any investment
          decisions.
        </p>
      </LegalSection>

      <LegalSection title="3. Intellectual property">
        <p>
          The site and its original content, features and functionality are owned by Movement and are protected by
          international copyright, trademark, patent, trade secret and other intellectual property or proprietary
          rights laws.
        </p>
      </LegalSection>

      <LegalSection title="4. Limitation of liability">
        <p>
          In no event shall Movement, nor its directors, employees, partners, agents, suppliers or affiliates, be liable
          for any indirect, incidental, special, consequential or punitive damages, including without limitation loss
          of profits, data, use, goodwill or other intangible losses, resulting from (i) your access to or use of, or
          inability to access or use, the service; (ii) any conduct or content of any third party on the service; (iii)
          any content obtained from the service; and (iv) unauthorized access, use or alteration of your transmissions
          or content, whether based on warranty, contract, tort (including negligence) or any other legal theory,
          whether or not we have been informed of the possibility of such damage.
        </p>
      </LegalSection>

      <LegalSection title="5. International use">
        <p>
          Movement makes no representation that materials on this site are appropriate or available for use in
          locations outside of Canada or Singapore. Accessing materials from territories where their contents are
          illegal is prohibited. Those who choose to access this site from other locations do so on their own
          initiative and are responsible for compliance with local laws.
        </p>
      </LegalSection>

      <LegalSection title="6. Changes to terms">
        <p>
          We reserve the right, at our sole discretion, to modify or replace these terms at any time. What constitutes
          a material change will be determined at our sole discretion.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact us">
        <p>
          If you have any questions about these terms, please contact us at{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
