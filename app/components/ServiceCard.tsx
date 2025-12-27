"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { DashboardItem } from "../lib/types";
import { SmartIcon } from "./SmartIcon";
import WIDGET_REGISTRY from "./widgets";

export const ServiceCard = ({ item }: { item: DashboardItem }) => {
	return (
		<motion.a
			href={item.url}
			target="_blank"
			rel="noopener noreferrer"
			whileHover={{ y: -4, scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className="group relative flex flex-col p-5 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
		>
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
						<SmartIcon icon={item.icon} alt={item.name} />
					</div>
					<div>
						<h3 className="font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
							{item.name}
						</h3>
						<span className="text-xs text-slate-500 font-mono truncate max-w-37.5 block">
							{new URL(item.url).hostname}
						</span>
					</div>
				</div>

				<ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
			</div>

			{/* Extensible Widget Area */}
			{item.widgetData &&
				Object.entries(item.widgetData).map(([widgetName, meta]) => {
					const WidgetComponent = WIDGET_REGISTRY[widgetName];
					if (!WidgetComponent) return null;
					return <WidgetComponent key={widgetName} meta={meta} />;
				})}
		</motion.a>
	);
};
