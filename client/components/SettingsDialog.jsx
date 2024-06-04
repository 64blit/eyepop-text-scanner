import ModelSelector from "./ModelSelector";
import React, { useEffect, useState } from "react";

const SettingsDialog = React.forwardRef((props, ref) =>
{
    const [ popId, setPopId ] = useState("1b69350bd8934d02971028a07b4b11ba");
    const [ popSecret, setPopSecret ] = useState("AAFIJnxPs5Sp97JK1xrmfBmCZ0FBQUFBQm1YNkVOWV9aSVN2V3JUaEdnanRWSnZxT2tQU095MXZ3aUM4MjE3cUM2SGoxUnZTeUZaVU9LNGNqUlhPcThORHMxWEtxVnFnRXlvZG5mbUdwWHdxM0N3RW1yamlTVkp0Ti10WWtBN3gwQVFjelRsdGM9");

    useEffect(() =>
    {
        if (!popId || !popSecret) return;

        props.setPopUUID(popId);
        props.setPopSecret(popSecret);
    }, [ popId, popSecret ]);

    return (
        <dialog id="my_modal_2" ref={ref} className="modal">
            <div className="modal-box bg-gray-800 text-white flex flex-col w-7/12 max-w-5xl justify-center justify-items-center align-middle items-center ">
                {props.showModelSelector && <ModelSelector className={`h-full text-4xl`} setModel={props.setModel} />}

                <button className="btn btn-primary text-4xl m-5"
                    onClick={() =>
                    {
                        window.open('https://dashboard.eyepop.ai', '_blank')
                    }
                    }>
                    <div className="text-4xl text-white">Visit EyePop.ai</div>
                </button>

                <div className="flex flex-col w-full gap-5">

                    <label htmlFor="popUuid" className="text-white text-4xl m-2">Pop UUID:</label>
                    <input type="text" id="popUuid" name="popUuid" className="input-field input bg-gray-950 text-white"
                        onChange={(e) => { setPopId(e.target.value) }} placeholder={popId} />
                    <label htmlFor="popSecret" className="text-white text-4xl m-2">Pop Secret:</label>
                    <input type="text" id="popSecret" name="popSecret" className="input-field input bg-gray-950 text-white"
                        onChange={(e) => { setPopSecret(e.target.value) }} placeholder={popSecret} />

                    {
                        popId &&
                        popSecret &&
                        <button className="btn btn-primary text-4xl" onClick={() => { props.setPopUUID(popId); props.setPopSecret(popSecret); }}>
                            Save
                        </button>
                    }
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
});

export default SettingsDialog;
