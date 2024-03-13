import Image from "next/image";

export default function Page() {
    return <section className="self-center z-20 px-5 w-full lg:px-0 lg:w-1/2 xl:w-2/4">
        <article className="-mt-20 border-2 rounded-sm border-zinc-700 shadow-lg shadow-zinc-800 bg-zinc-950/20 mb-12 h-40 flex">
            <Image 
                className="h-60 -mt-7 -ml-6"
                draggable={ false }
                src="/images/safebox.png"
                alt="safebox"
                height={ 60 }
                width={ 260 }
            />

            <div className="self-center gap-2 flex flex-col">
                <h3 className="text-2xl poppins">
                    Capital
                </h3>

                <p 
                    className="text-4xl poppins text-green-500"
                    style={{
                        textShadow: '0 0 10px #2D7A4C'
                    }}
                >
                    300.000$
                </p>
            </div>
        </article>

        <section>
            Content...
        </section>
    </section>
}