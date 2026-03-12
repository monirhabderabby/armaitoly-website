import Hero from "@/components/shared/hero/hero";

const PrivacySection = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    {title && (
      <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
    )}
    <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

const Page = () => {
  return (
    <main className="min-h-screen">
      <Hero
        title="Privacy Policy of JOY Villas"
        description=""
        imageSrc="/privacy.jpg"
        isAvailabilityEnabled={false}
      />

      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Data protection / Analysis services */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
            Data protection / Analysis services
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
        </div>

        {/* General information */}
        <PrivacySection title="General information">
          <p>
            The following notes provide a simple overview of what happens to
            your personal data when you visit our website. Personal data is any
            data that can be used to identify you personally. For detailed
            information on data protection, please refer to this privacy policy.
            With regard to terms used, we refer to the definitions in Art. 4 of
            the General Data Protection Regulation (DSGVO).
          </p>
          <p className="text-sm text-gray-400">Status: June 2022</p>
        </PrivacySection>

        {/* Data collection on our website */}
        <PrivacySection title="Data collection on our website">
          <h3 className="font-semibold text-gray-700">
            Who is responsible for data collection on this website?
          </h3>
          <p>
            Data processing on this website is carried out by the website
            operator:
          </p>
          <address className="not-italic">
            JOY Beach Villas
            <br />
            4, Hin Kong Rd
            <br />
            84280 Koh Phangan
            <br />
            Surat Thani, Thailand
            <br />
            Tel: +66 (0)62 408 0324
            <br />
            E-mail address: reception@joybeachvillas.com
          </address>
          <p>
            For further information please refer to the imprint of our website.
          </p>
        </PrivacySection>

        {/* Data Protection Officer */}
        <PrivacySection title="Data Protection Officer">
          <p>
            We fall below the number of employees processing personal data
            required for the appointment of a data protection officer according
            to § 38 BDSG-Neu.
          </p>
        </PrivacySection>

        {/* What data do we process? */}
        <PrivacySection title="What data do we process?">
          <p>
            The categories of processed data include: Inventory data, contact
            data and content data that you provide to us via contact form or
            e-mail, as well as usage and communication data. This includes,
            among other things, your anonymized IP address, data on your
            software and hardware used.
          </p>
          <p>
            In principle, we do not process any special categories of data -
            unless you provide us with this data via contact form.
          </p>
          <p>
            We process data of visitors and users of our online offer as well as
            data of customers, interested parties and suppliers.
          </p>
          <p className="text-sm text-gray-400">Status: June 2022</p>
        </PrivacySection>

        {/* Rights */}
        <PrivacySection title="What rights do you have regarding your data?">
          <p>
            You have the right to receive information about the origin,
            recipient and purpose of your stored personal data free of charge at
            any time. You also have a right to demand the correction, blocking
            or deletion of this data. For this purpose, as well as for further
            questions on the subject of data protection, you can contact us at
            any time at the address given in the imprint. Furthermore, you have
            the right to lodge a complaint with the competent supervisory
            authority.
          </p>
        </PrivacySection>

        {/* Legal basis */}
        <PrivacySection>
          <p>
            We process users&apos; personal data only in compliance with the
            relevant data protection provisions. This means that the users&apos;
            data is only processed if a legal permission exists. I.e., in
            particular if the data processing is necessary for the provision of
            our contractual services (e.g. processing of orders) as well as
            online services, or is required by law, a consent of the user is
            available, as well as due to our legitimate interests (i.e. interest
            in the analysis, optimization and economic operation and security of
            our online offer within the meaning of Art. 6 para. 1 lit. f. DSGVO,
            in particular in the case of range measurement, creation of profiles
            for advertising and marketing purposes, and collection of access
            data and use of third-party services.
          </p>
          <p>
            We point out that the legal basis of the consents Art. 6 para. 1
            lit. a. and Art. 7 DSGVO, the legal basis for processing for the
            performance of our services and implementation of contractual
            measures Art. 6 para. 1 lit. b. DSGVO, the legal basis for
            processing to fulfill our legal obligations Art. 6 para. 1 lit. c.
            DSGVO, and the legal basis for processing to protect our legitimate
            interests Art. 6 para. 1 lit. f. DSGVO.
          </p>
          <p>
            If changes require your cooperation (e.g. consent), we will inform
            you individually.
          </p>
        </PrivacySection>

        {/* Security measures */}
        <PrivacySection title="Security measures">
          <p>
            We take appropriate technical and organizational measures in
            accordance with Art. 32 DSGVO, taking into account the state of the
            art, the costs of implementation and the nature, scope,
            circumstances and purposes of the processing, as well as the varying
            likelihood and severity of the risk to the rights and freedoms of
            natural persons, to ensure a level of protection appropriate to the
            risk; The measures include, in particular, ensuring the
            confidentiality, integrity and availability of data by controlling
            physical access to the data, as well as access concerning them,
            input, disclosure, ensuring availability and their separation.
            Furthermore, we have established procedures to ensure the exercise
            of data subjects&apos; rights, deletion of data and response to data
            compromise. Furthermore, we already take the protection of personal
            data into account during the development and selection of hardware,
            software and processes, in accordance with the principle of data
            protection through technology design and through data
            protection-friendly default settings (Article 25 of the GDPR).
          </p>
          <p>
            The security measures include in particular the encrypted
            transmission of data between your browser and our server.
          </p>
        </PrivacySection>

        {/* Cooperation with processors and third parties */}
        <PrivacySection title="Cooperation with processors and third parties">
          <p>
            If, in the course of our processing, we disclose data to other
            persons and companies (order processors or third parties), transmit
            it to them or otherwise grant them access to the data, this will
            only be done on the basis of a legal permission (e.g. if a
            transmission of the data to third parties, such as payment service
            providers, is necessary for the performance of the contract pursuant
            to Art. 6 (1) lit. b DSGVO), you have consented, a legal obligation
            provides for this or on the basis of our legitimate interests (e.g.
            when using agents, web hosts, etc.).
          </p>
          <p>
            If we commission third parties with the processing of data on the
            basis of a so-called &apos;order processing agreement&apos;, this is
            done on the basis of Art. 28 DSGVO.
          </p>
        </PrivacySection>

        {/* Transfers to third countries */}
        <PrivacySection title="Transfers to third countries">
          <p>
            If we process data in a third country (i.e. outside the European
            Union (EU) or the European Economic Area (EEA)) or if this happens
            in the context of using third-party services or disclosing, or
            transferring data to third parties, this will only happen if it is
            done to fulfill our (pre)contractual obligations, on the basis of
            your consent, due to a legal obligation or on the basis of our
            legitimate interests. Subject to legal or contractual permissions,
            we process or allow the processing of data in a third country only
            if the special requirements of Art. 44 et seq. DSGVO are met. I.e.
            the processing is carried out, for example, on the basis of special
            guarantees, such as the officially recognized determination of a
            level of data protection corresponding to that of the EU (e.g. for
            the USA by the &apos;Privacy Shield&apos;) or compliance with
            officially recognized special contractual obligations (so-called
            &apos;standard contractual clauses&apos;).
          </p>
        </PrivacySection>

        {/* Rights of the data subjects */}
        <PrivacySection title="Rights of the data subjects">
          <p>
            You have the right to request confirmation as to whether data in
            question is being processed and to information about this data, as
            well as further information and a copy of the data in accordance
            with Art. 15 DSGVO.
          </p>
          <p>
            You have according to Art. 16 DSGVO the right to request the
            completion of the data concerning you or the correction of incorrect
            data concerning you.
          </p>
          <p>
            In accordance with Art. 17 DSGVO, you have the right to demand that
            data concerning you be deleted without delay or, alternatively, in
            accordance with Art. 18 DSGVO, to demand restriction of the
            processing of the data.
          </p>
          <p>
            You have the right to request that the data concerning you that you
            have provided to us be received in accordance with Art. 20 DSGVO and
            to request that it be transferred to other data controllers.
          </p>
          <p>
            You also have the right to lodge a complaint with the competent
            supervisory authority in accordance with Art. 77 DSGVO.
          </p>
        </PrivacySection>

        {/* Right to complain to a supervisory authority */}
        <PrivacySection title="Right to complain to a supervisory authority">
          <p>
            Without prejudice to any other administrative or judicial remedy,
            you have the right to lodge a complaint with a supervisory
            authority, in particular in the Member State of your residence,
            workplace or the place of the alleged infringement, if you consider
            that the processing of personal data concerning you infringes the
            GDPR.
          </p>
          <p>
            The supervisory authority to which the complaint has been lodged
            shall inform the complainant of the status and outcome of the
            complaint, including the possibility of a judicial remedy under
            Article 78 GDPR.
          </p>
        </PrivacySection>

        {/* Right of revocation */}
        <PrivacySection title="Right of revocation">
          <p>
            You have the right to revoke given consents according to Art. 7 (3)
            DSGVO with effect for the future.
          </p>
        </PrivacySection>

        {/* Right of objection */}
        <PrivacySection title="Right of objection">
          <p>
            You may object to the future processing of data concerning you in
            accordance with Art. 21 DSGVO at any time. The objection can be made
            in particular against processing for purposes of direct advertising.
          </p>
          <p>
            The user has the possibility to revoke his consent to the processing
            of personal data at any time. If the user contacts us by e-mail, he
            can object to the storage of his personal data at any time. In such
            a case, the conversation cannot be continued.
          </p>
          <p>
            The revocation of consent by the user is possible by returning the
            e-mail with the subject note &apos;Objection&apos;.
          </p>
          <p>
            All personal data stored in the course of contacting us will be
            deleted in this case.
          </p>
        </PrivacySection>

        {/* Deletion of data */}
        <PrivacySection title="Deletion of data">
          <p>
            The data processed by us will be deleted or restricted in its
            processing in accordance with Articles 17 and 18 DSGVO. Unless
            expressly stated within the scope of this data protection
            declaration, the data stored by us will be deleted as soon as they
            are no longer required for their intended purpose and the deletion
            does not conflict with any statutory retention obligations. If the
            data is not deleted because it is required for other and legally
            permissible purposes, its processing will be restricted. I.e. the
            data is blocked and not processed for other purposes. This applies,
            for example, to data that must be retained for reasons of commercial
            or tax law.
          </p>
          <p>
            According to legal requirements, data is stored in particular for 6
            years in accordance with § 257 para. 1 HGB (commercial books,
            inventories, opening balances, annual financial statements,
            commercial letters, accounting vouchers, etc.) and for 10 years in
            accordance with § 147 para. 1 AO (books, records, management
            reports, accounting vouchers, commercial and business letters,
            documents relevant for taxation, etc.).
          </p>
        </PrivacySection>

        {/* Right to deletion */}
        <PrivacySection title="Right to deletion - obligation to delete">
          <p>
            You may request the controller to delete the personal data
            concerning you without delay, and the controller is obliged to
            delete this data without delay, if one of the following reasons
            applies: (1) The personal data concerning you are no longer
            necessary for the purposes for which they were collected or
            otherwise processed. (2) You revoke your consent on which the
            processing was based pursuant to Art. 6(1)(a) or Art. 9(2)(a) DSGVO
            and there is no other legal basis for the processing. (3) You object
            to the processing pursuant to Art. 21 (1) DSGVO and there are no
            overriding legitimate grounds for the processing, or you object to
            the processing pursuant to Art. 21 (2) DSGVO. (4) The personal data
            concerning you have been processed unlawfully. (5) The erasure of
            the personal data concerning you is necessary for compliance with a
            legal obligation under Union or Member State law to which the
            controller is subject. (6) The personal data concerning you has been
            collected in relation to information society services offered
            pursuant to Article 8(1) DSGVO.
          </p>
        </PrivacySection>

        {/* Information to third parties */}
        <PrivacySection title="Information to third parties">
          <p>
            If the controller has made the personal data concerning you public
            and is obliged to erase it pursuant to Article 17(1) of the GDPR, it
            shall take reasonable measures, including technical measures, having
            regard to the available technology and the cost of implementation,
            to inform data controllers which process the personal data that you,
            as the data subject, have requested that they erase all links to or
            copies or replications of such personal data.
          </p>
        </PrivacySection>

        {/* Exceptions */}
        <PrivacySection title="Exceptions">
          <p>
            The right to erasure does not exist insofar as processing is
            necessary (1) for the exercise of the right to freedom of expression
            and information; (2) for compliance with a legal obligation which
            requires processing under Union or Member State law to which the
            controller is subject, or for the performance of a task carried out
            in the public interest or in the exercise of official authority
            vested in the controller; (3) for reasons of public health pursuant
            to Art. 9(2)(h) and (i) and Art. 9(3) of the GDPR; (4) for archiving
            purposes in the public interest, scientific or historical research
            purposes or statistical purposes pursuant to Art. 89(1) of the GDPR,
            insofar as the right referred to in section (a) is likely to make
            impossible or seriously prejudice the achievement of the purposes of
            such processing; or; (5) for the establishment, exercise or defense
            of legal claims.
          </p>
        </PrivacySection>

        {/* Right to restriction of processing */}
        <PrivacySection title="Right to restriction of processing">
          <p>
            You may request the restriction of the processing of personal data
            concerning you under the following conditions: (1) if you contest
            the accuracy of the personal data concerning you for a period
            enabling the controller to verify the accuracy of the personal data;
            (2) the processing is unlawful and you object to the erasure of the
            personal data and request instead the restriction of the use of the
            personal data; (3) the controller no longer needs the personal data
            for the purposes of the processing, but you need it for the
            establishment, exercise or defense of legal claims; or (4) if you
            object to the processing pursuant to Art. 21 (1) DSGVO and it has
            not yet been determined whether the legitimate grounds of the
            controller outweigh your grounds.
          </p>
          <p>
            If the processing of personal data relating to you has been
            restricted, such data may - apart from being stored - only be
            processed with your consent or for the establishment, exercise or
            defense of legal claims or for the protection of the rights of
            another natural or legal person or for reasons of important public
            interest of the Union or a Member State.
          </p>
          <p>
            If the restriction of processing has been restricted in accordance
            with the above conditions, you will be informed by the controller
            before the restriction is lifted.
          </p>
        </PrivacySection>

        {/* Right to data portability */}
        <PrivacySection title="Right to data portability">
          <p>
            You have the right to receive the personal data concerning you that
            you have provided to the controller in a structured, common and
            machine-readable format. In addition, you have the right to transfer
            this data to another controller without hindrance from the
            controller to whom the personal data was provided, provided that (1)
            the processing is based on consent pursuant to Art. 6(1)(a) DSGVO or
            Art. 9(2)(a) DSGVO or on a contract pursuant to Art. 6(1)(b) DSGVO
            and (2) the processing is carried out with the help of automated
            procedures.
          </p>
          <p>
            In exercising this right, you also have the right to obtain that the
            personal data concerning you be transferred directly from one
            controller to another controller, insofar as this is technically
            feasible. Freedoms and rights of other persons must not be affected
            by this.
          </p>
          <p>
            The right to data portability does not apply to processing of
            personal data necessary for the performance of a task carried out in
            the public interest or in the exercise of official authority vested
            in the controller.
          </p>
        </PrivacySection>

        {/* Right to information */}
        <PrivacySection title="Right to information">
          <p>
            If you have asserted the right to rectification, erasure or
            restriction of processing against the controller, the controller is
            obliged to inform all recipients to whom the personal data
            concerning you have been disclosed of this rectification or erasure
            of the data or restriction of processing, unless this proves
            impossible or involves a disproportionate effort.
          </p>
          <p>
            You have the right to be informed about these recipients by the data
            controller.
          </p>
        </PrivacySection>

        {/* Right to rectification */}
        <PrivacySection title="Right to rectification">
          <p>
            You have a right to rectification and/or completion vis-à-vis the
            controller if the personal data processed concerning you is
            incorrect or incomplete. The controller shall make the rectification
            without undue delay.
          </p>
        </PrivacySection>

        {/* Contacting */}
        <PrivacySection title="Contacting">
          <p>
            When contacting us (via contact form or e-mail), the user&apos;s
            details are processed for the purpose of handling the contact
            request and its processing pursuant to Art. 6 (1) lit. b) DSGVO.
          </p>
          <p>
            The user&apos;s details may be stored in our customer relationship
            management system (&apos;CRM system&apos;) or comparable inquiry
            organization.
          </p>
          <p>
            We delete the inquiries if they are no longer required. For personal
            data sent by e-mail, this is the case when the respective
            conversation with the user has ended. The conversation is ended when
            it is clear from the circumstances that the matter in question has
            been conclusively clarified. We review the necessity every two
            years; we store inquiries from customers who have a customer account
            permanently and refer to the information on the customer account for
            deletion. In the case of legal archiving obligations, deletion takes
            place after their expiry (end of commercial law (6 years) and tax
            law (10 years) retention obligation).
          </p>
        </PrivacySection>

        {/* Online presences in social media */}
        <PrivacySection title="Online presences in social media">
          <p>
            We maintain online presences within social networks and platforms in
            order to be able to communicate with customers, interested parties
            and users active there and to inform them about our services there.
            When calling up the respective networks and platforms, the terms and
            conditions and data processing guidelines of their respective
            operators apply.
          </p>
        </PrivacySection>

        {/* Integration of third-party services and content */}
        <PrivacySection title="Integration of third-party services and content">
          <p>
            Within our online offer, we use content or service offers of third
            parties on the basis of our legitimate interests (i.e. interest in
            the analysis, optimization and economic operation of our online
            offer within the meaning of Art. 6 para. 1 lit. f. DSGVO) to
            integrate content or services offered by third-party providers, such
            as videos or fonts (hereinafter uniformly referred to as
            &apos;content&apos;). This always requires that the third-party
            providers of this content are aware of the IP address of the user,
            since without the IP address they could not send the content to
            their browser. The IP address is thus required for the display of
            this content. We endeavor to use only such content whose respective
            providers use the IP address only for the delivery of the content.
            Third-party providers may also use so-called pixel tags (invisible
            graphics, also known as &apos;web beacons&apos;) for statistical or
            marketing purposes. The &apos;pixel tags&apos; can be used to
            evaluate information such as visitor traffic on the pages of this
            website. The pseudonymous information may also be stored in cookies
            on the user&apos;s device and may contain, among other things,
            technical information about the browser and operating system,
            referring websites, time of visit and other information about the
            use of our online offer, as well as be linked to such information
            from other sources.
          </p>
          <p>
            The following presentation provides an overview of third-party
            providers and their content, along with links to their privacy
            statements, which contain further information on the processing of
            data and, in part already mentioned here, opt-out options:
          </p>
        </PrivacySection>

        {/* jQuery */}
        <PrivacySection title="jQuery">
          <p>
            External code of the JavaScript framework &apos;jQuery&apos;,
            provided by the third-party provider jQuery Foundation.
          </p>
        </PrivacySection>

        {/* Social media channels */}
        <PrivacySection title="Social media channels">
          <h3 className="font-semibold text-gray-700 mb-2">
            Online presence (fan page) on Facebook
          </h3>
          <p>
            Our presence on social networks and platforms serves to improve
            active communication with our customers and interested parties. We
            provide information there about us, our products and current offers
            and, if applicable, events.
          </p>
          <p>
            When visiting our online presences on social media, your data may be
            automatically collected and stored for market research and
            advertising purposes. So-called usage profiles are created from this
            data using pseudonyms. These can be used, for example, to place
            advertisements within and outside the platforms that presumably
            correspond to your interests. Cookies are generally used on your
            terminal device for this purpose. In these cookies, visitor behavior
            and user interests are stored. This serves according to Art. 6 para.
            1 lit. f. DSGVO to protect our legitimate interests in an optimized
            presentation of our offer and effective communication with customers
            and interested parties, which prevail in the context of a balancing
            of interests. If you are asked by the respective social media
            platform operators for consent (agreement) to the data processing,
            e.g. by means of a checkbox, the legal basis for the data processing
            is Art. 6 (1) lit. a DSGVO.
          </p>
          <p>
            Insofar as the aforementioned social media platforms have their
            headquarters in the USA, the following applies: The European
            Commission has issued an adequacy decision for the USA. This goes
            back to the EU-US Privacy Shield. A current certificate for Facebook
            can be viewed here.
          </p>
          <p>
            The data processing takes place on the basis of an agreement between
            the jointly responsible parties pursuant to Art. 26 DSGVO, the
            operator of the Fanpage (responsible party as named above under
            &apos;Data collection on our website&apos; and Facebook Inc.) which
            you can view here.
          </p>
          <p>
            For detailed information on the processing and use of data by the
            providers on their pages, as well as a contact option and your
            rights and setting options in this regard to protect your privacy,
            in particular objection options (opt-out), please refer to the
            privacy notices of the providers linked below. If you still require
            assistance in this regard, you can contact us.
          </p>
        </PrivacySection>
      </section>
    </main>
  );
};

export default Page;
