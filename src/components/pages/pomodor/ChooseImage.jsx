import React, { useEffect, useState } from 'react';

export default function ChooseImage() {
    const defaultBackgrounds = [ 
        "/white-bg-2.jpg",
        "/white-bg-1.jpg",
		"/bg.png",
		"/bg2.png",
		"/bg3.png",
		"/bg4.png",
		"/bg6.png",
		"/bg8.png",
		"/bg9.png",
		"/bg10.png",
	 ];

    // const [selectedBg, setSelectedBg] = useState(defaultBackgrounds[0]);
    // const [customBg, setCustomBg] = useState(null);

    // useEffect(() => {
    //     const ele = document.querySelector('.bg-container');
    //     if (ele) {
    //         ele.src = customBg || selectedBg
    //     }
    // }, [selectedBg, customBg]);

    return (
        <div>
            <h3  className=' mb-4 font-semibold text-primary '>🖼️ Background Image</h3>
            <div className='space-y-4'>
                {/* Default backgrounds */}
                {/* <div className='flex items-center justify-center flex-wrap gap-1 '>
                    {defaultBackgrounds.map(bg => (
                        <img
                            key={bg}
                            src={bg}
                            onClick={() => {
                                setSelectedBg(bg);
                                setCustomBg(null); // clear custom
                            }}
                            className={` hover:scale-90 duration-500 rounded-lg w-[80px] h-[70px] object-cover cursor-pointer border-2 ${selectedBg === bg && !customBg ? 'border-primary' : 'border-transparent'}`}
                        />
                    ))}
                </div> */}

                {/* Upload custom background */}
                {/* <div className='flex items-center gap-3 mt-2'>
                    <Label>Upload custom image</Label>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setCustomBg(reader.result);
                                    setSelectedBg(null); // clear default
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                </div> */}
            </div>
        </div>
    );
}
