import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceAnalysis = ({ image }) => {
    const canvasRef = useRef(null);
    const [ratios, setRatios] = useState(null);

    useEffect(() => {
        if (!image) return;

        const analyzeFace = async () => {
            await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

            const img = await faceapi.bufferToImage(image);
            const canvas = canvasRef.current;
            const displaySize = { width: img.width, height: img.height };
            faceapi.matchDimensions(canvas, displaySize);

            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks();
            if (!detections) return alert("No face detected. Try another image.");

            const landmarks = detections.landmarks;
            const points = landmarks.positions;

            // Get key distances
            const faceLength = points[8].y - points[27].y;
            const faceWidth = points[16].x - points[0].x;
            const eyeDistance = points[45].x - points[36].x;
            const noseWidth = points[35].x - points[31].x;
            const lipWidth = points[54].x - points[48].x;

            // Calculate ratios
            const goldenRatios = {
                "Face Length / Face Width": (faceLength / faceWidth).toFixed(3),
                "Face Width / Eye Distance": (faceWidth / eyeDistance).toFixed(3),
                "Nose Width / Lip Width": (noseWidth / lipWidth).toFixed(3),
            };

            setRatios(goldenRatios);
        };

        analyzeFace();
    }, [image]);

    return (
        <div className="results">
            {ratios ? (
                <div>
                    <h3>Golden Ratio Analysis</h3>
                    {Object.entries(ratios).map(([key, value]) => (
                        <p key={key}>{key}: {value} (Ideal: 1.618)</p>
                    ))}
                </div>
            ) : (
                <p>Upload an image to analyze.</p>
            )}
            <canvas ref={canvasRef} />
        </div>
    );
};

export default FaceAnalysis;
