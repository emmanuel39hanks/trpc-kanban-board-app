import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";


export default function Home() {


  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Manage tasks with ease
              </h1>
              <p className="text-xl mb-8">
                LemoBoards helps you organize, track, and manage your tasks
                efficiently.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-100"
              >
                Get started for free
              </Button>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why choose LemoBoards?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
                <p>Intuitive interface that anyone can master quickly.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Flexible</h3>
                <p>
                  Adapt your boards to various project types and personal needs.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Customizable</h3>
                <p>Tailor your boards to fit your unique workflow.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
    </div>
  );
}