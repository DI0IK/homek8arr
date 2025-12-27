const JellyfinWidget = ({ meta }: { meta?: any }) => {
	if (!meta?.movieCount) return null;
	return (
		<div className="mt-2 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md inline-block">
			{meta.movieCount} Movies Available
		</div>
	);
};

export default JellyfinWidget;