import * as lucide from "lucide-react";
import Image from "next/image";
import type React from "react";

export const SmartIcon = ({ icon, alt }: { icon?: string; alt: string }) => {
	if (!icon) return <lucide.Globe className="w-8 h-8 text-slate-400" />;

	// 1. Check if it's a URL
	if (icon.startsWith("http") || icon.startsWith("/")) {
		return (
			<div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-800">
				<Image src={icon} alt={alt} fill className="object-cover" />
			</div>
		);
	}

	// 2. Check if it's a mapped icon name
	const icons = lucide as unknown as Record<
		string,
		React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined
	>;
	const IconComponent = icons[icon] ?? lucide.Globe;
	return <IconComponent className="w-8 h-8 text-indigo-400" />;
};
