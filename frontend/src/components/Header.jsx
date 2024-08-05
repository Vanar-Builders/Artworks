import { useDispatch } from "react-redux";
import { changeAddress } from "../features/authentication";
export default function Header({ show }) {
    const dispatch = useDispatch();
    function ConnectWallet(){
        if(window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'}).then((res) => {
                dispatch(changeAddress(res[0]))
            })
        }else{
            alert('Install MetaMask')
        }
    }
    return (
        <div style={{ zIndex: 20 }} className={`flex relative justify-start md:justify-center items-start md:items-center md:px-16 py-4 w-full border-b border-solid backdrop-blur-[2px] bg-[linear-gradient(180deg,#1E1E1E_20%,#282637_96.5%,#282637_100%)] z-4 border-gray-200 border-opacity-10 max-md:px-5 max-md:max-w-full md:pl-24 md:pr-20 ${show && 'h-screen overflow-hidden'} md:h-auto md:overflow-auto`}>
            <div className="mt-3 flex gap-5 justify-between w-full max-w-[1200px] max-md:flex-wrap max-md:max-w-full">
                <a href="/" className="flex justify-center items-center my-auto">
                    <img
                        loading="lazy"
                        src='assets/Logo.png'
                        className="aspect-[5] w-[40px] h-[40px]"
                        alt=""
                    />
                </a>
                <div className="flex gap-5 justify-between items-center text-base text-right max-md:flex-wrap max-md:max-w-full">
                    <div>
                        <h1 className="text-white font-semibold leading-10">Create</h1>
                    </div>
                    <div className="flex gap-2.5 font-medium text-white">
                        <div onClick={ConnectWallet} style={{background: 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)'}} className="justify-center px-8 py-3.5 rounded-[50px] max-md:px-5 cursor-pointer">
                            Connect Wallet
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}