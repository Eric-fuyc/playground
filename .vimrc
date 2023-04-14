" keys
imap jk <Esc>
vmap yu <Esc>
nmap tt :NERDTreeToggle<CR>
tmap <M-q> <C-\><C-n>
nmap H 5h
nmap J 5j
nmap K 5k
nmap L 5l
vmap H 5h
vmap J 5j
vmap K 5k
vmap L 5l

nmap RR :source ~/.vimrc<CR>
nmap <C-n> :nohlsearch<CR>

nmap <leader>h <C-w>h
nmap <leader>j <C-w>j
nmap <leader>k <C-w>k
nmap <leader>l <C-w>l

map <up> :resize +5<CR>
map <down> :resize -5<CR>
map <left> :vertical resize-5<CR>
map <right> :vertical resize+5<CR>

" Plugins
call plug#begin()

  " NERD Tree
  Plug 'preservim/nerdtree'

  " auto-pairs
  Plug 'jiangmiao/auto-pairs'

  " color theme
  Plug 'nanotech/jellybeans.vim'

  " org mode
  Plug 'jceb/vim-orgmode'
  Plug 'vim-scripts/utl.vim'
  Plug 'vim-scripts/repeat.vim'
  Plug 'vim-scripts/taglist.vim'
  Plug 'vim-scripts/Tagbar'
  Plug 'vim-scripts/speeddating.vim'
  Plug 'vim-scripts/narrow_region'
  Plug 'vim-scripts/pathogen.vim'
  Plug 'vim-scripts/calendar.vim--Matsumoto'
  Plug 'vim-scripts/SyntaxRange'

  " markdown
  Plug 'dhruvasagar/vim-table-mode'

  " coc.nvim
  Plug 'neoclide/coc.nvim'

call plug#end()

let mapleader="\<space>"
let maplocalleader="\<space>"

set guioptions-=T
set guioptions-=m
set guioptions-=L
set guioptions-=r
set guioptions-=b

" Searching
set hlsearch
set incsearch
set nowrap
set ignorecase
set smartcase
set wildmenu
exec "nohlsearch"

set number
set guifont=consolas:h14
set backspace=2
set ignorecase
set cursorline
set scrolloff=10
set encoding=utf-8
set updatetime=100
set signcolumn=yes

" coc.nvim
let g:coc_disable_startup_warning = 1
inoremap <silent><expr> <TAB>
      \ coc#pum#visible() ? coc#pum#next(1) :
      \ CheckBackspace() ? "\<Tab>" :
      \ coc#refresh()
inoremap <expr><S-TAB> coc#pum#visible() ? coc#pum#prev(1) : "\<C-h>"

" shape of cursor
let &t_SI = "\<Esc>]50;CursorShape=1\x7"
let &t_SR = "\<Esc>]50;CursorShape=2\x7"
let &t_EI = "\<Esc>]50;CursorShape=0\x7"

" fix background
let g:jellybeans_overrides = {
\ 'background': { 'guibg': '' },
\}

colorscheme jellybeans
language en_US.utf8
