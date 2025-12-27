"use client";
import { type ApiResponse, groupByCategory } from "./lib/types";
import { ServiceCard } from "./components/ServiceCard";
import React from "react";

export default function DashboardPage() {
	const [data, setData] = React.useState<ApiResponse>({ items: [] });

	React.useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/apps");
			const json: ApiResponse = await res.json();
			setData(json);
		};
		fetchData();
	}, []);
	const grouped = groupByCategory(data.items);
	const categories = Object.keys(grouped).sort();

	return (
		<main className="min-h-screen bg-[#0B1120] text-slate-200 p-6 md:p-12 selection:bg-indigo-500/30">
			<div className="max-w-7xl mx-auto space-y-12">
				<header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
					<div className="space-y-2">
						<h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
							Homek8arr
						</h1>
					</div>
				</header>

				<div className="space-y-10">
					{categories.map((category) => (
						<section key={category} className="space-y-4">
							<h2 className="text-xl font-semibold text-slate-300 flex items-center gap-2">
								<span className="w-2 h-8 rounded-full bg-indigo-500/50 block"></span>
								{category}
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								{grouped[category].map((item) => (
									<ServiceCard key={item.name} item={item} />
								))}
							</div>
						</section>
					))}
				</div>
			</div>
		</main>
	);
}
