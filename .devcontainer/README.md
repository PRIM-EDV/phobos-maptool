# Platform Agnostic Development Container

This devcontainer is configured to work seamlessly across all platforms (Linux, macOS, and Windows) with full git integration.

## Features

- **Cross-platform compatibility**: Works on Linux, macOS, and Windows
- **Git integration**: Automatically forwards git credentials and SSH keys from host
- **Zero configuration**: No manual setup required for git operations
- **Development tools**: Includes Node.js, npm, and all necessary build tools

## Git Integration

### Automatic Setup

The devcontainer automatically configures git by:

1. **Copying host git configuration** (`.gitconfig`) if available
2. **Forwarding git credentials** from host system
3. **Mounting SSH keys** for secure git operations
4. **Setting up SSH agent** for seamless authentication

### Supported Authentication Methods

- **HTTPS with credentials**: Uses host system's stored credentials
- **SSH keys**: Forwards SSH keys from `~/.ssh` directory
- **GitHub CLI**: Includes `gh` tool for GitHub operations

### Platform-Specific Behavior

#### Windows
- Uses `%USERPROFILE%` for home directory detection
- Forwards Windows Credential Manager for git operations
- Supports both PowerShell and WSL environments

#### macOS/Linux
- Uses `$HOME` for home directory detection
- Forwards SSH agent socket for key-based authentication
- Integrates with system keychain/credential helpers

## Usage

1. **Open in VS Code**: Use "Reopen in Container" command
2. **First-time setup**: Git configuration is applied automatically
3. **Git operations**: Work normally - credentials are forwarded from host

## Manual Git Configuration

If you need to set up git manually:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Troubleshooting

### Git Authentication Issues

1. **Check host credentials**: Ensure git works on your host system first
2. **SSH key permissions**: SSH keys should have correct permissions (600)
3. **Rebuild container**: Try rebuilding if authentication fails

### Permission Issues

If you encounter permission issues:

```bash
# Fix SSH key permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_*

# Fix workspace permissions
sudo chown -R node:node /workspace
```

## Development Environment

The container includes:

- Node.js 24.1.0
- npm for package management
- Python 3 for native modules
- Build tools for compilation
- Git and Git LFS
- GitHub CLI
- SSH client

## VS Code Integration

Recommended extensions are automatically installed:

- TypeScript support
- Angular template support
- JSON language support

Git settings are optimized for development workflow with auto-fetch and smart commit enabled.