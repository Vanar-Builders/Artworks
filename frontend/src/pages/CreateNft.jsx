
export const CreateNFTS = () => {
    return (
        <div className="bg-[linear-gradient(0deg,#1E1E1E_70%,#282637_100%,#282637_100%)] pb-20">
            <div className="md:mx-10 md:pt-7">
                <h1 className="text-5xl font-bold text-white font-sans">Choose Type</h1>
                <div className="flex w-full gap-10 mt-10">
                    <div className="flex-1 bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] shadow-2xl rounded-2xl h-[320px] w-full flex flex-col justify-center items-center cursor-pointer hover:opacity-65">
                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="88" viewBox="0 0 60 60" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 0C1.79086 0 0 1.79086 0 4V56C0 58.2091 1.79086 60 4 60H56C58.2091 60 60 58.2091 60 56V4C60 1.79086 58.2091 0 56 0H4ZM26.8799 37.5468C26.7369 37.7119 26.5988 37.8698 26.4582 38.0253L19.7507 45.4531C18.9342 46.3549 18.7269 47.3668 19.2426 48.4625C20.1133 50.3116 22.5062 50.5341 23.9789 48.905C29.2302 43.0936 34.4788 37.2781 39.7251 31.4587L41.1263 29.9133L42.8853 31.6221C44.3027 32.9992 45.7008 34.3574 47.1012 35.712C48.3495 36.9201 50.0293 36.9918 51.1741 35.8986C52.3188 34.8054 52.2767 33.1667 51.0284 31.9515C48.3773 29.3679 45.7188 26.7907 43.0529 24.2199C41.7185 22.9329 40.0089 23.0022 38.7705 24.3753C36.5783 26.8042 34.386 29.2347 32.1937 31.6668C31.8009 32.1026 31.4041 32.5344 31.0002 32.974L30.573 33.4394L23.9592 27.0283C22.4963 25.6145 20.9694 25.6121 19.5188 27.0283L9.03694 37.1928C8.86488 37.3507 8.7066 37.5219 8.56333 37.7047C8.24924 38.0925 8.05724 38.5601 8.01096 39.0512C7.96468 39.5422 8.06561 40.0358 8.30192 40.4725C8.50967 40.9237 8.84962 41.3059 9.27941 41.5716C9.7092 41.8374 10.2099 41.9751 10.7194 41.9676C11.6174 41.9963 12.318 41.6016 12.9395 40.9988C15.6975 38.3099 18.4613 35.6283 21.2308 32.9538C21.354 32.836 21.4817 32.7223 21.606 32.6116L21.7241 32.5065L26.8799 37.5468ZM11.6277 18.2564C12.2227 19.1392 13.0739 19.8314 14.0741 20.2455C15.0742 20.6596 16.1787 20.777 17.2475 20.583C18.3166 20.389 19.3022 19.8922 20.0803 19.1554C20.8584 18.4186 21.394 17.4747 21.6193 16.443C21.8448 15.4113 21.7497 14.3379 21.3465 13.3585C20.9433 12.379 20.2499 11.5373 19.3539 10.9397C18.4579 10.3421 17.3992 10.0153 16.3119 10.0006C15.5874 9.99015 14.8682 10.1189 14.1954 10.3793C13.5227 10.6397 12.9097 11.0267 12.3918 11.5179C11.8742 12.0092 11.4616 12.5949 11.1785 13.2415C10.8952 13.888 10.7467 14.5825 10.7416 15.285H10.7317C10.7211 16.3395 11.0328 17.3735 11.6277 18.2564Z" fill="#727273"></path></svg>
                        <div className="text-xl mt-3 text-white">Single</div>
                    </div>
                    <div className="flex-1 bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] h-[320px] w-full flex flex-col justify-center items-center cursor-pointer hover:opacity-65">
                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="88" viewBox="0 0 60 60" fill="none"><path d="M34.9991 19.9577C34.9991 14.2811 34.9991 8.60445 34.9991 2.92785C34.9991 0.945409 35.9384 0 37.9147 0C44.3206 0 50.7258 0 57.1303 0C59.0358 0 60 0.970396 60 2.89036V37.1062C60 39.0178 59.0275 39.9965 57.1261 39.9965H37.8231C35.9738 39.9965 34.995 39.0053 34.9929 37.1416C34.9971 31.4136 34.9991 25.6856 34.9991 19.9577Z" fill="#727273"></path><path d="M30.001 43.7511C30.001 48.2032 30.001 52.6554 30.001 57.1076C30.001 59.0192 29.0285 59.9979 27.1292 60C19.0323 60 10.9354 60 2.8385 60C0.989205 60 0.00833034 59.0109 0.00833034 57.1492C0.00833034 48.2185 0.00833034 39.2871 0.00833034 30.3551C0.00833034 28.4809 0.97671 27.5063 2.8385 27.5043H27.2042C29.0035 27.5043 29.9948 28.5038 29.9969 30.3155C29.9997 34.7899 30.001 39.2684 30.001 43.7511Z" fill="#727273"></path><path d="M14.9589 22.4982C10.9229 22.4982 6.88765 22.4982 2.85308 22.4982C0.978792 22.4982 0 21.5215 0 19.6703C0 14.0464 0 8.42398 0 2.8029C0 0.989138 0.987123 0.0104137 2.80934 0.00833135C10.9312 0.00833135 19.0531 0.00833135 27.175 0.00833135C28.9827 0.00833135 29.9885 1.00372 29.9906 2.79666C29.9906 8.44827 29.9906 14.0992 29.9906 19.7494C29.9906 21.4924 28.9723 22.5023 27.2209 22.5044C23.1349 22.5086 19.0476 22.5065 14.9589 22.4982Z" fill="#727273"></path><path d="M47.4694 45.0005C50.6973 45.0005 53.9252 45.0005 57.1532 45.0005C59.0066 45.0005 59.9854 45.9855 59.9875 47.8492C59.9875 50.9728 59.9875 54.0964 59.9875 57.22C59.9875 58.9755 58.9775 59.9917 57.2365 59.9937C50.7265 59.9937 44.2178 59.9937 37.7106 59.9937C36.0175 59.9937 35.0033 58.963 35.0033 57.2617C35.0033 54.0839 35.0033 50.9069 35.0033 47.7305C35.0033 46.0146 36.0092 45.0026 37.7106 44.9984C40.9607 44.9915 44.2137 44.9922 47.4694 45.0005Z" fill="#727273"></path></svg>
                        <div className="text-xl mt-3 text-white">Single</div>
                    </div>
                </div>
            </div>
        </div>
    )
}