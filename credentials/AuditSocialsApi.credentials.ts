import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AuditSocialsApi implements ICredentialType {
	name = 'auditSocialsApi';

	displayName = 'AuditSocials API';

	documentationUrl = 'https://www.auditsocials.com/compliance-api';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your AuditSocials Compliance API key (starts with as_live_). Get a free key at https://www.auditsocials.com/compliance-api — 50 checks/month, no card.',
		},
	];

	// Injects the bearer token on every request the node makes.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// "Test" button in the credential UI — hits the credits endpoint (no credit spent).
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://www.auditsocials.com',
			url: '/api/v1/credits',
		},
	};
}
