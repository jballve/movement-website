import React from 'react'

export const metadata = {
  title: 'Privacy Policy | Movement',
  description: 'Privacy Policy for Movement Investment Firm.',
}

export default function PrivacyPage() {
  return (
    <section className="section-padding container-custom min-h-screen pt-32 md:pt-40">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl mb-8 text-foreground">Privacy Policy</h1>
        <div className="w-20 h-1 bg-accent mb-12" />
        
        <div className="prose dark:prose-invert max-w-none font-body text-foreground/80 leading-relaxed space-y-8">
          <p className="italic text-sm">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">1. Information Collection</h2>
            <p>
              Movement (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. We collect information that you provide directly to us when you use our &quot;Contact&quot; form, including your name, email address, company name, and any message content. We may also automatically collect certain information when you visit our website, such as your IP address and browser type, for analytics purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">2. Use of Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Respond to your inquiries and correspondence.</li>
              <li>Analyze usage trends and improve our website functionality.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">4. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">5. International Transfer</h2>
            <p>
              Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-foreground mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@invest-movement.com" className="text-accent hover:underline">contact@invest-movement.com</a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}
