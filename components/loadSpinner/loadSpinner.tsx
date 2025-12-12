function Spinner() {
    return (
        <div className="w-full h-full bg-[#00000050] flex items-center justify-center">
            <div className="w-fit h-fit flex items-center justify-center gap-4 bg-white px-6 py-4 rounded-lg">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-black">Loading...</p>
            </div>
        </div>
    );
}

export default Spinner;
