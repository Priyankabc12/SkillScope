export default function SearchBar(){
    return(
        <div className="flex flex-col items-center justify-center gap-4 py-8 px-4 text-white">
            <h1 className="text-3xl font-semibold">Search for a job</h1>

            <div className="flex flex-col md:flex-row gap-3 w-full max-w-3xl">
                <input
                    type="text"
                    className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-zinc-500"
                    placeholder="Enter a skill"
                />

                <select className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-zinc-500">
                    <option value="us">United States</option>
                    <option value="in">India</option>
                    <option value="gb">United Kingdom</option>
                    <option value="ca">Canada</option>
                    <option value="au">Australia</option>
                </select>

                <button className="rounded-xl bg-white text-black px-5 py-3 font-medium hover:bg-zinc-200 transition-colors">
                    Search
                </button>
            </div>
        </div>
    )
}