import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import FaceAnalysis from "./components/FaceAnalysis";

const App = () => {
    const [image, setImage] = useState(null);

    return (
        <div className="app">
            <h1>Golden Ratio Face Analysis</h1>
            <ImageUpload onImageUpload={setImage} />
            {image && <FaceAnalysis image={image} />}
        </div>
    );
};

export default App;
