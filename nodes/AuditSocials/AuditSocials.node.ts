import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class AuditSocials implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AuditSocials',
		name: 'auditSocials',
		icon: 'file:auditsocials.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Check ad or social content against live platform advertising policy across 8 platforms before it publishes',
		defaults: { name: 'AuditSocials' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'auditSocialsApi', required: true }],
		requestDefaults: {
			baseURL: 'https://www.auditsocials.com',
			headers: { 'Content-Type': 'application/json' },
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Check Content Compliance',
						value: 'check',
						action: 'Check content against platform policy',
						description:
							'Return structured policy-risk flags (severity, confidence, matched text, fix suggestion) for a piece of content',
						routing: {
							request: {
								method: 'POST',
								url: '/api/v1/compliance-check',
							},
						},
					},
				],
				default: 'check',
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: { rows: 4 },
				default: '',
				required: true,
				description: 'The ad or social copy to screen for policy risk',
				routing: { request: { body: { content: '={{$value}}' } } },
			},
			{
				displayName: 'Platforms',
				name: 'platforms',
				type: 'multiOptions',
				options: [
					{ name: 'Google Ads', value: 'google' },
					{ name: 'LinkedIn', value: 'linkedin' },
					{ name: 'Meta (Facebook / Instagram)', value: 'meta' },
					{ name: 'Pinterest', value: 'pinterest' },
					{ name: 'Snapchat', value: 'snapchat' },
					{ name: 'TikTok', value: 'tiktok' },
					{ name: 'X (Twitter)', value: 'x' },
					{ name: 'YouTube', value: 'youtube' },
				],
				default: ['meta'],
				description: 'Which platform policies to check the content against',
				routing: { request: { body: { platforms: '={{$value}}' } } },
			},
			{
				displayName: 'Content Type',
				name: 'contentType',
				type: 'options',
				options: [
					{ name: 'Post', value: 'post' },
					{ name: 'Caption', value: 'caption' },
					{ name: 'Ad', value: 'ad' },
					{ name: 'Video Script', value: 'video-script' },
				],
				default: 'post',
				description: 'The kind of content being checked',
				routing: { request: { body: { contentType: '={{$value}}' } } },
			},
			{
				displayName: 'Sector',
				name: 'sector',
				type: 'string',
				default: '',
				description:
					'Optional industry/sector for sharper checks (e.g. finance, health, gambling). Leave empty to skip.',
				routing: { request: { body: { sector: '={{$value}}' } } },
			},
		],
	};
}
