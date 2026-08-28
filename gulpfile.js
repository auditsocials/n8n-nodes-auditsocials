const { src, dest } = require('gulp');

// Copy node icons into dist so n8n can render the branded AuditSocials mark.
function buildIcons() {
	return src('nodes/**/*.{png,svg}').pipe(dest('dist/nodes'));
}

exports['build:icons'] = buildIcons;
