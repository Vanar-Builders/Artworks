function Logos() {
    const data = [
        {
            image: '/assets/Company logo 5.png',
            text: 'layers'
        },
        {
            image: '/assets/Company logo-1.png',
        },
        {
            image: '/assets/Company logo-2.png',
            text: 'Circooles'
        },
        {
            image: '/assets/Company logo-3.png',
            text: 'Catalog'
        },
        {
            image: '/assets/Company logo-4.png',
            text: 'Quotient'
        },
    ]
    return (
        <div className="bg-[#1E1E1E]">
            <div className="flex justify-center">
                <hr className="bg-gradient-to-br from-white via-lightgray to-black w-[940px]" />
            </div>
            <div className="flex justify-center items-center px-16 py-5 w-full border border-solid border-zinc-300 border-opacity-0 max-md:px-5 max-md:max-w-full">
                <div className="gap-5 justify-center items-center max-w-full w-[940px] max-md:flex-wrap hidden md:flex">
                    {
                        data.map((Item, index) => (
                            <div key={index} className="flex justify-center items-center mx-5">
                                <img
                                    loading="lazy"
                                    src={Item.image}
                                    className="shrink-0 self-stretch my-auto aspect-[auto] w-[auto] h-[30px]"
                                    alt=""
                                />
                                {
                                    Item.text && <p className="text-white text-base ml-1">{Item.text}</p>
                                }
                            </div>
                        ))
                    }
                </div>

                <div className="gap-4 flex-row justify-center items-center max-w-full w-[940px] flex overflow-hidden md:hidden">
                    {
                        data.map((Item, index) => (
                            <div key={index} className="flex justify-center items-center mx-5">
                                <img
                                    loading="lazy"
                                    src={Item.image}
                                    className="shrink-0 self-stretch my-auto aspect-[auto] w-[auto]"
                                    alt=""
                                />
                                <p className="text-white text-base ml-1">{Item.text}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    );
}



export default function HeroSection() {
    return (
        <>
            <div className="bg-[linear-gradient(0deg,#1E1E1E_70%,#282637_100%,#282637_100%)] flex relative flex-col pl-8 w-full md:pl-5 md:max-w-full">
                <img
                    loading="lazy"
                    src='assets/icon.png'
                    className="hidden md:block aspect-[1.05] w-[60px]"
                    alt=""
                />
                <div style={{ zIndex: 20 }} className="self-center md:mt-9 w-full max-w-[1405px] max-md:max-w-full md:pl-24 md:pr-20">
                    <div style={{ zIndex: 2 }} className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full mb-10 md:mb-0">
                            <div className="flex flex-col mt-6 max-md:mt-10 max-md:max-w-full">
                                <div className="flex flex-col max-md:max-w-full">
                                    <div className="flex gap-2 self-start px-4 py-1.5 text-sm leading-6 text-right text-white capitalize border border-violet-500 border-solid backdrop-blur-[5.5px] bg-white bg-opacity-10 rounded-[60px]">
                                        <img
                                            loading="lazy"
                                            src='/assets/NoTextLogo.png'
                                            className="shrink-0 my-auto aspect-[1.27] w-[19px]"
                                            alt=""
                                        />
                                        <div>Discover, Collect, and Showcase Unique Digital Art</div>
                                    </div>
                                    <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                        <div style={{ fontSize: "43px" }} className="font-bold bg-clip-text leading-[62px] max-md:max-w-full text-2xl max-md:leading-[50px] text-white hidden md:block">
                                        Unleash Your Creativity: Join the NFT<br /> <span className="bg-[#7A63FF] rounded-md py-1 px-2"> Art Revolution</span><br />
                                        </div>
                                        <div style={{ fontSize: "30px" }} className="font-bold bg-clip-text leading-[62px] max-md:max-w-full text-md px-2 max-md:leading-[47px] text-white block md:hidden">
                                            Transforming Legal Practices with Custom<br /> <span className="bg-[#7A63FF] rounded-md px-2 py-1">AI Solutions</span><br />
                                        </div>
                                        <div style={{ fontSize: "14px" }} className="mt-4 leading-7 text-gray-200 capitalize max-md:max-w-full">
                                        Step into a world where creativity knows no bounds. Our marketplace empowers artists to share their masterpieces with a global audience, creating vibrant collections and leaving a lasting digital legacy. 
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col-reverse md:flex-row gap-2 px-1 items-center mt-8 max-md:flex-wrap">
                                    <a href="https://app.apollo.io/#/meet/khb-lec-ve6/30-min" className="justify-center py-3.5 my-auto text-base font-medium text-white bg-[linear-gradient(90deg,#7A63FF_3.56%,#9B93E9_106.6%)] rounded-[50px] cursor-pointer w-full md:w-[220px] md:px-10 text-center mt-4 md:mt-0">
                                        Connect Wallet
                                    </a>
                                    <div className="flex gap-3">
                                        <div className="flex flex-col self-start px-3 py-2 rounded-lg border border-violet-500 border-solid bg-white bg-opacity-10 max-md:px-5">
                                            <div className="self-center text-xl font-bold leading-5 bg-clip-text bg-[linear-gradient(90deg,#7A63FF_3.56%,#9B93E9_106.6%)] text-[#7A63FF]">
                                                85%
                                            </div>
                                            <div className="mt-1.5 text-xs font-medium leading-4 text-center text-white capitalize">
                                            Increase in Artist Exposure
                                            </div>
                                        </div>
                                        <div className="flex flex-col self-start px-3 py-2 rounded-lg border border-violet-500 border-solid bg-white bg-opacity-10 max-md:px-5">
                                            <div className="self-center text-xl font-bold leading-5 bg-clip-text bg-[linear-gradient(90deg,#7A63FF_3.56%,#9B93E9_106.6%)] text-[#7A63FF]">
                                                    100+ Hours
                                            </div>
                                            <div className="mt-1.5 text-xs font-medium leading-4 text-center text-white capitalize">
                                            Saved Monthly for Artists (hrs)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ zIndex: 2 }} className="flex flex-col ml-5 w-7/12 max-md:ml-0 max-md:w-full">
                            <div className="flex relative flex-col justify-end grow rounded-3xl max-h-[100%] h-full max-w-[auto]">
                                <img
                                    loading="lazy"
                                    src="/assets/nfts.png"
                                    className="floating-image z-4 object-cover self-center mx-auto absolute inset-0 max-w-[400px] w-full h-[100%] md:h-[auto]"
                                    alt=""
                                />
                                <div className="inset-0 flex justify-center items-center mt-60">
                                    <div className="shrink-0 min-w-[140px] h-[auto]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/104370ddca7a62f15fe302086682fef2a2d9e30450e8f2a2dbc09d6b6f744d98?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/104370ddca7a62f15fe302086682fef2a2d9e30450e8f2a2dbc09d6b6f744d98?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/104370ddca7a62f15fe302086682fef2a2d9e30450e8f2a2dbc09d6b6f744d98?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/104370ddca7a62f15fe302086682fef2a2d9e30450e8f2a2dbc09d6b6f744d98?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/104370ddca7a62f15fe302086682fef2a2d9e30450e8f2a2dbc09d6b6f744d98?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/104370ddca7a62f15fe302086682fef2a2d9e30450e8f2a2dbc09d6b6f744d98?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/104370ddca7a62f15fe302086682fef2a2d9e30450e8f2a2dbc09d6b6f744d98?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/104370ddca7a62f15fe302086682fef2a2d9e30450e8f2a2dbc09d6b6f744d98?apiKey=cf358c329e0d49a792d02d32277323ef&"
                    className="self-end aspect-[0.97] w-[92px] hidden md:block"
                />
            </div>
            <Logos />
        </>
    );
}