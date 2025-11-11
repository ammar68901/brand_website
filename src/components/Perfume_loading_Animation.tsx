
const Perfume_loading_Animation = () => {

    return (
        <>
            <div className="flex justify-center items-center min-h-[500px]">
                <div className="w-full">
                    <div className="flex flex-col items-center gap-6">
                        <svg
                            className="animate-spin h-12 w-12 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>

                        <p className="text-gray-500">Loading perfumes...</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="animate-pulse space-y-3">
                                    <div className="aspect-[4/5] w-full rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                                    <div className="h-3 w-3/4 rounded bg-gray-200" />
                                    <div className="h-3 w-1/2 rounded bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )



};

export default Perfume_loading_Animation;


const ProductAnimationLoading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-zinc-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
        </div>
      </div>

    )
}

export {ProductAnimationLoading};