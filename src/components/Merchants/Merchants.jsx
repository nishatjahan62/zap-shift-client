import { FaQuestionCircle, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

const Faq = () => {
  const faqItems = [
    {
      question: "How does this posture corrector work?",
      answer: "It provides gentle support and aligns your shoulders, back, and spine.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer: "Yes, it's adjustable and fits a wide range of sizes and ages.",
    },
    {
      question: "Does it help with back pain and posture improvement?",
      answer: "Yes, it consistently improves posture and can relieve pain.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer: "Some models include alerts when poor posture is detected.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer: "You’ll receive email or SMS alerts if you're subscribed.",
    },
  ];

  return (
    <section className="bg-base-100 py-12 rounded-3xl my-12 lg:my-18">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        </p>

        <div className="space-y-4 text-left">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-200 border border-base-300 rounded-lg"
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-semibold flex items-center gap-3">
                <FaQuestionCircle className="text-primary" />
                {item.question}
              </div>
              <div className="collapse-content flex gap-3 text-gray-600">
                <FaCheckCircle className="text-success mt-1" />
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/all-faq">
            <button className="btn btn-success text-white px-6 py-2 rounded-full flex items-center gap-2">
              See More FAQ’s
              <span className="text-lg">↗</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Faq;
