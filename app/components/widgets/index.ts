import JellyfinWidget from "./jellyfin";

// biome-ignore lint/suspicious/noExplicitAny: no-explicit-any
const WIDGET_REGISTRY: Record<string, React.ComponentType<any>> = {
	jellyfin: JellyfinWidget,
};

export default WIDGET_REGISTRY;
