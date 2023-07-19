with import <nixpkgs> {};

mkShell {
    buildInputs = [
    nodejs_18
    yarn
    neovim
    tmux
    ];
  }
