import React from "react";
import { useNavigate } from "react-router-dom";

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-10">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          About iSpeak GhSL App
        </h1>

        <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
          <strong>iSpeak GhSL</strong> is a mobile-first web application designed to bridge the communication gap
          between hearing individuals and the Ghanaian Deaf community by translating text into Ghanaian Sign Language (GhSL).
          The platform offers users an interactive experience, enabling them to input text and view corresponding
          GhSL sign animations for individual words, letters, and simple phrases.
        </p>

        <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
          In the medical context, the app also supports signs for common medical terms. This is powered by the
          <strong> SignTalk-GSL: Ghanaian Medical Sign Language</strong> dataset, which we sourced from Kaggle. This dataset was
          made publicly available by the Responsible AI Lab and helps improve communication between healthcare professionals and Deaf patients in Ghana.
          You can access the dataset here:{" "}
          <a
            href="https://www.kaggle.com/datasets/responsibleailab/signtalk-ghana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            SignTalk-GSL on Kaggle
          </a>.
        </p>

        <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
          iSpeak GhSL aims to promote inclusion and equity in communication by supporting those who rely on sign
          language to interact with the world. Whether for everyday use or specialized contexts like healthcare,
          iSpeak GhSL is your bridge to effective and respectful communication with members of the Deaf community in Ghana.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default About;
