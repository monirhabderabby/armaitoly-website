import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint | Joy Beach Villas",
  description:
    "experience the ultimate getaway at joy beach villas with luxury villas in koh phangan, offering stunning beach views and exquisite amenities for an unforgettable stay.",
};

const ImprintPage = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-10 tracking-tight">
          Imprint
        </h1>

        {/* Address Block */}
        <div className="mb-8 text-sm text-gray-700 leading-relaxed font-light">
          <p>JOY Beach Villas</p>
          <p>4, Hin Kong Rd</p>
          <p>84280 Koh Phangan</p>
          <p>Surat Thani, Thailand</p>
          <p>Phone: +66 (0)63 815 7328</p>
          <p>
            E-Mail:{" "}
            <a
              href="mailto:reception@joybeachvillas.com"
              className="text-gray-700 underline underline-offset-2 hover:text-gray-900 transition-colors"
            >
              reception@joybeachvillas.com
            </a>
          </p>
        </div>

        {/* Owner */}
        <div className="mb-8 text-sm text-gray-700 leading-relaxed font-light">
          <p className="font-normal text-gray-900 mb-1">Owner:</p>
          <p>Markus Boll</p>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-200 my-8" />

        {/* Run By */}
        <div className="mb-8 text-sm text-gray-700 leading-relaxed font-light">
          <p className="font-normal text-gray-900 mb-1">Run By:</p>
          <p>Ewore &amp; Co. Ltd</p>
          <p>4 Moo 6 Hingkong Road</p>
          <p>Koh Phangan</p>
          <p>Prov. Surat Thani 84280</p>
          <p>Tax ID 094 5561 0048 61</p>
        </div>

        {/* Responsible */}
        <div className="mb-8 text-sm text-gray-700 leading-relaxed font-light">
          <p className="font-normal text-gray-900 mb-1">
            Responsible for the content:
          </p>
          <p>Markus Boll</p>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-200 my-8" />

        {/* Legal Information */}
        <div className="text-sm text-gray-600 leading-relaxed font-light">
          <p className="font-normal text-gray-900 mb-2">Legal information:</p>
          <p>
            The contents of our website are carefully checked. A guarantee for
            the completeness, accuracy and timeliness of the content cannot be
            given. We are not responsible for the content of websites linked
            from our pages. The reference by hyperlink does not represent a
            recommendation of these websites or the companies operating them or
            their products by us. Liability claims, which are caused by the use
            of our internet offer, are impossible, if we did not act
            deliberately or roughly negligently. Furthermore, we reserve the
            right to make changes or additions to the information provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImprintPage;
