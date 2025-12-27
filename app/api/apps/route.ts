import * as k8s from "@kubernetes/client-node";
import { type NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/app/lib/types";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

const group = "traefik.io";
const version = "v1alpha1";
const plural = "ingressroutes";

export async function GET(req: NextRequest): Promise<NextResponse> {
	const objects = await k8sApi.listClusterCustomObject({
		group,
		version,
		plural,
	});

	console.log("Headers:", req.headers);

	const AuthentikGroupsHeader =
		req.headers.get(process.env.PROXY_GROUPS_HEADER || "X-authentik-groups") ||
		"";
	const userGroups = AuthentikGroupsHeader.split(",")
		.map((g) => g.trim())
		.filter((g) => g.length > 0);

	type K8sItem = {
		metadata?: {
			annotations?: Record<string, string>;
		};
		[key: string]: unknown;
	};
	const body = objects as { items?: K8sItem[] };

	const filteredItems = (body.items ?? []).filter(
		(item) =>
			item.metadata?.annotations?.["homek8arr.dominikstahl.dev/disabled"] !==
				"true" &&
			item.metadata?.annotations?.["homek8arr.dominikstahl.dev/name"] &&
			item.metadata?.annotations?.["homek8arr.dominikstahl.dev/url"],
	);

	const response: ApiResponse = {
		items: filteredItems
			.map((item) => {
				const name =
					item.metadata?.annotations?.["homek8arr.dominikstahl.dev/name"];
				const url =
					item.metadata?.annotations?.["homek8arr.dominikstahl.dev/url"];
				const icon =
					item.metadata?.annotations?.["homek8arr.dominikstahl.dev/icon"];
				const groups =
					item.metadata?.annotations?.["homek8arr.dominikstahl.dev/group"];
				const category =
					item.metadata?.annotations?.["homek8arr.dominikstahl.dev/category"];

				return {
					name: name as string,
					url: url as string,
					icon,
					groups: groups ? groups.split(";").map((g) => g.trim()) : undefined,
					category: category ? (category as string) : "Other",
				};
			})
			.filter((item) => {
				if (!item.groups || item.groups.length === 0) {
					return true;
				}
				return item.groups.some((group) => userGroups.includes(group));
			}),
	};

	return NextResponse.json(response, {
		status: 200,
	});
}
