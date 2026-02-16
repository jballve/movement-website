import React from 'react'

export const metadata = {
  title: 'Terms of Use | Movement',
  description: 'Terms of Use for Movement Investment Firm.',
}

export default function TermsPage() {
  return (
    <section className="section-padding container-custom min-h-screen pt-32 md:pt-40">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl mb-8 text-foreground">Terms of Use</h1>
        <div className="w-20 h-1 bg-accent mb-12" />
        
        <div className="prose dark:prose-invert max-w-none font-body text-foreground/80 leading-relaxed space-y-8">
          <p className="italic text-sm">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website of Movement (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website&apos;s particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">2. No Investment Advice</h2>
            <p>
              The content provided on this website is for informational purposes only and does not constitute a solicitation, offer, opinion, or recommendation to buy or sell any securities or other financial instruments or to provide any investment advice or service. Nothing contained on this website constitutes investment, legal, tax, or other advice. You should consult your own professional advisors before making any investment decisions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">3. Intellectual Property</h2>
            <p>
              The Site and its original content, features, and functionality are owned by Movement and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">4. Limitation of Liability</h2>
            <p>
              In no event shall Movement, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">5. International Use</h2>
            <p>
              Movement makes no representation that materials on this site are appropriate or available for use in locations outside of Canada or Singapore. Accessing materials from territories where their contents are illegal is prohibited. Those who choose to access this site from other locations do so on their own initiative and are responsible for compliance with local laws.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:contact@invest-movement.com" className="text-accent hover:underline">contact@invest-movement.com</a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}
