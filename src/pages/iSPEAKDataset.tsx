import React, { useState } from "react";
import MainLayout from "@/components/ui/MainLayout";

const letters = "ABCDEFGHIKLMNOPQRSTUVWXY".split("");
const numbers = Array.from({ length: 9 }, (_, i) => (i + 1).toString());

const ISpeak = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (item: string) => {
    setSelectedImage(`/iSPEAKDataset/${item}.jpg`);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <MainLayout>
      <div className="p-6 relative">
        <h1 className="text-2xl font-bold mb-4 text-red-600">iSpeak GSL Signs</h1>
        <p className="text-gray-600 mb-6">
          Click on an image to see how to sign each letter and number.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...letters, ...numbers].map((item) => (
            <div
              key={item}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleImageClick(item)}
            >
              <img
                src={`/iSPEAKDataset/${item}.jpg`}
                alt={`Sign for ${item}`}
                className="w-24 h-24 object-cover rounded shadow-md"
              />
              <p className="mt-2 text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <img
                src={selectedImage}
                alt="Zoomed sign"
                className="w-[80vw] max-w-[500px] h-auto rounded"
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ISpeak;
