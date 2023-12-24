## Miscellaneous WSL Tips
* Home directory for WSL linux installation:  
    * `~`
    * `/home/username`
* Where userprofile for WSL is at in linux install:
    * `/mnt/c/Users/Windows_user_profile_name`
* Set custom alias to quickly switch to a directory
    * run `cd ~`
    * Add "alias home='cd /mnt/c/Users/Windows_user_profile_name'" to both .bashrc and .bash_profile with Nano text editor
        * run `nano .bashrc`
        * run `nano .bash_profile`
        * add the line to the file
        * > NOTE: before starting of a login shell, .bash_profile is sourced and before starting of a non-login shell .bashrc is sourced.

* List installed packages in arch
    * `pacman -Q`
    
* WSL commnd to trun off all distros
    * `wsl --shutdown`
    
* WSL command to view your distros
    * `wsl -l -v`

