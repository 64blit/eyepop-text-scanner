import React, { useEffect, useRef, useState } from "react";

export const ResultsModal = ({ searchTerm, resultModalRef, croppedImage, maskRect }) => 
{

    const canvasRef = useRef(null);

    useEffect(() =>
    {
        if (!croppedImage) return;
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');

        console.log('maskRect:', maskRect);

        // the croppedImage is from getImageData of a canvas, so we need to set the canvas width and height to the maskRect
        canvasRef.current.width = maskRect.width;
        canvasRef.current.height = maskRect.height;

        ctx.putImageData(croppedImage, 0, 0);


    }, [ croppedImage, canvasRef ]);


    return (
        <>
            <dialog ref={resultModalRef} id="results_modal" className="modal">
                <div className="modal-box w-11/12 h-11/12 min-w-8xl flex flex-col justify-center ">

                    <div className="flex gap-2 ">
                        <h1 className="text-white text-4xl"> Detected: </h1>
                        <h2 className="text-blue-500 text-4xl"> {searchTerm}</h2>
                    </div>

                    <canvas ref={canvasRef} className="w-full h-full" id="resultCanvas"></canvas>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}
