import { useState, useEffect } from 'react';
import './App.css';
import { LiaQuoteLeftSolid, LiaQuoteRightSolid } from "react-icons/lia";
import { GrPowerCycle } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const apiUrl = "https://api.api-ninjas.com/v1/quotes";
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchQuote = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      });
      const data = await response.json();
      if (data && data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote("Could not fetch a quote. Please try again.");
      setAuthor("");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <>
      <div className="relative flex flex-col justify-center items-center h-screen bg-[#101230] text-[#FAFAFA] px-4 md:px-8">
        
        <div className="absolute top-4 left-4 pb-16 md:pb-20">
          <LiaQuoteLeftSolid size={88} />
        </div>

        <div id="quote-box" className="flex flex-col items-center max-w-[90%] md:max-w-[800px] text-center space-y-6">
          <p id="text" className="text-2xl md:text-4xl font-thin">{quote}</p>
          <p id="author" className="text-xl md:text-2xl font-extralight text-[#E30B5C]">{author}</p>
          <button
            id="new-quote"
            onClick={fetchQuote}
            className="mt-4 px-6 py-2 bg-[#fffefd] text-black rounded-full transition-transform duration-500 transform hover:scale-110 shadow-lg inline-flex items-center font-bold"
          >
            <div className="pr-3">
              <GrPowerCycle color="#E30B5C" size={24} />
            </div>
            New Quote
          </button>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 text-[#FAFAFA] hover:scale-110 transition-transform duration-500"
          >
            <FaXTwitter size={44} />
          </a>
        </div>

        
        <div className="absolute bottom-4 right-4">
          <LiaQuoteRightSolid size={88} color="#E30B5C" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-[#fafafa] font-extralight text-sm md:text-base opacity-80 animate-fade-in">
        Made by <span className="text-[#E30B5C] font-semibold">AaronJE45</span>
      </div>
    </>
  );
}

export default App;
