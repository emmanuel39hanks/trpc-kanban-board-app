import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Mic,
  Music2,
  Clock,
  CheckCircle,
  Zap,
  Layout,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <Mic className="h-8 w-8 text-blue-500" />,
      title: "AI Voice Task Creation",
      description:
        "Add tasks using voice commands with OpenAI's Whisper integration.",
    },
    {
      icon: <Music2 className="h-8 w-8 text-purple-500" />,
      title: "Background Music",
      description: "Enjoy lofi music while working on your tasks.",
    },
    {
      icon: <Clock className="h-8 w-8 text-green-500" />,
      title: "Timed Tasks",
      description:
        "Set custom time limits for tasks with Pomodoro-style timer.",
    },
  ];

  const benefits = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: "Easy to Use",
      description: "Intuitive interface that anyone can master quickly.",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Flexible",
      description:
        "Adapt your boards to various project types and personal needs.",
    },
    {
      icon: <Layout className="h-6 w-6 text-blue-500" />,
      title: "Customizable",
      description: "Tailor your boards to fit your unique workflow.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Manage tasks with ease and focus
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                LemoBoards helps you organize, track, and manage your tasks
                efficiently with AI-powered features and focus-enhancing tools.
              </p>
              <Link href="/api/auth/login">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  Get started for free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Powerful Features to Boost Your Productivity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Why choose LemoBoards?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">
              Ready to boost your productivity?
            </h2>
            <Link href="/api/auth/login">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                Sign up now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
