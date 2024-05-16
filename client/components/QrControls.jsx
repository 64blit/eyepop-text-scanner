import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';

const QrControls = ({ className, loading, popNameRef, handleWebcamChange, startButtonRef, onStart }) =>
{
    const [ webcamDevices, setWebcamDevices ] = useState([]);

    const cameraModalRef = useRef();

    useEffect(() =>
    {
        if (webcamDevices.length > 0) return;
        if (!loading) return;

        populateWebcamDevices();

    }, [ loading ]);

    const populateWebcamDevices = async () =>
    {
        // A hack to get the webcam devices listed if they do not appear
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) =>
        {
            stream.getTracks().forEach((track) =>
            {
                track.stop();
            });
        });

        const devices = await navigator.mediaDevices.enumerateDevices();

        const webcamDevices = devices.filter(device => device.kind === 'videoinput');
        setWebcamDevices(webcamDevices);
    }

    return (

        <div className={` bg-blue-400 flex h-full justify-center items-center rounded-3xl shadow-2xl p-5`}>


            <button
                ref={null}
                onClick={() =>
                {
                    if (!cameraModalRef.current)
                    {
                        return;
                    }

                    cameraModalRef.current.showModal();
                }}
                className={`${loading && 'hidden'}  bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded-3xl h-10 m-5 min-w-32 w-44 self-center hover:scale-125 transition-all`} >

                <FontAwesomeIcon
                    icon={faCamera}
                    className='text-blue-700'
                />

            </button>

            <dialog id="my_modal_1" ref={cameraModalRef} className="modal">
                <div className="modal-box text-white flex flex-col w-7/12 max-w-5xl justify-center justify-items-center align-middle items-center" >
                    <canvas id="qrCodeEyePop" className='object-contain' width={256} height={256} />

                    <p className="py-4 text-white">Scan with device on same network.</p>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


        </div>


    );
}

export default QrControls;
