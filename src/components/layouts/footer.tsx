import Image from "next/image";

export default function Footer() {
    return <footer className="text-white relative"> 
        <Image 
            src="/images/footer-character.png"
            alt="Character image"
            className="absolute bottom-0 -right-24 -z-10 object-cover hidden xl:block"
            width={650}
            height={650}
        />

        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <h2 className="text-3xl poppins">
                    { process.env.APP_NAME }
                </h2>

                <p className="flex gap-2 items-center poppins"
                    style={{
                        textShadow: '0 0 3px rgba(0, 0, 0, 1)'
                    }}
                >
                    <a href="https://xaviermorell.es" className="cursor-pointer text-white-500 hover:opacity-40" target="_blank">Xavier Morell</a>
                    
                    &copy; { new Date().getFullYear() }
                </p>
            </div>

            <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-white sm:text-center">© { new Date().getFullYear() } <a href="https://xaviermorell.es/" className="hover:underline">{ process.env.APP_NAME }</a>. Todos los derechos reservados.</span>
        </div> 
    </footer>
}