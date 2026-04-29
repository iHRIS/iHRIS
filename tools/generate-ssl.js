const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const TARGETS = {
  core: {
    dir: path.join(__dirname, '../ihris-backend/ihris-backend-site/ssl'),
    subj: '/C=US/ST=State/L=City/O=Organization/OU=Organization Unit/CN=localhost',
  },
  uganda: {
    dir: path.join(__dirname, '../ihris-backend/ihris-uganda/ssl'),
    subj: '/C=UG/ST=Central/L=Kampala/O=Ministry of Health/OU=iHRIS/CN=localhost',
  },
};

function usage() {
  console.error('Usage: node tools/generate-ssl.js [--target core|uganda|both] [--subj <openssl-subj>]');
}

function parseArgs(argv) {
  const opts = { target: 'core', subj: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--target') opts.target = argv[++i];
    else if (a === '--subj') opts.subj = argv[++i];
    else if (a === '-h' || a === '--help') { usage(); process.exit(0); }
    else { usage(); process.exit(1); }
  }
  return opts;
}

function generate({ dir, subj }) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  try {
    execSync(`
      openssl req -x509 -newkey rsa:4096 -keyout ${path.join(dir, 'key.pem')} \
      -out ${path.join(dir, 'cert.pem')} -days 365 -nodes \
      -subj "${subj}"
    `, { stdio: 'inherit' });

    console.log(`SSL certificates generated successfully in ${dir} directory`);
  } catch (error) {
    console.error('Error generating SSL certificates. Make sure OpenSSL is installed.');
    console.error('You can provide your own certificates in the ssl/ directory');
    process.exitCode = 1;
  }
}

const opts = parseArgs(process.argv);
const targets = opts.target === 'both' ? ['core', 'uganda'] : [opts.target];

for (const t of targets) {
  if (!TARGETS[t]) {
    usage();
    process.exit(1);
  }
  generate({ dir: TARGETS[t].dir, subj: opts.subj || TARGETS[t].subj });
}
