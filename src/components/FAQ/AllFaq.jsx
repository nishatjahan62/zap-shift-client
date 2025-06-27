import { FaQuestionCircle, FaCheckCircle } from "react-icons/fa";

const allFaqItems = [
  {
    question: "How does this posture corrector work?",
    answer:
      "It provides gentle support and aligns your shoulders, back, and spine, fostering an effortless natural posture.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes, its adjustable design embraces a wide range of sizes and ages, inviting comfort to everyone.",
  },
  {
    question: "Does it help with back pain and posture improvement?",
    answer:
      "Indeed, consistent use nurtures your posture and can alleviate pain, promoting well-being with every wear.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some models whisper reminders through gentle vibrations, guiding you towards better posture throughout the day.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "Subscribe to our alerts and receive timely messages by email or SMS, so you never miss a chance to improve your posture.",
  },
  // Additional FAQs to deepen understanding and trust
  {
    question: "Can I wear the posture corrector while exercising?",
    answer:
      "Absolutely, it supports you gently without restricting movement, making it a perfect companion for light to moderate workouts.",
  },
  {
    question: "How long should I wear the corrector each day?",
    answer:
      "We recommend starting with 20-30 minutes daily and gradually increasing as your body adapts, allowing posture to gently realign.",
  },
  {
    question: "Is the posture corrector discreet under clothing?",
    answer:
      "Yes, its sleek and minimal design fits comfortably beneath most garments without drawing attention.",
  },
  {
    question: "How do I clean and maintain the corrector?",
    answer:
      "Simply hand wash with mild detergent and air dry to preserve its form and functionality for long-lasting use.",
  },
  {
    question: "What materials is the posture corrector made from?",
    answer:
      "Crafted from breathable, lightweight fabrics to ensure comfort throughout your day and ease of wear.",
  },
];

const AllFaq = () => {
  return (
    <section className=" py-16 min-h-screen">
      <div className="max-w-6xl mx-auto rounded-3xl bg-white shadow-lg p-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-6">
          All Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed text-lg">
          Dive deeper into the essence of posture and wellness with answers crafted to guide you towards a harmonious, aligned life.
        </p>

        <div className="space-y-6">
          {allFaqItems.map((item, idx) => (
            <div
              key={idx}
              className="collapse collapse-arrow  border border-primary  rounded-xl shadow-sm"
            >
              <input type="checkbox" />
              <div className="collapse-title text-md font-semibold flex items-center gap-4 text-teal-800">
                <FaQuestionCircle className="text-secondary" />
                {item.question}
              </div>
              <div className="collapse-content flex gap-4 text-teal-700 p-4">
                <FaCheckCircle className="text-teal-500 mt-1" />
                <p className="leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllFaq;
