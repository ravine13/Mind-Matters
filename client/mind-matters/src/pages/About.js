import React from 'react';
import { Card } from 'flowbite-react';
import image1 from '../assest/images/friends.jpg';  
import image2 from '../assest/images/image2.jpg';   
import image3 from '../assest/images/image3.jpg';   

const About = () => {
  const missionValues = [
    {
      title: "Our Mission",
      content: "To provide a platform that supports mental well-being by offering resources, counseling, and a supportive community.",
    },
    {
      title: "Our Values",
      content: "Empathy, Integrity, and Confidentiality guide everything we do at Mind Matters.",
    },
    {
      title: "Our Vision",
      content: "To be the leading online resource for mental health, fostering a world where mental well-being is accessible to all.",
    },
  ];

  const quotes = [
    {
      img: image1,
      quote: "The greatest weapon against stress is our ability to choose one thought over another.",
      author: "William James",
    },
    {
      img: image2, 
      quote: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
      author: "Noam Shpancer",
    },
    {
      img: image3,
      quote: "You are not your illness. You have an individual story to tell. Staying yourself is part of the battle.",
      author: "Julian Seifter",
    },
  ];
  return (
    <div className="bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {missionValues.map((item, index) => (
          <Card key={index} className="p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            <p className="text-gray-600">{item.content}</p>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {quotes.map((quote, index) => (
          <Card key={index} className="p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <img
              src={quote.img}
              alt={`Quote ${index + 1}`}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <p className="text-xl italic mb-4">"{quote.quote}"</p>
            <p className="text-gray-600 font-bold">- {quote.author}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default About;