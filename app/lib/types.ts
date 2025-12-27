export interface DashboardItem {
	name: string;
	url: string;
	icon?: string;
	groups?: string[];
	category: string;
	widgetData?: {
		[widgetName: string]: {
			[property: string]: string | number | boolean;
		};
	};
}

export interface ApiResponse {
	items: DashboardItem[];
}

export const groupByCategory = (items: DashboardItem[]) => {
	return items.reduce(
		(acc, item) => {
			const cat = item.category || "Uncategorized";
			if (!acc[cat]) acc[cat] = [];
			acc[cat].push(item);
			return acc;
		},
		{} as Record<string, DashboardItem[]>,
	);
};
