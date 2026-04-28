export default function Cards({
    totalJobs = 0,
    averageSalary = 0,
    recommendedSkills = [],
    country = "Selected Country",
    skill = "skill",
}) {
    const formattedSalary = Number(averageSalary || 0).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white">
                <p className="text-sm text-zinc-400">Total Jobs</p>
                <h2 className="mt-2 text-3xl font-semibold">{totalJobs.toLocaleString()}</h2>
                <p className="mt-2 text-zinc-300 text-sm">
                    Open roles for <span className="font-medium capitalize">{skill}</span> in{" "}
                    <span className="font-medium">{country}</span>.
                </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white">
                <p className="text-sm text-zinc-400">Average Salary</p>
                <h2 className="mt-2 text-3xl font-semibold">{formattedSalary}</h2>
                <p className="mt-2 text-zinc-300 text-sm">Calculated from jobs with salary ranges.</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white">
                <p className="text-sm text-zinc-400">Skills To Learn Next</p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {recommendedSkills.length ? (
                        recommendedSkills.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-zinc-100"
                            >
                                {item}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-zinc-300">Not enough data yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}